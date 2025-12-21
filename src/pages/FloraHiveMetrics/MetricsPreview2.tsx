import { useEffect, useState, useRef } from "react";
import { init, getInstanceByDom, type EChartsOption } from "echarts";
import type { Run } from "./Models/Run";
import type { RunSimulationSettings } from "./Models/RunSimulationSettings";
import "./FloraHiveMetrics.css";
type DataPoint = {
  battle: number;
  wave: number;
  mutationCount: number;
  energyGained: number;
  count: number;
};

function processAverages(runs: Run[]) {
  const statsMap = new Map<string, {
    battle: number;
    wave: number;
    totalMutations: number;
    totalEnergy: number;
    runCount: number
  }>();

  runs.forEach((run) => {
    // 1. Create a quick lookup for mutations in THIS run
    // Key: "battle:wave", Value: mutationCount total at that moment
    const runMutationSnapshots = new Map<string, number>();
    run.mutations.forEach(m => {
      runMutationSnapshots.set(`${m.battle}:${m.wave}`, m.mutationCount);
    });

    let lastKnownMutationCount = 0;

    // 2. Iterate through Waves (this represents the actual timeline of the run)
    run.waves.forEach((battleGroup) => {
      battleGroup.forEach((w) => {
        const b = w.battleCount;
        const wv = w.waveCount;
        const key = `${b}:${wv}`;

        // If this run had a mutation entry here, update our tracker
        if (runMutationSnapshots.has(key)) {
          lastKnownMutationCount = runMutationSnapshots.get(key)!;
        }

        const existing = statsMap.get(key) || {
          battle: b,
          wave: wv,
          totalMutations: 0,
          totalEnergy: 0,
          runCount: 0,
        };

        // Add the running total of mutations for this run to the global total
        existing.totalMutations += lastKnownMutationCount;
        existing.totalEnergy += (w.energyGained || 0);
        existing.runCount += 1;

        statsMap.set(key, existing);
      });
    });
  });

  return Array.from(statsMap.values())
    .sort((a, b) => (a.battle !== b.battle ? a.battle - b.battle : a.wave - b.wave))
    .map((stat) => ({
      label: `B${stat.battle}-W${stat.wave}`,
      avgMutations: stat.runCount > 0 ? stat.totalMutations / stat.runCount : 0,
      avgEnergy: stat.runCount > 0 ? stat.totalEnergy / stat.runCount : 0,
    }));
}

/*
Uses the Apache ECharts visualization library to build a chart.
Shows mutations earned over a simulated run provided from the FloraHive Metrics API
*/
function MetricsPreview2() {
  const chartRef = useRef<HTMLDivElement | null>(null);
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

  const handleSimulateNewRun = async () => {
    const settings: RunSimulationSettings = {
      InitialPlayerHealth: 15,
      BattlesPerRun: 5,
      WavesPerBattle: 10,
      BaseDamageChance: 0.1,
      EnergyChance: 0.3,
      BaseEnergyGain: 100,
      BaseBattleDifficulty: 10,
      BattleDifficultyMultiplier: 1.5
    }

    try {
      const { token, runs } = await SimulateRun(settings);
      setToken(token);
      setRuns(runs);
    } catch (error) {
      console.error("Failed:", error);
    }
  };

  // Initialize Chart
  useEffect(() => {
    if (!chartRef.current) return;
    const chart = init(chartRef.current);
    return () => chart.dispose();
  }, []);

  // Update Chart Options
  useEffect(() => {
    if (!chartRef.current) return;
    const chart = getInstanceByDom(chartRef.current);
    if (!chart) return;

    const data = processAverages(runs);

    const option: EChartsOption = {
      title: {
        text: 'Average Run Performance',
        left: 'center',
        textStyle: { fontSize: 14, color: 'white' }
      },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "cross" },
        // Formatting tooltip to show decimals nicely
        valueFormatter: (value: any) => Number(value).toFixed(2)
      },
      legend: {
        textStyle: { color: 'white' },
        data: ["Avg Mutation Count", "Avg Energy Gained"],
        bottom: 0
      },
      grid: { bottom: 80 },
      xAxis: {
        type: "category",
        data: data.map(d => d.label),
        axisLabel: { rotate: 45, color: "white" },
      },
      yAxis: [
        {
          type: "value",
          name: "Mutations",
          position: "left",
          axisLabel: { color: "white" },
          nameTextStyle: {
            color: "white"
          },
        },
        {
          type: "value",
          name: "Energy",
          position: "right",
          axisLabel: { color: "white" },
          nameTextStyle: {
            color: "white"
          },
        }
      ],
      series: [
        {
          name: "Avg Mutation Count",
          type: "line", // Changed to line as requested
          data: data.map(d => d.avgMutations),
          itemStyle: { color: "#dc3545" },
          smooth: true,
          symbolSize: 8
        },
        {
          name: "Avg Energy Gained",
          type: "line",
          yAxisIndex: 1,
          data: data.map(d => d.avgEnergy),
          smooth: true,
          itemStyle: { color: "#0d6efd" },
          symbolSize: 8
        },
      ],
    };

    chart.setOption(option);
  }, [runs]);

  return (
    <>
      <section className="p-3">
        <button onClick={handleSimulateNewRun} type="button" className="btn btn-danger me-2 mb-2">Simulate Run</button>
        <button onClick={() => setShowAllUsers(!showAllUsers)} className={`btn ${showAllUsers ? 'btn-outline-primary mb-2' : 'btn-primary mb-2'}`}>
          {showAllUsers ? "Showing: All Users" : "Showing: My Runs Only"}
        </button>
        <p>Total Runs: {runs.length}</p>
        <p>Total Mutations: {runs.flatMap(run => run.mutations).length}</p>
        <p>Total Battles: {runs.flatMap(run => run.battles).length}</p>
        <p>Total Waves: {runs.flatMap(run => run.waves).length}</p>
        <p>Total Anomalies: {runs.flatMap(run => run.anomalies).length}</p>
        <div className="chart" ref={chartRef} style={{ width: "100%", height: "400px" }} />;
      </section>
    </>
  )
}

export default MetricsPreview2;


export async function SimulateRun(settings: RunSimulationSettings) {
  const endpoint = "http://REDACTED/api/sim/run/1";

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
  let endpoint = "http://REDACTED/api/sim/run";
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