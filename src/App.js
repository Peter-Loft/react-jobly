import { BrowserRouter, Redirect } from 'react-router-dom';
import './App.css';
import Nav from "./Nav";
import Routes from "./Routes";
import { useState, useEffect } from 'react';
import JoblyApi from './api';
import jwt_decode from "jwt-decode";
import UserContext from "./userContext";

/**
 * Main app component
 * Handles Nav and Routes
 * 
 * Props - None
 * State
 * - token: received from API on login/register
 * - currentUser: Verified User Object from token.
 * 
 * App --> Nav, Routes
 */

function App() {

  const [token, setToken] = useState();
  const [currentUser, setCurrentUser] = useState(null);
  // const [redirectFlag, setRedirectFlag] = useState(false);

  useEffect(function updateUserOnTokenChange() {
    async function updateUser() {
      try {
        const { username } = jwt_decode(token);
        const result = await JoblyApi.getUser(username);
        setCurrentUser(result);
      } catch {
        setCurrentUser(null);
      }
    }
    updateUser();
  }, [token]);

  function handleSignup(formData) {
    async function signup() {
      const result = await JoblyApi.registerUser(formData);
      setToken(result);
      JoblyApi.token = result;
      // setRedirectFlag(true);
    }
    signup();
    
  }

  function handleLogin(formData) {
    async function login() {
      const result = await JoblyApi.loginUser(formData);
      setToken(result);
      JoblyApi.token = result;
      // setRedirectFlag(true);
    }
    login();
    
  }

  function handleLogout() {
    setToken("");
  }

  // if (redirectFlag) return <Redirect push to="/login"/>;

  console.log("App Component rendered");

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser }}>

          <Nav
            handleLogout={handleLogout} />
          <Routes
            handleSignup={handleSignup}
            handleLogin={handleLogin} />

        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
