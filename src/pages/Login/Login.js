import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useDispatch } from "react-redux";
import { signin } from "../../actions/auth";
import Loader from "../../components/Loader/Loader";

const Login = () => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(signin(formValue, navigate)).finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <div className="auth_container">
      <form onSubmit={handleFormSubmit} className="auth_form">
        <label for="email">Email</label>
        <input
          type="text"
          className="auth_input"
          id="email"
          value={formValue.email}
          name="email"
          onChange={handleChange}
          placeholder="Enter Your Email"
        />
        <label for="password">Password</label>
        <input
          type="password"
          className="auth_input"
          id="password"
          value={formValue.password}
          name="password"
          onChange={handleChange}
          placeholder="Enter Your Password"
        />
        <div className="auth_button_container">
          {isLoading ? (
            <Loader />
          ) : (
            <button
              className="auth_button"
              disabled={!(formValue.email && formValue.password)}
            >
              Login
            </button>
          )}
        </div>
        <Link to="/signup">
          <p>Don't have an account? Signup here</p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
