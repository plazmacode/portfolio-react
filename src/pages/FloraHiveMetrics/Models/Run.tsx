import type { Anomaly } from "./Anomaly";
import type { Battle } from "./Battle";
import type { Mutation } from "./Mutation";
import type { Wave } from "./Wave";

export type Run = {
  mutations: Mutation[]
  battles: Battle[]
  waves: Wave[][]
  anomalies: Anomaly[]
}