import React from "react";
import { useContext } from "react";
import UserContext from "./userContext";

/**
 * Displays Heading and catch phrase
 * 
 * Props - None
 * 
 * State - None
 * 
 * Routes --> Homepage
 */

function Homepage() {
    const {currentUser} = useContext(UserContext);

    console.log("Homepage rendered");
    return (
        <div>
            <h1>The Best Jobly</h1>
            <p>All the jobs in one, convenient place.</p>
            {currentUser && <h2>Welcome back, {currentUser.firstName}</h2>}
        </div>
    );
}

export default Homepage;