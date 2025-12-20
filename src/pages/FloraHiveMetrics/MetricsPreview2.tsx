import { useEffect, useRef } from "react";
import { init, getInstanceByDom, type EChartsOption } from "echarts";
import type { Run } from "./Models/Run";

/*
Uses the Apache ECharts visualization library to build a chart.
Shows mutations earned over a simulated run provided from the FloraHive Metrics API
*/
function MetricsPreview2(props: MetricsPreviewProps) {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = init(chartRef.current);

    return () => {
      chart.dispose();
    };
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = getInstanceByDom(chartRef.current);
    if (!chart) return;

    type DataPoint = {
      battle: number;
      wave: number;
      mutationCount: number;
      energyGained: number;
    };

    const statsMap = new Map<string, DataPoint>();
    props.runs.forEach(run => {
      run.mutations.forEach(m => {
        const key = `${m.battle}:${m.wave}`;
        const existing = statsMap.get(key) || { battle: m.battle, wave: m.wave, mutationCount: 0, energyGained: 0 };
        existing.mutationCount += Math.max(0, m.mutationCount);
        statsMap.set(key, existing);
      });

      run.waves.forEach(battleGroup => {
        battleGroup.forEach(w => {
          
          const b = w.battleCount;
          const wv = w.waveCount;
          const energy = w.energyGained;

          if (b !== undefined && wv !== undefined) {
            const key = `${b}:${wv}`;
            const existing = statsMap.get(key) || { battle: b, wave: wv, mutationCount: 0, energyGained: 0 };
            
            existing.energyGained += (energy || 0);
            statsMap.set(key, existing);
          }
        });
      });
    });

    // Sort numerically battle -> wave (battle1, wave1, wave2, wave3... battle2, wave1, wave2, wave3)
    const ordered = Array.from(statsMap.values()).sort((a, b) => 
      a.battle !== b.battle ? a.battle - b.battle : a.wave - b.wave
    );

    // Convert to arrays for Echarts x,y axis
    const categories = ordered.map(e => `B${e.battle}-W${e.wave}`);
    const mutationValues = ordered.map(e => e.mutationCount);
    const energyValues = ordered.map(e => e.energyGained);

    const option: EChartsOption = {
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "cross" }, // Changed to cross for better dual-axis tracking
      },
      legend: { data: ["Mutation Count", "Energy Gained"] },
      xAxis: {
        type: "category",
        data: categories,
        axisLabel: { rotate: 45 },
      },
      yAxis: [
        { type: "value", name: "Mutations", position: "left" },
        { type: "value", name: "Energy", position: "right" } // Added second Y-axis
      ],
      series: [
        {
          name: "Mutation Count",
          type: "bar",
          data: mutationValues,
          itemStyle: { color: "#dc3545" } // Match your btn-danger color
        },
        {
          name: "Energy Gained",
          type: "line", // The requested line series
          yAxisIndex: 1, // Link to the right Y-axis
          data: energyValues,
          smooth: true,
          itemStyle: { color: "#0d6efd" } // Bootstrap Primary blue
        },
      ],
    };
    chart.setOption(option);
}, [props.runs]);

  return (
    <div
      ref={chartRef}
      style={{ width: "100%", height: "350px" }}
    />
  );
}

export default MetricsPreview2;


interface MetricsPreviewProps {
  runs: Run[]
}