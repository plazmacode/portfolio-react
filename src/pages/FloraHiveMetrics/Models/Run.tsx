import type { Anomaly } from "./Anomaly";
import type { Battle } from "./Battle";
import type { Mutation } from "./Mutation";
import type { Wave } from "./Wave";

export type Run = {
  Mutations: Mutation[]
  Battles: Battle[]
  Waves: Wave[]
  Anomalies: Anomaly[]
}