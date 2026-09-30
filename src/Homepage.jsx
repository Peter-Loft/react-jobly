import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "./userContext";

function Homepage() {
  const { currentUser } = useContext(UserContext);
  return (
    <section className="welcome-page">
      <h1>Jobly</h1>
      <p>Explore companies. Find your next opportunity.</p>
      {currentUser ? (
        <>
          <h2>Welcome back, {currentUser.firstName}</h2>
          <Link to="/jobs">Browse jobs</Link>
          <Link to="/companies">Explore companies</Link>
        </>
      ) : (
        <>
          <Link to="/login">Log in</Link>
          <Link to="/signup">Create an account</Link>
        </>
      )}
    </section>
  );
}

export default Homepage;
