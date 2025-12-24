import { useState, useEffect } from "react";
import Heatmap from "./Heatmap.png";
import type { RunSimulationSettings } from "./Models/RunSimulationSettings";
import Plot from "./Plot.png";
import type { Run } from "./Models/Run";
import MetricsPreview2 from "./MetricsPreview2";


function FloraHiveMetrics() {
  const [runs, setRuns] = useState<Run[]>([]);
  const [token, setToken] = useState<string>("");
  const [showAllUsers, setShowAllUsers] = useState<boolean>(true);

  const fetchRuns = async (allUsers: boolean) => {
    if (!allUsers && !token) {
      console.warn("Skipping fetch: No token available for private runs.");
      return;
    }
    try {
      const result = await GetAllRuns(token, !allUsers);
      setRuns(result);
    } catch (error) {
      console.error("Failed to fetch runs:", error);
    }
  };

  useEffect(() => {
    fetchRuns(showAllUsers);
  }, [showAllUsers, token]);

  const handleSimulateNewRun = async() => {
    const settings: RunSimulationSettings  = {
      InitialPlayerHealth: 15,
      BattlesPerRun: 5,
      WavesPerBattle: 10,
      BaseDamageChance: 0.1,
      EnergyChance: 0.3,
      BaseEnergyGain: 100,
      BaseBattleDifficulty: 10,
      BattleDifficultyMultiplier : 1.5
    }
    
    try {
      const { token, runs } = await SimulateRun(settings);
      setToken(token);
      setRuns(runs);
    } catch (error) {
      console.error("Failed:", error);
    }
  };

  return (
    <>
      <div className="page-title">
        <p>FloraHive Metrics</p>
      </div>
      <section className="content header-spacing">
      <h1 className="blue mb-4">Interactive simulation of the FloraHive Metrics</h1>
      <button onClick={handleSimulateNewRun} type="button" className="btn btn-danger me-2">Simulate Run</button>
      <button  onClick={() => setShowAllUsers(!showAllUsers)} className={`btn ${showAllUsers ? 'btn-outline-primary' : 'btn-primary'}`}>
        {showAllUsers ? "Showing: All Users" : "Showing: My Runs Only"}
      </button>
      <p>Total Runs: {runs.length}</p>
      <p>Total Mutations: {runs.flatMap(run => run.mutations).length}</p>
      <p>Total Battles: {runs.flatMap(run => run.battles).length}</p>
      <p>Total Waves: {runs.flatMap(run => run.waves).length}</p>
      <p>Total Anomalies: {runs.flatMap(run => run.anomalies).length}</p>
        <MetricsPreview2 runs={runs}></MetricsPreview2>
      </section>

      <section className="content header-spacing">
        <div className="row">
          <div className="col-md-6">
            <p>We build this system from the ground up using:</p>
            <ul>
              <li>C#</li>
              <li>ASP.NET</li>
              <li>PostgreSQL</li>
            </ul>
            <p>I did the primary work designing and implementing the system so that we could collect data from our users and visualize it. I even made a website where  we could see the gathered information displayed in various graphs.</p>
          </div>
          <div className="col-md-6">
            <img src={Heatmap}></img>
          </div>
        </div>
      </section>
      <section className="content header-spacing">
        <div className="row">
          <div className="col-md-6">
            <img src={Plot}></img>
          </div>
          <div className="col-md-6">
            <p>I have plenty of knowledge when it comes to working with backends and databases. I had to build it all from the ground up and as you can see on the left we have made visualizations from all the data gathered.</p>
            <p>The system is scalable and uses Plotly to display tables gotten through our REST API form our PostgreSQL database.</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default FloraHiveMetrics;


export async function SimulateRun(settings: RunSimulationSettings) {
  const endpoint = `${import.meta.env.VITE_METRICS_BACKEND}/sim/run/1`;

  const postResponse = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(settings)
  });

  if (!postResponse.ok) {
    throw new Error(`POST failed: ${postResponse.status}`);
  }

  const result = await postResponse.json();
  const token: string = result.token;

  const runs = await GetAllRuns(token);

  return { token, runs };
}

export async function GetAllRuns(token: string, userRuns: boolean = true): Promise<Run[]> {
  let endpoint = `${import.meta.env.VITE_METRICS_BACKEND}/sim/run`;
  if (!userRuns) { endpoint += "/all"; }

  const getResponse = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(userRuns && token
        ? { "Authorization": `Bearer ${token}` }
        : {})
    }
  });

  if (!getResponse.ok) {
    throw new Error(`GET failed: ${getResponse.status}`);
  }

  return getResponse.json();
}