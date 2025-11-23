import { useState } from "react";
import Heatmap from "./Heatmap.png";
import MetricsPreview from "./MetricsPreview";
import type { Mutation } from "./Models/Mutation";
import type { RunSimulationSettings } from "./Models/RunSimulationSettings";
import Plot from "./Plot.png";


function FloraHiveMetrics() {
  const [mutations, setMutations] = useState<Mutation[]>([]);

  const handleAddMutation = async() => {
    const settings: RunSimulationSettings  = {
      InitialPlayerHealth: 15,
      BattlesPerRun: 5,
      WavesPerbattle: 10,
      BaseDamageChance: 0.1
    }
    
    try {
      const runResult = await SimulateRun(settings);
      console.log("Run Result:", runResult);

      if(runResult) {
        setMutations(prev => [...prev, ...runResult]);
      }

    } catch (error) {
      console.error("Failed:", error);
    }
  }

  return (
    <>
      <div className="page-title">
        <p>FloraHive Metrics</p>
      </div>
      <section className="content header-spacing">
      <button onClick={handleAddMutation} type="button" className="btn btn-danger">Simulate Run</button>
      <p>Total Mutations: {mutations.length}</p>
        <MetricsPreview mutations={mutations}></MetricsPreview>
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

  try {
    // Create Mutations
    const postResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(settings)
    });

    if (!postResponse.ok) {
      throw new Error(`POST failed: ${postResponse.status}`);
    }
    const data: Mutation[] = await postResponse.json();
    console.log(data[0]);
    const newMutations: Mutation[] = data.map((m: any) => ({
      Resets: m.resets,
      RunCount: m.runCount,
      Battle: m.battle,
      Wave: m.wave,
      MutationName: m.mutationName,
      MutationCount: m.mutationCount,
    }));
    return newMutations;
  }
  catch(err) {
    console.log(err);
  }
}