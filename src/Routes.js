import { Switch, Route, Redirect } from 'react-router-dom';
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import Homepage from "./Homepage";
import LoginForm from "./LoginForm";
import ProfileForm from "./ProfileForm";
import SignupForm from "./SignupForm";
import { useContext } from "react";
import UserContext from "./userContext";

/** Routes Component
 * 
 * State- none
 * 
 * Props-
 * handleSignup: Fn to sign up a new user in app
 * passes to signup component
 * 
 * handleLogin: Fn to login an existing user in app
 * passes to login component
 * 
 * App -> Routes
 */

function Routes({ handleSignup, handleLogin }) {

  const { currentUser } = useContext(UserContext);

  console.log("Routes rendred - currentUser", currentUser);

  return (
    <>
      {currentUser &&
        <Switch>
          <Route exact path="/profile">
            <ProfileForm />
          </Route>
          <Route exact path="/companies">
            <CompanyList />
          </Route>
          <Route exact path="/companies/:company">
            <CompanyDetail />
          </Route>
          <Route exact path="/jobs">
            <JobList />
          </Route>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Redirect to="/" />
        </Switch>
      }

      {!currentUser &&
        <Switch>
          <Route exact path="/login">
            <LoginForm handleLogin={handleLogin} />
          </Route>
          <Route exact path="/signup">
            <SignupForm handleSignup={handleSignup} />
          </Route>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Redirect to="/login" />
        </Switch>
      }
    </>
  )
}

export default Routes;