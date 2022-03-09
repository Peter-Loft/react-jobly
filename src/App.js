import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Nav from "./Nav";
import Routes from "./Routes";

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

  console.log("App Component");

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
