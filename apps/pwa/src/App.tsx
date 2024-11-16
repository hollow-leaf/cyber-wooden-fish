import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/routes/home";
import PumpGame from "./routes/pump-game";
import DumpGame from "./routes/dump-game";
import { AppContextProvider } from "./contexts/AppContext";
import "./App.css";

import { useEffect, useState, useCallback } from "react";
import { getSerwist } from "virtual:serwist";
import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import {
  createConfig,
  WagmiProvider,
} from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http } from 'viem';
import { mainnet } from 'viem/chains';
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

const config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
  },
});
  
const queryClient = new QueryClient();
const dynamicKey =  import.meta.env.VITE_DYNAMICAPIKEY

function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hasPermission, setHasPermission] = useState(false);
  const [score, setScore] = useState(0);
  const [isJumping, setIsJumping] = useState(false);

  const getMotion = async () => {
    if (!window.DeviceMotionEvent) {
      alert("Your current device does not have access to the DeviceMotion event");
      return;
    } else {
      setHasPermission(true);
    }
  };

  const handleJump = useCallback((height: number) => {
    setIsJumping(true);
    setPosition(prev => ({ ...prev, y: -height }));
    setScore(prev => prev + Math.floor(height / 50)); 

    setTimeout(() => {
      setPosition(prev => ({ ...prev, y: 0 }));
      setIsJumping(false);
    }, 3000);
  }, []);

  useEffect(() => {
    const loadSerwist = async () => {
      if ("serviceWorker" in navigator) {
        const serwist = await getSerwist();
        serwist?.addEventListener("installed", () => {
          console.log("Serwist installed!");
        });
        void serwist?.register();
      }
    };
    loadSerwist();
  
     // Motion event listener
     if (hasPermission) {
      const handleMotion = (e: DeviceMotionEvent) => {
        if (e.acceleration && !isJumping) {
          const acceleration = e.acceleration.y || 0;
          if (acceleration > 15) { // set a threshold
            const jumpHeight = Math.min(acceleration * 20, 300); // set a max jump height
            handleJump(jumpHeight);
          }
        }
      };

      window.addEventListener("devicemotion", handleMotion);
      return () => window.removeEventListener("devicemotion", handleMotion);
    }
  }, [hasPermission, isJumping, handleJump]);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "pump",
        element: <PumpGame />,
      },
      {
        path: "dump",
        element: <DumpGame />,
      },
    ],
  },
]);
export default function App() {
  return (
    <AppContextProvider>
      <main className="font-space-grotesk relative mx-auto flex h-screen w-screen flex-col items-center overflow-hidden bg-[#242424] text-white">
        <RouterProvider router={router} />
      </main>
    </AppContextProvider>
    <DynamicContextProvider
    settings={{
      // Find your environment id at https://app.dynamic.xyz/dashboard/developer
      environmentId: dynamicKey,
      
      walletConnectors: [EthereumWalletConnectors],
    }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>
            <DynamicWidget />
            <div className="game-container" style={{ height: '100vh', position: 'relative' }}>
              {!hasPermission && (
                <button onClick={getMotion}>Enable Motion Sensor</button>
              )}

              <div className="score-board" style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                fontSize: '24px',
                fontWeight: 'bold'
              }}>
                Score: {score}
              </div>

              <div
                style={{
                  width: '20px',
                  height: '50px',
                  backgroundColor: 'red',
                  position: 'absolute',
                  bottom: '50px',
                  left: '50%',
                  transform: `translateX(-50%) translateY(${position.y}px)`,
                  transition: 'transform 0.3s ease-out'
                }}
              />
            </div>
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider> 
    </DynamicContextProvider>
  );
}
