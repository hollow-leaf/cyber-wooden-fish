import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/routes/home";
import PumpGame from "./routes/pump-game";
import DumpGame from "./routes/dump-game";

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
    <main className="h-screen w-screen items-center overflow-hidden relative flex flex-col mx-auto text-white font-space-grotesk">
      <RouterProvider router={router} />
    </main>
  );
}
