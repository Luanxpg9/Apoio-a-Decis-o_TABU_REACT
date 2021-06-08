import "./App.css";
import Blocks from "./components/Blocks";

function App() {
  return (
    <div className="App">
      <header>
        <div className="titles">
          <h3>Bem vindo ao gerenciamento de Salas da UFS</h3>
          <div className="blocks">
            <Blocks> </Blocks>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
