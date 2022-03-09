import { NavLink } from "react-router-dom"
// TODO: add css.

function Nav(){
  return (
    <nav>
      <NavLink exact to="/">Jobly</NavLink>
      <NavLink excat to="/companies">Companies</NavLink>
      <NavLink excat to="/jobs">Jobs</NavLink>
    </nav>
  );
}

export default Nav;