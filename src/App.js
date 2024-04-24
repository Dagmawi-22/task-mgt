import "./App.css";
import Board from "./components/Board";
import { data } from "./dummy";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>ABC Workspace</p>
        <div className="scroll-container">
          {data?.map((item, index) => (
            <Board key={index} data={item} />
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
