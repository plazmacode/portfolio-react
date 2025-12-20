import { useEffect, useRef } from "react";
import { init, getInstanceByDom, type EChartsOption } from "echarts";
import type { Run } from "./Models/Run";

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
function MetricsPreview2(props: MetricsPreviewProps) {
  const chartRef = useRef<HTMLDivElement | null>(null);

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

    const data = processAverages(props.runs);

    const option: EChartsOption = {
      title: {
        text: 'Average Run Performance',
        left: 'center',
        textStyle: { fontSize: 14 }
      },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "cross" },
        // Formatting tooltip to show decimals nicely
        valueFormatter: (value: any) => Number(value).toFixed(2)
      },
      legend: { 
        data: ["Avg Mutation Count", "Avg Energy Gained"],
        bottom: 0 
      },
      grid: { bottom: 80 },
      xAxis: {
        type: "category",
        data: data.map(d => d.label),
        axisLabel: { rotate: 45 },
      },
      yAxis: [
        { type: "value", name: "Mutations", position: "left" },
        { type: "value", name: "Energy", position: "right" }
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
  }, [props.runs]);

  return <div ref={chartRef} style={{ width: "100%", height: "400px" }} />;
}

export default MetricsPreview2;


interface MetricsPreviewProps {
  runs: Run[]
}