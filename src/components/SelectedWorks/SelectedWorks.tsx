import "./SelectedWorks.css";
import FloraHiveGameplay from "./FloraHiveGameplay.gif";
import FloraHiveMetrics from "./FloraHiveMetrics.png";
import GameBox from "./Gamebox.png";
import { Link } from "react-router";

function SelectedWorks() {
  return (
    <>
    <div className="d-flex flex-row" style={{gap: '80px'}}>
      <div>
        <Link to="/works#FloraHive">
          <img src={FloraHiveGameplay} className="image-card" style={{ width: '320px' }}></img>
        </Link>
      </div>
      <div>
        <Link to="/works/floraHive-metrics">
          <img src={FloraHiveMetrics} className="image-card" style={{ width: '320px' }}></img>
        </Link>
      </div>
      <div>
        <img src={GameBox} className="image-card" style={{ width: '320px' }}></img>
      </div>
    </div>
    </>
  )
}

export default SelectedWorks;