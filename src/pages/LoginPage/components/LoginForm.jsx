import React from "react";
import { useState } from "react";
import FormMessage from "components/FormMessage";

const initData = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [loginData, setLoginData] = useState(initData);
  const [errors, setErrors] = useState({});

  const handleStringChange = (e) => {
    setLoginData((x) => ({ ...x, [e.target.name]: e.target.value }));
    setErrors((x) => ({ ...x, [e.target.name]: "" }));
  };

  const validate = (data) => {
    const err = {};
    if (!data.email) err.email = `Email can't be blank`;
    if (!data.password) err.password = `Password can't be blank`;
    return err;
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const err = validate(loginData);
    setErrors(err);
    if (Object.keys(err).length === 0) {
      setErrors({});
      setLoginData(initData);
      console.log(loginData);
    }
  };

  return (
    <form className="ui form" onSubmit={handleSubmitForm}>
      <h2>Login form</h2>
      <div className="ten wide column">
        <div className={`field column ${errors.email ? "error" : ""}`}>
          {/* <div className={`field column `}> */}
          <label htmlFor="email">Email</label>
          <input
            value={loginData.email}
            onChange={handleStringChange}
            type="text"
            name="email"
            id="email"
            placeholder="Email"
          />
          {errors.email && <FormMessage>{errors.email}</FormMessage>}
        </div>
        <div className={`field column ${errors.password ? "error" : ""}`}>
          {/* <div className={`field column `}> */}
          <label htmlFor="password">Password</label>
          <input
            value={loginData.password}
            onChange={handleStringChange}
            type="text"
            name="password"
            id="password"
            placeholder="Password"
          />
          {errors.password && <FormMessage>{errors.password}</FormMessage>}
        </div>
        {/* ===================🌹  Buttons START */}
        <div className="ui fluid buttons">
          <button className="ui button primary" type="submit">
            Login
          </button>
          <div className="or"></div>
          <span className="ui button">Cancel</span>
        </div>
        {/* Buttons END 🌹=================== */}
      </div>
    </form>
  );
};

export default LoginForm;
