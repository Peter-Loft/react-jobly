import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Nav from "./Nav";
import Routes from "./Routes";
import { useState, useEffect } from 'react';
import JoblyApi from './api';
import jwt_decode from "jwt-decode";
//const jwt = require("jsonwebtoken");

/**
 * Main app component
 * Handles Nav and Routes
 * 
 * Props - None
 * State - None
 * 
 * App --> Nav, Routes
 */

function App() {

  const [token, setToken] = useState();
  const [currentUser, setCurrentUser] = useState();

  useEffect(function updateUserOnTokenChange() {
    async function updateUser() {
      try {
        const { username } = jwt_decode(token);
        const result = await JoblyApi.getUser(username);
        setCurrentUser(result);
      } catch {
        setCurrentUser({});
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
        {/* Context goes here */}
        <Nav />
        <Routes handleSignup={handleSignup} handleLogin={handleLogin} />
        {/* Context ends here */}
      </BrowserRouter>
    </div>
  );
}

export default App;
