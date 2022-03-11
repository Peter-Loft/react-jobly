import { NavLink, Link } from "react-router-dom";
import "./Nav.css";
// TODO: Add logic for logged in or not

import { useContext } from "react";
import UserContext from "./userContext";

/** Navbar component
 * 
 * State- none
 * 
 * Props-
 * handleLogout: Fn to handle loggin a user out.
 * 
 * App -> Nav
 */

function Nav({ handleLogout }) {

  const { currentUser } = useContext(UserContext);

  console.log("Nav rendering");

  return (
    <nav>

      {currentUser
        ? (<span>
          <NavLink exact to="/">Jobly</NavLink>
          <NavLink exact to="/companies">Companies</NavLink>
          <NavLink exact to="/jobs">Jobs</NavLink>
          <NavLink exact to="/profile">Profile</NavLink>
          <Link exact to="/login" onClick={handleLogout}>Logout: {currentUser.username}</Link>
        </span>)
        : (<span>
          <NavLink exact to="/">Jobly</NavLink>
          <NavLink exact to="/login">Login</NavLink>
          <NavLink exact to="/signup">Sign Up</NavLink>
        </span>)}

    </nav>
  );
}

export default Nav;