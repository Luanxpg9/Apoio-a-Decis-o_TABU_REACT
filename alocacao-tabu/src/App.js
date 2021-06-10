import "./App.css";
import Blocks from "./components/Blocks";
import Graphs from "./components/Graphs";
import Lists from "./components/Lists";

function App() {
  return (
    <div className="App">
      <div className="titles">Bem vindo ao gerenciamento de Salas da UFS</div>
      <hr />
      <div className="blocks">
        <Blocks />
        <Blocks />
        <Blocks />
        <Blocks />
      </div>
      <hr />
      <div className="graphs">
        <Graphs />
      </div>
      <hr />
      <div className="lists">
        <Lists title={"Hello Luan"} />
      </div>
      <hr />
      <div className="tables">
        <p>Here will be tables</p>
      </div>
      <hr />
    </div>
  );
}

export default App;
