import { createBrowserRouter,RouterProvider } from "react-router-dom";
import { RequireAuth,Layout } from "./routes/Layout/Layout";
import HomePage from "./routes/HomePage/HomePage";
import Login from "./routes/Login/Login";
import Register from "./routes/Register/Register";
import ListPage from "./routes/ListPage/ListPage";
import SinglePage from "./routes/SinglePage/SinglePage";
import ProfilePage from "./routes/ProfilePage/ProfilePage";
import NewPostPage from "./routes/NewPostPage/NewPostPage";
import { profilePageLoader,singlePageLoader,listPageLoader } from "./lib/loaders.js";
import ProfileUpdatePage from "./routes/profileUpdatePage/ProfileUpdatePage";

function App() {

  const router = createBrowserRouter([{
    path:"/",
    element:<Layout></Layout>,
    children:[
      {
        path:"/",
        element:<HomePage></HomePage>
      },{
        path:"/login",
        element:<Login></Login>
      },{
        path:"/register",
        element:<Register></Register>
      },{
        path:"/list",
        element:<ListPage></ListPage>,
        loader:listPageLoader
      },{
        path:"/:id",
        element:<SinglePage></SinglePage>,
        loader:singlePageLoader
      }
    ]
  },{
    path:"/",
    element:<RequireAuth></RequireAuth>,
    children:[{
      path:"/profile",
      element:<ProfilePage></ProfilePage>,
      loader:profilePageLoader
    },{
      path:"/profile/add",
      element:<NewPostPage></NewPostPage>
    },{
      path:"/profile/update",
      element:<ProfileUpdatePage></ProfileUpdatePage>
    }]
  }]);

  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App