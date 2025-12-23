import "./SelectedWorks.css";
import FloraHiveGameplay from "./FloraHiveGameplay.gif";
import FloraHiveMetrics from "./FloraHiveMetrics.png";
import GameBox from "./Gamebox.png";

function SelectedWorks() {
  return (
    <>
    <div className="d-flex flex-row" style={{gap: '80px'}}>
      <div>
        <a href="/works#FloraHive">
          <img src={FloraHiveGameplay} className="image-card" style={{ width: '320px' }}></img>
        </a>
      </div>
      <div>
        <a href="/works/floraHive-metrics">
          <img src={FloraHiveMetrics} className="image-card" style={{ width: '320px' }}></img>
        </a>
      </div>
      <div>
        <img src={GameBox} className="image-card" style={{ width: '320px' }}></img>
      </div>
    </div>
    </>
  )
}

export default SelectedWorks;