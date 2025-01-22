import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import Captainlogin from "./pages/Captainlogin";
import CaptainSignup from "./pages/CaptainSignup";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/home" element={<Home />} />

          <Route path="/login" element={<UserLogin />} />

          <Route path="/signup" element={<UserSignup />} />
          <Route path="/captain-login" element={<Captainlogin />} />
          <Route path="/captain-signup" element={<CaptainSignup />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
