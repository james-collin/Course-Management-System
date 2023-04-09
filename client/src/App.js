import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./home/Home";
import Login from "./authentication/Login";
import CreateCourse from "./courses/CreateCourse";
import Signup from "./authentication/Signup";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/create-course",
      element: <CreateCourse />,
    },
    {
      path: "/signup",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
