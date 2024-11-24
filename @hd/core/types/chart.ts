export interface Chart {
  planets: Planet[];
  gates: Gate[];
  channels: number[];
  centers: number[];
  profile: number;
  cross: number;
  variable: number;
  designBaseOrientation?: number;
  determination: number;
  cognition: number;
  environment: number;
  personalityBaseOrientation?: number;
  motivation: number;
  transference: number;
  sense: number;
  view: number;
  type: number;
  authority: number;
  definition: number;
  group: Group;
  cycles: Cycles;
}

export interface Planet {
  activation: number;
  base: number;
  color: number;
  fixing: Fixing;
  gate: number;
  line: number;
  tone: number;
  basePercent?: number;
  colorPercent?: number;
  gatePercent?: number;
  id: number;
  longitude: number;
  linePercent?: number;
  tonePercent?: number;
  chartId?: number;
  baseAlignment?: number;
}

export interface Fixing {
  triggers: Trigger[];
  state: number;
  conditioned: boolean;
}

export interface Trigger {
  state: number;
  planet: number;
  activation: number;
  gate: number;
  line: number;
  chartId?: number;
}

export interface Gate {
  gate: number;
  mode: number;
}

export interface Group {
  env: string[];
  lg: boolean | number[];
  th: number[];
}

export interface Cycles {
  chiron: string;
  saturn: string;
  uranus: string;
  secondSaturn?: string;
}
