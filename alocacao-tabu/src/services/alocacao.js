import axios from "axios";
import React from "react";
import Graphs from "../components/Graphs/index";
import "./alocacao.css";

class Alocacao extends React.Component {
  state = {
    alocacoes: [],
  };

  componentDidMount() {
    axios
      .get(
        "https://us-central1-aloc-salas-backend.cloudfunctions.net/api/alocacao",
        {
          headers: {
            "Access-Control-Allow-Credentials": true,
          },
        }
      )
      .then((res) => {
        this.setState({ alocacoes: res.data });
      });
  }

  render() {
    return (
      <div className="graphList">
        <ul className="alocacaoList">
          {this.state.alocacoes.map((alocacao) => (
            <li key={alocacao.id} className="itemList">
              {"id: " + alocacao.id} <br />
              {"% de Desocupação: " + alocacao.taxaDesocupacao + "%"} <br />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Alocacao;
