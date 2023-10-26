import React, { useEffect, useState } from "react";
import "../styles/SignInForm.css"; // Import your CSS file
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useAuth } from "../authContext/AuthContext";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../utils/firebase-config.js";

function SignInForm() {
  const [mobile, setMobile] = useState();
  const [password, setPassword] = useState();
  const [optView, setOptView] = useState(false);
  const [role, setRole] = useState('')
  const { login, userAuthId, token , userId } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: function (response) {
          console.log("Captcha Resolved");
        },
        defaultCountry: "IN",
      }
    );
  }, []);

  const otpSubmit = (e) => {
    e.preventDefault();

    let opt_number = e.target.otp_value.value;

    window.confirmationResult
      .confirm(opt_number)
      .then((confirmationResult) => {
        console.log(confirmationResult);
        console.log("success");
        if(role === "admin"){
          navigate('/adminHome')
        }else{
          navigate('/userHome')
        }
      })
      .catch((error) => {
        console.log("couldn't sign in");
       toast.info("Invalid OTP")
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        { mobile, password }
      );
      const data = response.data;
      login(data.token);
      userAuthId(data.user._id);
      setRole(data.user.roles)
      e.preventDefault();
      let phone_number = "+91" + e.target.mobileNumber.value;
      const appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, phone_number, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          console.log("otp sent");
          toast.success('Otp sent to Registered Number')
          window.confirmationResult = confirmationResult;
          setOptView(true);
          // ...
        })
        .catch((error) => {
          console.log("SMS Not sent");
          toast.info("Otp not sent")
        });
    } catch (error) {
      toast.warning("Invalid Credentials");
      console.log("Error While making it SignIn", error);
    }
  };
  const handleBackChange=()=>{
    setOptView(false);
  }
const postLoginActivity = async () => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const activityData = { userId }; // Pass the userId in the request body
    const response = await axios.post(
      "http://localhost:5000/api/activity",
      activityData, // Pass the data in the request body
      config
    );

    const data = response.data;
    console.log(data);
  } catch (error) {
    console.log("Error while posting login activity", error);
  }
};

const handleClick =()=>{
  postLoginActivity();
}

  return (
    <div>
      {optView ? (
        <div>
          <h2>Verify OTP</h2>
          <div className="form-wrapper" onSubmit={otpSubmit}>
            <form id="otpForm">
              <div className="input-field">
                <label>Enter OTP</label>
                <input
                  type="number"
                  placeholder="One time password"
                  name="otp_value"
                  autoComplete="false"
                />
              </div>
              <button className="main-button" type="submit">
                Verify OTP
              </button>
              <button className="back-button" onClick={handleBackChange}>
                Back
              </button>
            </form>
          </div>
          <div id="recaptcha-container"></div>
        </div>
      ) : (
        <div className="container">
          <h2>Sign In</h2>
          <ToastContainer />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div style={{ display: "flex" }}>
                <select
                  name="countryCode"
                  id="countryCode"
                  style={{ width: "25%", marginRight: "10px" }} // Adjust the width as needed
                >
                  <option value="IN">IN(+91)</option>{" "}
                </select>
              </div>
              <input
                type="number"
                name="mobileNumber"
                id="mobileNumber"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter Mobile Number"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                required
              />
            </div>
            <button type="submit" className="sign-in-button" onClick={handleClick}>
              Sign In
            </button>
          </form>
          <div>
            <Link to="/password-reset"><p>Forgot Password?</p></Link>
          </div>
          <div>
            <Link to="/">
              <button className="sign-up-button">Sign up</button>
            </Link>
          </div>
          <div id="recaptcha-container"></div>
        </div>
      )}
    </div>
  );
}

export default SignInForm;

// import React, { useState } from "react";
// import "../styles/SignInForm.css"; // Import your CSS file
// import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import { useAuth } from "../authContext/AuthContext";

// const SignInForm = () => {
//   const [mobile, setMobile] = useState();
//   const [password, setPassword] = useState();

//   const { login, userAuthId, userId, token } = useAuth();
//   const [tokenInput, setTokenInput] = useState("");

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//         },
//       };
//       const response = await axios.post(
//         "http://localhost:5000/api/user/login",
//         { mobile, password }
//       );
//       const data = response.data;
//       console.log(data);
//       console.log(data.user.roles);
//       login(data.token);
//       console.log(data.token);
//       toast.success("SignIn successfully");
//       console.log(data.user._id);
//       userAuthId(data.user._id);
//       if (data.user.roles === "admin") {
//         navigate("/adminHome");
//       } else {
//         navigate("/userHome");
//       }
      
//     } catch (error) {
//       toast.warning("Invalid Credentials");
//       console.log("Error While making it SignIn", error);
//     }
//   };
//   const postLoginActivity = async () => {
//     try {
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       };

//       const activityData = { userId }; // Pass the userId in the request body
//       const response = await axios.post(
//         "http://localhost:5000/api/activity",
//         activityData, // Pass the data in the request body
//         config
//       );

//       const data = response.data;
//       console.log(data);
//     } catch (error) {
//       console.log("Error while posting login activity", error);
//     }
//   };

//   const handleClick =()=>{
//     postLoginActivity();
//   }

//   return (
//     <div className="container">
//       <h2>Sign In</h2>
//       <ToastContainer />
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <div style={{ display: "flex" }}>
//             <select
//               name="countryCode"
//               id="countryCode"
//               style={{ width: "25%", marginRight: "10px" }} // Adjust the width as needed
//             >
//               <option value="IN">IN(+91)</option>{" "}
//               {/* Simplified the country name */}
//               {/* Add more country options here */}
//             </select>
//           </div>
//           <input
//             type="number"
//             name="mobileNumber"
//             id="mobileNumber"
//             value={mobile}
//             onChange={(e) => setMobile(e.target.value)}
//             placeholder="Enter Mobile Number"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <input
//             type="password"
//             name="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter Password"
//             required
//           />
//         </div>
//         <button type="submit" className="sign-in-button" onClick={handleClick}>
//           Sign In
//         </button>
//       </form>
//       <div>
//         <Link to="/password-reset">
//           <p>Forgot Password?</p>
//         </Link>
//       </div>
//       <div>
//         <Link to="/">
//           <button className="sign-up-button">Sign up</button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default SignInForm;
