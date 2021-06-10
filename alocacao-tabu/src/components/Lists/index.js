import Rooms from "../../services/rooms.js";

function Lists(props) {
  return (
    <div className="titles">
      <h4>{props.title}</h4>
      <Rooms className="titles" />
    </div>
  );
}

export default Lists;
