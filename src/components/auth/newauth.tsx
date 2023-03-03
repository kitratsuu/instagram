import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth2 from "./auth2";
import { QueryClient, QueryClientProvider } from "react-query";
import Sign from "../login/sign";
import Signup from "../login/signup/signup";
import Initsetup from "../login/signup/extrasetup/initsetup/initsetup";
import Home from "../mainpage/home";
import Profile from "../profile/profile";
import Reelpanel from "../reels/reelpanel";
import Chatscreen from "../chat/chatscreen";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Auth2
          noAuth={
            <Routes>
              <Route path="*" element={<Navigate to={"/login"} />} />
              <Route path="login" element={<Sign />} />
              <Route path="signup" element={<Signup />} />
            </Routes>
          }
          onboarding={
            <Routes>
              <Route path="*" element={<Navigate to={"/setup"} />} />
              <Route path="setup" element={<Initsetup />} />
            </Routes>
          }
          authenticated={
            <Routes>
              <Route path="*" element={<Navigate to={"/home"} />} />
              <Route path="home" element={<Home />} />
              <Route path="profile" element={<Profile />} />
              <Route path="reels" element={<Reelpanel />} />
              <Route path="messages" element={<Chatscreen />} />
            </Routes>
          }
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
