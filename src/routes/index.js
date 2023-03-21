import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Home from "../pages/Home";
import Announcement from "../pages/Announcement";
import News from "../pages/News";
import Profile from "../pages/Profile";
import NewAnnouncement from "../pages/NewAnnouncement";
import NewNews from "../pages/NewNews";
import Users from "../pages/Users";
import NewUser from "../pages/NewUser";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="duyuru">
            <Route index element={<Announcement />} />
            <Route path="yeni" element={<NewAnnouncement />} />
          </Route>
          <Route path="haber">
            <Route index element={<News />} />
            <Route path="yeni" element={<NewNews />} />
          </Route>
          <Route path="kullanicilar">
            <Route index element={<Users />} />
            <Route path="yeni" element={<NewUser />} />
          </Route>
          <Route path="profil" element={<Profile />} />
        </Route>
      </Route>
      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Route>
  )
);

export default routes;
