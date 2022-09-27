import { memo } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { useIsAuth, useLogout } from "contexts/UserContext";

const TopNavigation = () => {
  const logout = useLogout();
  const { isAuth, isAdmin } = useIsAuth();

  return (
    <div className="ui secondary pointing menu">
      <NavLink to="/" className="item">
        <i className="icon home" /> Home
      </NavLink>

      <NavLink to="/films" end className="item">
        <i className="icon film" /> Films
      </NavLink>

      {isAdmin && (
        <NavLink to="/films/new" className="item">
          <i className="icon plus" />
          Add new film
        </NavLink>
      )}

      <div className="right menu">
        {isAuth ? (
          <span onClick={logout} className="item">
            <i className="icon sign-out"></i> Logout
          </span>
        ) : (
          <>
            <NavLink to="/signup" className="item">
              <i className="icon sign-in"></i> Signup
            </NavLink>
            <NavLink to="/login" className="item">
              <i className="icon user"></i> Login
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(TopNavigation);
