import "./App.css";
import Board from "./components/Board";

function App() {
  const data = {
    title: "Test",
    tasks: [
      {
        title: "Task II",
      },
      {
        title: "Task III",
      },
    ],
  };
  return (
    <div className="App">
      <header className="App-header">
        <p>Task mgt</p>
        <Board data={data} />
      </header>
    </div>
  );
}

export default App;
