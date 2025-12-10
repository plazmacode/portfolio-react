import { useState, useEffect } from "react";
import Heatmap from "./Heatmap.png";
import MetricsPreview from "./MetricsPreview";
import type { Mutation } from "./Models/Mutation";
import type { RunSimulationSettings } from "./Models/RunSimulationSettings";
import Plot from "./Plot.png";
import type { Run } from "./Models/Run";


function FloraHiveMetrics() {
  const [runs, setRuns] = useState<Run[]>([]);

  const fetchRunsOnLoad = async () => {
    const settings: RunSimulationSettings = {
      InitialPlayerHealth: 15,
      BattlesPerRun: 5,
      WavesPerBattle: 10,
      BaseDamageChance: 0.1,
      EnergyChance: 0.3,
      BaseEnergyGain: 100,
      BaseBattleDifficulty: 10,
      BattleDifficultyMultiplier: 1.5
    };

    try {
      // Get all runs by first simulating a run to get token
      const runs: Run[] = await SimulateRun(settings);
      if (runs) {
        setRuns(runs);
      }
    } catch (error) {
      console.error("Failed to fetch runs on load:", error);
    }
  };

  useEffect(() => {
    fetchRunsOnLoad();
  }, []);

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
      const runs: Run[] = await SimulateRun(settings);
      if(runs) {
        setRuns(runs);
      }

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
      <button onClick={handleSimulateNewRun} type="button" className="btn btn-danger">Simulate Run</button>
      <p>Total Runs: {runs.length}</p>
      <p>Total Mutations: {runs.flatMap(run => run.Mutations).length}</p>
      <p>Total Battles: {runs.flatMap(run => run.Battles).length}</p>
      <p>Total Waves: {runs.flatMap(run => run.Waves).length}</p>
      <p>Total Anomalies: {runs.flatMap(run => run.Anomalies).length}</p>
        <MetricsPreview runs={runs}></MetricsPreview>
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
  const endpoint = "http://REDACTED/api/sim/run";
    let token: string | null = null;

  try {
    const postResponse = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings)
    });

    if (!postResponse.ok) {
      throw new Error(`POST failed: ${postResponse.status}`);
    }

    const result = await postResponse.json();
    token = result.token;
    console.log(result);
  }
  catch(err) {
    console.log(err);
  }

  // Get All Runs
  if (token != null) {
    return GetAllRuns(token);
  }
  return [];
}

export async function GetAllRuns(token: string) {
  const endpoint = "http://REDACTED/api/sim/run";

  try {
    const getResponse = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    if (!getResponse.ok) {
      throw new Error(`GET failed: ${getResponse.status}`);
    }
    const data: Run[] = await getResponse.json();
    const allRuns: Run[] = data.map((r: any) => ({
      Mutations: r.mutations,
      Battles: r.battles,
      Waves: r.waves,
      Anomalies: r.anomalies
    }));
    console.log(data);
    return allRuns;
  }
  catch(err) {
    console.log(err);
  }
  return []
}