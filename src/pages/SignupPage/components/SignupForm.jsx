import React from "react";
import FormMessage from "components/FormMessage";
import { useState } from "react";

const initData = {
  email: "",
  password: "",
  password_confirm: "",
};

const SignUpForm = () => {
  const [data, setData] = useState(initData);
  const [errors, setErrors] = useState({});

  const handleStringChange = (e) => {
    setData((x) => ({ ...x, [e.target.name]: e.target.value }));
    setErrors((x) => ({ ...x, [e.target.name]: "" }));
  };

  const validate = (data) => {
    const err = {};
    if (!data.email) err.email = `Email can't be blank`;
    if (!data.password) err.password = `Password can't be blank`;
    if (!data.password_confirm)
      err.password_confirm = `Password confirm can't be blank`;
    if (data.password_confirm !== data.password)
      err.password_confirm = `Passwords must match, please try again`;
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate(data);
    setErrors(err);
    if (Object.keys(err).length === 0) {
      setErrors({});
      setData(initData);
      console.log(data)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ui form">
      <h2>SignUp Form</h2>
      {/* ================== email ======================= */}
      <div>
        <div className={`field column ${errors.email ? "error" : ""}`}>
          <label htmlFor="email">Email</label>
          <input
            value={data.email}
            onChange={handleStringChange}
            type="text"
            name="email"
            id="email"
            placeholder="Email..."
          />
          {errors.email && <FormMessage>{errors.email}</FormMessage>}
        </div>
        {/* ================== password ======================= */}

        <div className={`field column ${errors.password ? "error" : ""}`}>
          <label htmlFor="password">Password</label>
          <input
            value={data.password}
            onChange={handleStringChange}
            type="text"
            name="password"
            id="password"
            placeholder="Password..."
          />
          {errors.password && <FormMessage>{errors.password}</FormMessage>}
        </div>
        {/* ================== password_confirm ======================= */}

        <div
          className={`field column ${errors.password_confirm ? "error" : ""}`}
        >
          <label htmlFor="password_confirm">Password Confirmation</label>
          <input
            value={data.password_confirm}
            onChange={handleStringChange}
            type="text"
            name="password_confirm"
            id="password_confirm"
            placeholder="Password confirmation..."
          />
          {errors.password_confirm && (
            <FormMessage>{errors.password_confirm}</FormMessage>
          )}
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

export default SignUpForm;
