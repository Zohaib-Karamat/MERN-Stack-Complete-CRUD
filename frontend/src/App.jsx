// import { AddUser } from './components/addUser/AddUser';
import AddUser from "./components/addUser/AddUser";
import User from "./components/getUsers/User";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UpdateUser from "./components/updateUser/UpdateUser";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <User />,
    },
    {
      path: "/add",
      element: <AddUser />
    },
    {
      path: "/update/:id",
      element: <UpdateUser />
    }
  ]);
  return (
    <div className="container">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
