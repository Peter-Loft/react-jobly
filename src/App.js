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

  console.log("App Component rendered");

  const [
    isTokenInLocalStorage,
    setIsTokenInLocalStorage
  ] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(function updateUserOnTokenChange() {
    console.log("token: ", token);
    async function updateUser() {
      try {
        JoblyApi.token = token;
        const { username } = jwt_decode(token);
        const result = await JoblyApi.getUser(username);
        console.log("await for useEffect Done: ");
        setCurrentUser(result);
        setIsLoading(false);
      } catch {
        if (token) setCurrentUser(null);
      }
    }
    updateUser();
  }, [isTokenInLocalStorage]);

  useEffect(function loadUserOnFirstLoad() {
    async function loadUser() {
      console.log("loading user function");
      console.log("localstorage token", localStorage.getItem("token"))
      if (token) {
        JoblyApi.token = token;
        const { username } = jwt_decode(token);
        const result = await JoblyApi.getUser(username);
        setCurrentUser(result);
        setIsLoading(false);
        setIsTokenInLocalStorage(true);
      } else {
        setIsLoading(false);
      }
    }
    loadUser();
  }, []);

  async function handleSignup(formData) {
    const result = await JoblyApi.registerUser(formData);
    //setToken(result);
    localStorage.setItem("token", result);
    JoblyApi.token = result;
    setIsTokenInLocalStorage(true);
  }

  async function handleLogin(formData) {
    console.log("Handle login callback called");
    const result = await JoblyApi.loginUser(formData);
    //setToken(result);
    localStorage.setItem("token", result);
    JoblyApi.token = result;
    setIsTokenInLocalStorage(true);
  }
  //CR Make handle logout async. May need to wait for logout in future.
  function handleLogout() {
    localStorage.removeItem("token");
    setIsTokenInLocalStorage(false);
    //setToken(null);
    setCurrentUser(null);
  }

  //TODO Create functino for handling update user/PATCH

  if (isLoading) {
    console.log("isLoading function running");
    return <h1>Loading dopest page in the west...</h1>
  }

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
