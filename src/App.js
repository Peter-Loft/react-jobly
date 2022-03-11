import { BrowserRouter } from 'react-router-dom';
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

  useEffect(function updateUserOnTokenChange() {
    async function updateUser() {
      try {
        const { username } = jwt_decode(token);
        const result = await JoblyApi.getUser(username);
        setCurrentUser(result);
      } catch {
        //CR user is already udefined. dont need to re-render
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
    }
    signup();
    
  }
  //CR do not need nested async functions
  function handleLogin(formData) {
    async function login() {
      const result = await JoblyApi.loginUser(formData);
      setToken(result);
      JoblyApi.token = result;
    }
    login();
    
  }

  function handleLogout() {
    setToken("");
  }

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
