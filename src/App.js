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

  console.log("App Component rendered");

  return (
    <div className="App">
      <BrowserRouter>
        {/* Context goes here */}
          <Nav />
          <Routes />
        {/* Context ends here */}
      </BrowserRouter>
    </div>
  );
}

export default App;
