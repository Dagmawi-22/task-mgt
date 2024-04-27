import "./App.css";
import TrelloBoard from "./components/Board";
import { SlPeople } from "react-icons/sl";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          ABC Workspace
          <span style={{ cursor: "pointer" }}>
            <SlPeople className="people-icon" />
            <span className="badge">5</span>
          </span>
        </p>
        <div className="scroll-container">
          <TrelloBoard />
        </div>
      </header>
    </div>
  );
}

export default App;
