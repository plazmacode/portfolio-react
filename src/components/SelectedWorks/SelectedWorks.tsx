import "./SelectedWorks.css";
import FloraHiveGameplay from "./FloraHiveGameplay.gif";
import FloraHiveMetrics from "./FloraHiveMetrics.png";
import GameBox from "./Gamebox.png";

function SelectedWorks() {
  return (
    <div className="previews-container">
      <div className="previews-title blue">
        <h2 className="heading">Selected Works</h2>
      </div>
      <div className="previews-content">
        <div>
          <a href="/florahive">
          <img src={FloraHiveGameplay}></img>
          </a>
          <p><a href="http://store.steampowered.com/app/3413850/FloraHive/" target="_blank">FloraHive on Steam</a>
          <br></br> A RougeLite Tower Defense</p>
        </div>
        <div>
          <a href="/florahive-metrics">
          <img src={FloraHiveMetrics}></img>
          </a>
          <p>FloraHive Metrics System<br></br>Scalable Microservices</p>
        </div>
        <div>
          <a href="/gamebox">
          <img src={GameBox}></img>
          </a>
          <p>FloraHive at GameBox Festival</p>
        </div>
      </div>
    </div>
  )
}

export default SelectedWorks;