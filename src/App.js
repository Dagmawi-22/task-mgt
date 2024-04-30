import "./App.css";
import TrelloBoard from "./components/Board";
import { SlPeople } from "react-icons/sl";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Layout from "./components/Layout";
import { useAtom } from "jotai";
import { userDataAtom } from "./data/atoms";

function App() {
  const [user, setUser] = useAtom(userDataAtom);

  return (
    <div className="App">
      <Layout>
        <GoogleOAuthProvider clientId="781628626191-9a7sdn64mj0b0eppfv30inp1i7010fb9.apps.googleusercontent.com">
          <header className="App-header">
            {user && (
              <p style={{ color: "#fff" }}>
                ABC Workspace
                <span style={{ cursor: "pointer" }}>
                  <SlPeople className="people-icon" />
                  <span className="badge">5</span>
                </span>
              </p>
            )}

            <div className="scroll-container">
              <TrelloBoard />
            </div>
          </header>
        </GoogleOAuthProvider>
      </Layout>
    </div>
  );
}

export default App;
