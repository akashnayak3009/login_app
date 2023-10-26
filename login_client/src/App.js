import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import SignupForm from "./components/SignupForm";
import VerifyOtp from "./components/VerifyOtp";
import NotFound from "./components/NotFound";
import { useAuth } from "./authContext/AuthContext";
import {
  PrivateRoute,
  PrivateRoute1,
  ProtectRoute,
} from "./utils/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import PasswordReset from "./components/ForgotPassword/PasswordReset";
import SignInForm from "./components/SignInForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<SignupForm />} />
        <Route exact path="/login" element={<SignInForm />} />
        <Route path="/adminHome" element={<PrivateRoute />} />
        <Route path="/userHome" element={<PrivateRoute1 />} />
        <Route path="/update" element={<ProtectRoute />} />
        <Route exact path="/verify" element={<VerifyOtp />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/forgotpassword/:id/:token" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
