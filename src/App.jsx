import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import Profile from "./components/Profile/Profile";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Notfound from "./components/Notfound/Notfound";
import { UserDataProvider } from "./components/Context/userData";
import Protected from "./components/Protected/Protected";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Editdata from "./components/Editdata/Editdata";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import Postdetails from "../src/components/postdetails/Postdetails";
import UpdatePostPage from "./components/UpdatePostPage/UpdatePostPage";
import ChangePhoto from "./components/ChangePhoto/ChangePhoto";
import Following from "./components/Following/Following";
import UserProfile from "./components/userProfile/userProfile";

let query = new QueryClient();

const routing = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Protected>
            <Home />
          </Protected>
        ),
      },
      {
        path: "profile",
        element: (
          <Protected>
            <Profile />
          </Protected>
        ),
      },
      {
        path: "updatepost/:postId",
        element: (
          <Protected>
            <UpdatePostPage />
          </Protected>
        ),
      },

      {
        path: "Change-Password",
        element: (
          <Protected>
            <ChangePassword />
          </Protected>
        ),
      },
      {
        path: "following",
        element: (
          <Protected>
            <Following />
          </Protected>
        ),
      },
      {
        path: "userprofile/:userId",
        element: (
          <Protected>
            <UserProfile />
          </Protected>
        ),
      },
      {
        path: "change-photo",
        element: (
          <Protected>
            <ChangePhoto />
          </Protected>
        ),
      },
      {
        path: "editdata",
        element: (
          <Protected>
            <Editdata />
          </Protected>
        ),
      },
      {
        path: "postdetails/:postId",
        element: (
          <Protected>
            <Postdetails />
          </Protected>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);
function App() {
  return (
    <>
      <UserDataProvider>
        <QueryClientProvider client={query}>
          <RouterProvider router={routing}></RouterProvider>
          <Toaster />
        </QueryClientProvider>
      </UserDataProvider>
    </>
  );
}

export default App;
