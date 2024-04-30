import "./App.css";
import TrelloBoard from "./components/Board";
import { SlPeople } from "react-icons/sl";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <div className="App">
      <GoogleOAuthProvider clientId="950502969546-0ssa0mb626lsevc4h7e8tpsj0mcknkvm.apps.googleusercontent.com">
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
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
