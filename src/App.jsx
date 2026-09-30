import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import "./App.css";
import Nav from "./Nav";
import Routes from "./Routes";
import JoblyApi from "./api";
import UserContext from "./userContext";

function tokenUsername(token) {
  const { username, exp } = jwtDecode(token);
  if (!username || (exp && exp * 1000 <= Date.now())) {
    throw new Error("Your session has expired. Please log in again.");
  }
  return username;
}

/** Owns session restoration and shares the authenticated user with the UI. */
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionError, setSessionError] = useState("");

  useEffect(() => {
    let active = true;
    async function restoreSession() {
      const token = localStorage.getItem("token");
      JoblyApi.token = token;
      try {
        if (token) {
          const user = await JoblyApi.getUser(tokenUsername(token));
          if (active) setCurrentUser(user);
        }
      } catch {
        if (active) {
          localStorage.removeItem("token");
          JoblyApi.token = null;
          setSessionError("We couldn't restore your session. Please log in again.");
        }
      } finally {
        if (active) setIsLoading(false);
      }
    }
    restoreSession();
    return () => { active = false; };
  }, []);

  async function startSession(token) {
    JoblyApi.token = token;
    try {
      const user = await JoblyApi.getUser(tokenUsername(token));
      localStorage.setItem("token", token);
      setCurrentUser(user);
      setSessionError("");
    } catch (error) {
      JoblyApi.token = null;
      throw error;
    }
  }

  async function handleLogin(details) {
    await startSession(await JoblyApi.loginUser(details));
  }

  async function handleSignup(details) {
    await startSession(await JoblyApi.registerUser(details));
  }

  function handleLogout() {
    localStorage.removeItem("token");
    JoblyApi.token = null;
    setCurrentUser(null);
    setSessionError("");
  }

  async function handleSave(details) {
    const updatedUser = await JoblyApi.updateUser(currentUser.username, details);
    setCurrentUser(user => user?.username === updatedUser.username
      ? { ...user, ...updatedUser }
      : user);
  }

  if (isLoading) return <p role="status">Loading Jobly...</p>;

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser }}>
          <Nav handleLogout={handleLogout} />
          <main>
            {sessionError && <p role="alert">{sessionError}</p>}
            <Routes handleSignup={handleSignup} handleLogin={handleLogin} handleSave={handleSave} />
          </main>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
