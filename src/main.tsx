import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.tsx";
import Login from "./pages/Login.tsx";
import RootLayout from "./pages/RootLayout.tsx";
import Signup from "./pages/Signup.tsx";
import UserDashboard from "./pages/UserDashboard.tsx";
import UserHome from "./pages/PostLogin/UserHome.tsx";
import UserProfile from "./pages/PostLogin/UserProfile.tsx";
import OAuthSuccess from "./pages/OAuthSuccess.tsx";
import OAuthFailure from "./pages/OAuthFailure.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<UserDashboard />}>
          <Route index element={<UserHome />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>
        <Route path="oauth/success" element={<OAuthSuccess />} />
        <Route path="oauth/failure" element={<OAuthFailure />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
