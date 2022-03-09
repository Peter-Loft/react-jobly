import { NavLink } from "react-router-dom"
// TODO: add css.

function Nav() {
  return (
    <nav>
      <NavLink exact to="/">Jobly</NavLink>
      <NavLink exact to="/companies">Companies</NavLink>
      <NavLink exact to="/jobs">Jobs</NavLink>
    </nav>
  );
}

export default Nav;