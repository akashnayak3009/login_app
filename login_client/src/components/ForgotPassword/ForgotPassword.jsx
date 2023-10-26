import React, { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../../styles/ForgotPassword.css";

const ForgotPassword = () => {
  const { id, token } = useParams();

  const history = useNavigate();

  const [data2, setData] = useState(false);

  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const userValid = async () => {
    const res = await fetch(
      `http://localhost:5000/api/user/forgotpassword/${id}/${token}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    if (data.status == 201) {
      console.log("user valid");
    } else {
      history("*");
    }
  };

  const setval = (e) => {
    setPassword(e.target.value);
  };

  const sendpassword = async (e) => {
    e.preventDefault();

    if (password === "") {
      toast.error("password is required!", {
        position: "top-center",
      });
    } else if (password.length < 6) {
      toast.error("password must be 6 char!", {
        position: "top-center",
      });
    } else {
      const res = await fetch(`http://localhost:5000/api/user/${id}/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.status == 201) {
        setPassword("");
        setMessage(true);
      } else {
        toast.error("! Token Expired generate new LInk", {
          position: "top-center",
        });
      }
    }
  };

  useEffect(() => {
    userValid();
    setTimeout(() => {
      setData(true);
    }, 3000);
  }, []);

  return (
    <>
      {data2 ? (
        <>
          <section>
            <div className="form_data">
              <div className="form_heading">
                <h1>Enter Your NEW Password</h1>
              </div>

              <form>
                {message ? (
                  <p style={{ color: "orange" }}>
                    Password SuccesSfully Update{" "}
                  </p>
                ) : (
                  ""
                )}
                <div className="form_input">
                  <label htmlFor="password">New password</label>
                  <input
                    type="text"
                    value={password}
                    onChange={setval}
                    name="password"
                    id="password"
                    placeholder="Enter Your new password"
                  />
                </div>

                <button className="btn" onClick={sendpassword}>
                  Send
                </button>
              </form>
              <p>
                <Link to="/login">Sign In</Link>
              </p>
              <ToastContainer />
            </div>
          </section>
        </>
      ) : (
        <div>Loading... &nbsp;</div>
      )}
    </>
  );
};

export default ForgotPassword;
