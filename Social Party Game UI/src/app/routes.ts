import { createBrowserRouter } from "react-router";
import { Home } from "./components/Home";
import { Who } from "./components/Who";
import { Game } from "./components/Game";
import { Continue } from "./components/Continue";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/who",
    Component: Who,
  },
  {
    path: "/game",
    Component: Game,
  },
  {
    path: "/continue",
    Component: Continue,
  },
]);