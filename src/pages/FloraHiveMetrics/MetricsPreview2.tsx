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

    type Key = {
      battle: number;
      wave: number;
    };
    // Aggregate mutations by Battle/Wave
    const counts = new Map<string, { key: Key; count: number }>();

    props.runs.forEach(run => {
      run.mutations.forEach(mutation => {
        const battle = mutation.battle;
        const wave = mutation.wave;

        const mapKey = `${battle}:${wave}`;

        const entry = counts.get(mapKey);
        if (entry) {
          entry.count += Math.max(0, mutation.mutationCount);
        } else {
          counts.set(mapKey, {
            key: { battle, wave },
            count: mutation.mutationCount,
          });
        }
      });
    });

    // Sort numerically battle -> wave (battle1, wave1, wave2, wave3... battle2, wave1, wave2, wave3)
    const ordered = Array.from(counts.values()).sort((a, b) => {
      if (a.key.battle !== b.key.battle) {
        return a.key.battle - b.key.battle;
      }
      return a.key.wave - b.key.wave;
    });

    // Convert to arrays for Echarts x,y axis
    const categories = ordered.map(
      e => `B${e.key.battle}-W${e.key.wave}`
    );

    const values = ordered.map(e => e.count);

    const option: EChartsOption = {
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
      },
      xAxis: {
        type: "category",
        data: categories,
        axisLabel: {
          rotate: 45,
        },
      },
      yAxis: {
        type: "value",
        name: "Mutation Count",
      },
      series: [
        {
          type: "bar",
          data: values,
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