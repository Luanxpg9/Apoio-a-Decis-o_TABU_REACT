import Alocacao from "../../services/alocacao.js";
import Rooms from "../../services/rooms.js";

function Lists(props) {
  if (props.listName === "rooms") {
    return (
      <div className="titles">
        <h4>{props.title}</h4>
        <Rooms className="titles" />
      </div>
    );
  } else if (props.listName === "alocacao") {
    return (
      <div className="titles">
        <h4>{props.title}</h4>
        <Alocacao className="titles" />
      </div>
    );
  }
}

export default Lists;
