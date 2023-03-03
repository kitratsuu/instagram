import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Home from "./components/mainpage/home";
import Sign from "./components/login/sign";
import Signup from "./components/login/signup/signup";
import Auth from "./components/auth/auth";
import Initsetup from "./components/login/signup/extrasetup/initsetup/initsetup";
import Profile from "./components/profile/profile";

function App2() {
  return (
    <BrowserRouter>
      <Auth>
        {(isauth, setupstate) => {
          return (
            <>
              <Routes>
                {isauth ? (
                  setupstate ? (
                    <Route path="" element={<Initsetup />} />
                  ) : (
                    <Route path="" element={<Home />} />
                  )
                ) : (
                  <></>
                )}
                <Route path="login" element={<Sign />} />
                <Route path="signup" element={<Signup />} />
                <Route path="profile" element={<Profile />} />
              </Routes>
            </>
          );
        }}
      </Auth>
    </BrowserRouter>
  );
}

export default App2;
