import { Outlet } from "react-router-dom";

const FormLayout = () => {
  return (
    <div className="six wide column">
      <Outlet />
    </div>
  );
};

export default FormLayout;
