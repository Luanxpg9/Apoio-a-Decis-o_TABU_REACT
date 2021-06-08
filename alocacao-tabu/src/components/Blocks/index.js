import "./index.css";
import logo from "../../images/ufs_logo.jpg";

function Blocks(props) {
  return (
    <div className="main-block">
      <p>UFS LOGO</p>
      <img src={logo} alt="Ufs logo" />
    </div>
  );
}

export default Blocks;
