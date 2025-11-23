import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import type { Mutation } from "./Models/Mutation";
import type { Data, Layout } from "plotly.js";

function ProcessBattle(run, battle, wavesPerBattle, mutations) {
  const xValues = [];
  let yValues = [];
  for (let index = 0; index < wavesPerBattle; index++) {
    const m = mutations.find(x => x.RunCount == run && x.Battle == battle&& x.Wave == index)
    if (m != null) {
      yValues.push(1);
    } else {
      yValues.push(0);
    }
    xValues.push(index);
  }
  return xValues;
}

function MetricsPreview(props) {
  const [plotData, setPlotData] = useState<Data[]>([]);
  const [layout, setLayout] = useState<Partial<Layout>>({});

  useEffect(() => {
    const maxBattles = 5;
    const wavesPerBattle = 10;

    let xValues: number[] = [];
    const yMutationsGained: number[] = [];

    const energyColor = "rgb(253, 182, 70)";
    const damageTakenColor = "rgb(243, 107, 120)";
    const mutationColor = "rgb(89, 132, 252)";
    const epColor = "rgb(26, 199, 67)";
    const traces = [];

    xValues = ProcessBattle(0, 1, wavesPerBattle, props.mutations);

    traces.push({
      x: xValues,
      y: 0,
      name: "Mutations",
      type: "scatter",
      mode: "lines",
      line: {color: mutationColor, widht: 3},
    });
    // if (showEnergy)
    //   traces.push({
    //     x: xValues,
    //     y: yEnergyGained,
    //     name: "Energy gained",
    //     type: "scatter",
    //     mode: "lines",
    //     line: { color: energyColor, width: 3 },
    //   });

    // if (showDamageTaken)
    //   traces.push({
    //     x: xValues,
    //     y: yDamageTaken,
    //     name: "Damage taken",
    //     yaxis: "y2",
    //     type: "bar",
    //     marker: { color: damageTakenColor },
    //   });

    // if (showMutations)
    //   traces.push({
    //     x: xValues,
    //     y: yMutationsGained,
    //     name: "Mutations",
    //     yaxis: "y3",
    //     type: "scatter",
    //     mode: "lines",
    //     line: { color: mutationColor, width: 3 },
    //   });

    // if (showEP)
    //   traces.push({
    //     x: xValues,
    //     y: yEP,
    //     name: "EP",
    //     yaxis: "y4",
    //     type: "scatter",
    //     mode: "lines",
    //     line: { color: epColor, width: 3 },
    //   });

    // if (!showDamageTaken) {
    //   traces.push({
    //     x: [0],
    //     y: [0],
    //     yaxis: "y2",
    //     type: "scatter",
    //     mode: "lines",
    //     line: { color: "rgba(0,0,0,0)" },
    //     showlegend: false,
    //     hoverinfo: "skip",
    //   });
    // }

    const layout = {
      paper_bgcolor: "white",
      plot_bgcolor: "white",
      title: { text: "Run Plot" },
      xaxis: { domain: [0.05, 0.95] },
      yaxis: {
        title: { text: "Energy gained", font: { color: energyColor, size: 18 } },
        tickfont: { color: energyColor, size: 18 },
        overlaying: "y2",
      },
      yaxis2: {
        title: { text: "Damage taken", font: { color: damageTakenColor, size: 18 } },
        tickfont: { color: damageTakenColor, size: 18 },
        side: "right",
        range: [0, 20],
      },
      yaxis3: {
        title: { text: "Mutations", font: { color: mutationColor, size: 18 } },
        tickfont: { color: mutationColor, size: 18 },
        side: "right",
        overlaying: "y2",
        position: 1,
      },
      yaxis4: {
        title: { text: "EP", font: { color: epColor, size: 18 } },
        tickfont: { color: epColor, size: 18 },
        side: "left",
        overlaying: "y2",
        position: 0,
      },
    };
    setPlotData(traces);
    setLayout(layout);
  }, []);

  return (
      <div style={{ width: "100%", height: "600px" }}>
        {plotData.length > 0 && (
          <Plot
            data={plotData}
            layout={layout}
            config={{ responsive: true }}
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </div>
    );
  }

export default MetricsPreview;