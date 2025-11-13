import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import type { Wave } from "./Models/Wave";
import type {Battle} from "./Models/Battle";
import type { Mutation } from "./Models/Mutation";
import type { Data, Layout } from "plotly.js";

const Waves: Wave[] = [];
const WavesWithTerrain: Wave[] = [];
const Battles: Battle[] = [];
const Mutations:Mutation[] = [];
const MutationsInBattles:Mutation[] = [];
const BattleWaveCounts = [8, 14, 18, 22, 26, 34, 42, 48];
let MutationCount = 0;

function FindMutationsInBattles() {
  Mutations.forEach(mutation => {
    const battle = Battles.filter((x) => x.id == mutation.id && x.resets == mutation.resets && x.runCount == mutation.runCount && x.battleCount == mutation.battle);
    if (battle.length > 0) {
      MutationsInBattles.push(mutation);
    }
  });

  Waves.forEach(wave => {
    const battle = Battles.filter((x) => x.id == wave.id && x.resets == wave.resets && x.runCount == wave.runCount && x.battleCount == wave.battleCount)[0];
    wave.terrainType = battle.terrainType;
    WavesWithTerrain.push(wave);
  });
}

function ProcessBattle(battleCount: number) {
  const yEnergyGained: number[] = [];
  const yDamageTaken: number[] = [];
  const yMutationsGained: number[] = [];
  const yEP: number[] = [];
  const xValues: number[] = [];

  const battleWaves = Waves.filter((x) => x.battleCount === battleCount);
  const waveAmount = BattleWaveCounts[battleCount - 1] || 0;

  for (let index = 1; index <= waveAmount; index++) {
    const currentWaves = battleWaves.filter((x) => x.waveCount === index);
    const currentMutations = MutationsInBattles.filter((x) => x.wave === index && x.battle === battleCount);

    const sumEnergy = currentWaves.reduce((sum: number, item) => sum + item.energyGained, 0);
    const sumEP = currentWaves.reduce((sum: number, item) => sum + item.evolutionPointsGained, 0);
    const sumDamageTaken = currentWaves.reduce((sum: number, item) => sum + item.damageTaken, 0);

    MutationCount += currentMutations.length / (currentWaves.length || 1);

    yEnergyGained.push(sumEnergy / (currentWaves.length || 1));
    yDamageTaken.push(sumDamageTaken / (currentWaves.length || 1));
    yMutationsGained.push(MutationCount);
    yEP.push(sumEP / (currentWaves.length || 1));
    xValues.push(index);
  }

  return [xValues, yEnergyGained, yDamageTaken, yMutationsGained, yEP];
}

function MetricsPreview() {
  const [plotData, setPlotData] = useState<Data[]>([]);
  const [layout, setLayout] = useState<Partial<Layout>>({});

  useEffect(() => {
    const showEnergy = true;
    const showDamageTaken = true;
    const showMutations = true;
    const showEP = true;
    const maxBattles = 3;
    const battleDatas = [];

    FindMutationsInBattles();

    MutationCount = 0; // reset before new plot
    for (let i = 1; i <= maxBattles; i++) {
      battleDatas.push(ProcessBattle(i));
    }

    const xValues: string[] = [];
    const yEnergyGained: number[] = [];
    const yDamageTaken: number[] = [];
    const yMutationsGained: number[] = [];
    const yEP: number[] = [];

    for (let battleIndex = 1; battleIndex <= maxBattles; battleIndex++) {
      for (let waveIndex = 1; waveIndex <= (BattleWaveCounts[battleIndex - 1] || 0); waveIndex++) {
        xValues.push(`${battleIndex}-${waveIndex}`);
        yEnergyGained.push(battleDatas[battleIndex - 1][1][waveIndex - 1]);
        yDamageTaken.push(battleDatas[battleIndex - 1][2][waveIndex - 1]);
        yMutationsGained.push(battleDatas[battleIndex - 1][3][waveIndex - 1]);
        yEP.push(battleDatas[battleIndex - 1][4][waveIndex - 1]);
      }
    }

    const energyColor = "rgb(253, 182, 70)";
    const damageTakenColor = "rgb(243, 107, 120)";
    const mutationColor = "rgb(89, 132, 252)";
    const epColor = "rgb(26, 199, 67)";

    const traces = [];
    if (showEnergy)
      traces.push({
        x: xValues,
        y: yEnergyGained,
        name: "Energy gained",
        type: "scatter",
        mode: "lines",
        line: { color: energyColor, width: 3 },
      });

    if (showDamageTaken)
      traces.push({
        x: xValues,
        y: yDamageTaken,
        name: "Damage taken",
        yaxis: "y2",
        type: "bar",
        marker: { color: damageTakenColor },
      });

    if (showMutations)
      traces.push({
        x: xValues,
        y: yMutationsGained,
        name: "Mutations",
        yaxis: "y3",
        type: "scatter",
        mode: "lines",
        line: { color: mutationColor, width: 3 },
      });

    if (showEP)
      traces.push({
        x: xValues,
        y: yEP,
        name: "EP",
        yaxis: "y4",
        type: "scatter",
        mode: "lines",
        line: { color: epColor, width: 3 },
      });

    if (!showDamageTaken) {
      traces.push({
        x: [0],
        y: [0],
        yaxis: "y2",
        type: "scatter",
        mode: "lines",
        line: { color: "rgba(0,0,0,0)" },
        showlegend: false,
        hoverinfo: "skip",
      });
    }

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