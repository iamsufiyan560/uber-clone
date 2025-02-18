import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import Captainlogin from "./pages/Captainlogin";
import CaptainSignup from "./pages/CaptainSignup";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import UserLogout from "./pages/UserLogout";
import Riding from "./pages/Riding";
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/login" element={<UserLogin />} />

          <Route path="/signup" element={<UserSignup />} />
          <Route path="/captain-login" element={<Captainlogin />} />
          <Route path="/captain-signup" element={<CaptainSignup />} />

          <Route path="/riding" element={<Riding />} />

          <Route path="/" element={<Start />} />
          <Route
            path="/home"
            element={
              <UserProtectWrapper>
                <Home />
              </UserProtectWrapper>
            }
          />
          <Route
            path="/user/logout"
            element={
              <UserProtectWrapper>
                <UserLogout />
              </UserProtectWrapper>
            }
          />

          <Route
            path="/captain-home"
            element={
              <CaptainProtectWrapper>
                <CaptainHome />
              </CaptainProtectWrapper>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
