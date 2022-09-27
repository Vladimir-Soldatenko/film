import { memo } from "react";
import { NavLink } from "react-router-dom";

const TopNavigation = ({ showForm }) => {
  return (
    <div className="ui secondary pointing menu">
      <NavLink to="/" className="item">
        <i className="icon home" /> Home
      </NavLink>

      <NavLink to="/films" end className="item">
        <i className="icon film" /> Films
      </NavLink>

      <NavLink to="/films/new" className="item">
        <i className="icon plus" />
        Add new film
      </NavLink>
    </div>
  );
};

export default memo(TopNavigation);
