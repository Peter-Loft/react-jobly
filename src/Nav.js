import { NavLink } from "react-router-dom";
import "./Nav.css";
// TODO: Add logic for logged in or not

function Nav() {

  console.log("Nav rendering");
  
  return (
    <nav>

      <NavLink exact to="/">Jobly</NavLink>
      <NavLink exact to="/companies">Companies</NavLink>
      <NavLink exact to="/jobs">Jobs</NavLink>

      {/* <NavLink exact to="/profile">Profile</NavLink>
      <NavLink exact to="/login">Login</NavLink>

      <NavLink exact to="/logout">Logout</NavLink> */}

    </nav>
  );
}

export default Nav;