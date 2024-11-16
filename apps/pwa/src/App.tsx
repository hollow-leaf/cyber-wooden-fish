import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/routes/home";
import PumpGame from "./routes/pump-game";
import DumpGame from "./routes/dump-game";
import { AppContextProvider } from "./contexts/AppContext";

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
  );
}
