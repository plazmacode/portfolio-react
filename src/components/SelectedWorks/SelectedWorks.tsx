import "./SelectedWorks.css";
import FloraHiveGameplay from "./FloraHiveGameplay.gif";
import FloraHiveMetrics from "./FloraHiveMetrics.png";
import GameBox from "./Gamebox.png";
import { Link } from "react-router";

interface SelectedWorksProps {
  setTitle: (title: { top: string, bottom: string }) => void;
}

function SelectedWorks({ setTitle }: SelectedWorksProps) {
  const defaultTitle = { top: "Tobias", bottom: "Krogshede" };

  return (
    <div className="d-flex flex-row" style={{ gap: '80px' }}>
      <div 
        onMouseEnter={() => setTitle({ top: "FloraHive", bottom: "" })}
        onMouseLeave={() => setTitle(defaultTitle)}
      >
        <Link to="/works#FloraHive">
          <img src={FloraHiveGameplay} className="image-card" style={{ width: '320px' }} />
        </Link>
      </div>
      <div 
        onMouseEnter={() => setTitle({ top: "FloraHive", bottom: "Metrics" })}
        onMouseLeave={() => setTitle(defaultTitle)}
      >
        <Link to="/works/floraHive-metrics">
          <img src={FloraHiveMetrics} className="image-card" style={{ width: '320px' }} />
        </Link>
      </div>

      <div 
        className="position-relative d-inline-block"
        onMouseEnter={() => setTitle({ top: "Gamebox", bottom: "Festival" })}
        onMouseLeave={() => setTitle(defaultTitle)}
      >
        <Link to="/works/gamebox">
          <img src={GameBox} className="image-card" style={{ width: '320px' }} />
        </Link>
      </div>
    </div>
  );
}

export default SelectedWorks;