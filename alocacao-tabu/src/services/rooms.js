import axios from "axios";
import React from "react";
import "./rooms.css";

class Rooms extends React.Component {
  state = {
    rooms: [],
  };

  componentDidMount() {
    axios
      .get(
        "https://us-central1-aloc-salas-backend.cloudfunctions.net/api/salas",
        {
          headers: {
            "Access-Control-Allow-Credentials": true,
          },
        }
      )
      .then((res) => {
        this.setState({ rooms: res.data });
      });
  }

  render() {
    return (
      <ul className="roomList">
        {this.state.rooms.map((room) => (
          <li className="itemList">
            {"id: " + room.id} <br /> {"id sala: " + room.id_sala} <br />{" "}
            {"Nº de cadeiras: " + room.numero_cadeiras} <br />{" "}
            {"Acessivel: " + room.acessivel} <br />
            {"Qualidade: " + room.qualidade} <br />
          </li>
        ))}
      </ul>
    );
  }
}

export default Rooms;
