import ChatBox from "./components/ChatBox";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Conversations from "./pages/conversations";
import ConvoHistory from "./pages/convoHistory";
import DarkModeToggler from "./components/darkModeToggler";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ChatBox />,
    },
    {
      path: "/conversations",
      element: <Conversations />,
    },
    {
      path: "/conversations/:id",
      element: <ConvoHistory />,
    },
  ]);
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <RouterProvider router={router} />
      <DarkModeToggler />
    </div>
  );
}

export default App;
