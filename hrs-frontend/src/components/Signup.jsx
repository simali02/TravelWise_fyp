import React, { useEffect, useState } from "react";
import "../assets/css/FormStyles.css";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../services/userAuthAPI";
import { storeToken } from "../services/localStorageService";
import { setUserToken } from "../features/authSlice";
import { getToken } from "../services/localStorageService";
import verifyToken from "../features/verifyToken";

const Signup = () => {
  const [server_error, setServerError] = useState({});
  const [generalError, setGeneralError] = useState();

  let { access_token } = getToken();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    try {
      setGeneralError("");
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const actualData = {
        username: data.get("username"),
        email: data.get("email"),
        password: data.get("password"),
        confirm_password: data.get("confirm-password"),
      };
      const res = await registerUser(actualData);
      if (res.error) {
        setServerError(res.error.data.errors);
      }
      if (res.data) {
        storeToken(res.data.token);
        navigate("/");
      }
    } catch (error) {
      setServerError({});
      setGeneralError("An error occured, try again later!");
    }
  };

  useEffect(() => {
    const callVerifyToken = async () => {
      if ((await verifyToken())){
        navigate("/");
      }}
      callVerifyToken()
  }, [access_token]);

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="username"
              id="username"
              name="username"
              placeholder="Enter your username"
            />
            {server_error?.username ? (
              <p className="form-field-error">{server_error.username[0]}</p>
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
            />
            {server_error?.email ? (
              <p className="form-field-error">{server_error.email[0]}</p>
            ) : (
              ""
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
            />
            {server_error?.password ? (
              <p className="form-field-error">{server_error.password[0]}</p>
            ) : (
              ""
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Enter your confirm password"
            />
            {server_error?.confirm_password ? (
              <p className="form-field-error">
                {server_error.confirm_password[0]}
              </p>
            ) : (
              ""
            )}
          </div>
          {server_error?.non_field_errors ? (
            <p className="form-field-error">
              {server_error.non_field_errors[0]}
            </p>
          ) : (
            ""
          )}

          <button type="submit" className="form-button">
            Signup
          </button>
        </form>
        <p className="register-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
