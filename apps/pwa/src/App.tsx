import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppContextProvider } from "./contexts/AppContext";
import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { mainnet } from "viem/chains";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import Home from "./routes/home";
import PumpGame from "./routes/pump-game";
import DumpGame from "./routes/dump-game";

const config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();
const dynamicKey = import.meta.env.VITE_DYNAMICAPIKEY;

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

console.log("dynamicKey", dynamicKey);

export default function App() {
  return (
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
            <AppContextProvider>
              <main className="relative mx-auto flex h-screen w-screen flex-col items-center overflow-hidden bg-[#242424] font-space-grotesk text-white">
                <RouterProvider router={router} />
              </main>
            </AppContextProvider>
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}
