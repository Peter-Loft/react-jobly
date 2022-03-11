import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import Homepage from "./Homepage";
import LoginForm from "./LoginForm";
import ProfileForm from "./ProfileForm";
import SignupForm from "./SignupForm";

//TODO Logic for redirect when logged in vs logged out

function Routes({ handleSignup, handleLogin }) {
  return (
    <Switch>
      <Route exact path="/login">
        <LoginForm handleLogin={handleLogin} />
      </Route>
      <Route exact path="/signup">
        <SignupForm handleSignup={handleSignup} />
      </Route>
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
      <Redirect to="/login" />
    </Switch>
  )
}

export default Routes;