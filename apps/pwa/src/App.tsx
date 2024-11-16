import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppContextProvider } from "./contexts/AppContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PumpGame from "./routes/pump-game";
import WalletProvider from "./components/providers/wallet-provider";
import Start from "./components/start";
import GameLayout from "./routes/game-layout";
import Toaster from "./components/toaster";
import FomoGame from "./routes/fomo-game";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Start />,
  },
  {
    path: "/game",
    element: <GameLayout />,
    children: [
      {
        path: "pump",
        element: <PumpGame />,
      },
      {
        path: "fomo",
        element: <FomoGame />,
      },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <AppContextProvider>
          <main className="relative mx-auto flex h-screen w-screen flex-col items-center overflow-hidden bg-black font-space-grotesk text-white">
            <RouterProvider router={router} />
          </main>
          <Toaster />
        </AppContextProvider>
      </WalletProvider>
    </QueryClientProvider>
  );
}
