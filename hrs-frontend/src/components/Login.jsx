import React, { useState, useEffect } from "react";
import "../assets/css/FormStyles.css";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../services/userAuthAPI";
import { storeToken, getToken } from "../services/localStorageService";
import verifyToken from "../features/verifyToken";

const Login = () => {
  const [server_error, setServerError] = useState({});
  const [generalError, setGeneralError] = useState();

  let { access_token } = getToken();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      setGeneralError("");
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const actualData = {
        email: data.get("email"),
        password: data.get("password"),
      };
      const res = await loginUser(actualData);
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
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              
            />
          {server_error?.email ? <p className="form-field-error">{server_error.email[0]}</p> : ""}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              
            />
            {server_error?.password ? <p className="form-field-error">{server_error.password[0]}</p> : ""}
          </div>
          {server_error?.non_field_errors ? <p className="form-field-error">{server_error.non_field_errors[0]}</p> : ""}

          <button type="submit" className="form-button">
            Login
          </button>
        </form>
        <p className="register-link">
          Don't have an account? <Link to="/signup">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
