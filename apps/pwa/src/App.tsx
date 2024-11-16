import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppContextProvider } from "./contexts/AppContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./routes/home";
import PumpGame from "./routes/pump-game";
import DumpGame from "./routes/dump-game";
import WalletProvider from "./components/providers/wallet-provider";

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <AppContextProvider>
          <main className="relative mx-auto flex h-screen w-screen flex-col items-center overflow-hidden bg-[#242424] font-space-grotesk text-white">
            <RouterProvider router={router} />
          </main>
        </AppContextProvider>
      </WalletProvider>
    </QueryClientProvider>
  );
}
