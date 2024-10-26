export async function getChart(
  name: string,
  time: string,
  country: string,
  timezone: string,
) {
  const url =
    location.hostname === "localhost"
      ? "https://qimat.apps.beta.diagnostic.westpharma.com/human_design"
      : "https://app.maiamechanics.com/api-v2/api/web-calculator/server-side-generation";

  return fetch(url, {
    headers: {
      "calculator-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhZGVjNmYzMi00YzhjLTQyNzUtYTYwZC00YjdkY2RiY2QxOTEiLCJ3ZWJzaXRlVXJsIjoiaHR0cHM6Ly9odW1hbmRlc2lnbi1nYWxheHkuY29tIiwiaWF0IjoxNjkxNTcwMjU1fQ.mDRPEURo3d7LyjMl2Hl7xIh3zZuwrLQUvCYfyHnE8ok",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      tzData: {
        country,
        timezone,
        timeInUtc: false,
        time,
      },
      data: {
        name,
      },
    }),
    method: "POST",
  }).then((x) => x.json() as Promise<Root>);
}

export interface Root {
  chart: Chart;
  meta: Meta;
}

export interface Chart {
  planets: Planet[];
  gates: Gate[];
  channels: number[];
  centers: number[];
  profile: number;
  cross: number;
  variable: number;
  designBaseOrientation: number;
  determination: number;
  cognition: number;
  environment: number;
  personalityBaseOrientation: number;
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
  basePercent: number;
  colorPercent: number;
  gatePercent: number;
  id: number;
  longitude: number;
  linePercent: number;
  tonePercent: number;
  chartId: number;
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
  chartId: number;
}

export interface Gate {
  gate: number;
  mode: number;
}

export interface Group {
  env: string[];
  lg: number[];
  th: number[];
}

export interface Cycles {
  chiron: string;
  saturn: string;
  uranus: string;
  secondSaturn: string;
}

export interface Meta {
  type: string;
  name: string;
  tags: any[];
  created: string;
  updated: string;
  dirty: boolean;
  birthData: BirthData;
}

export interface BirthData {
  location: Location;
  time: Time;
  reliability: Reliability;
}

export interface Location {
  country: Country;
  city: City;
}

export interface Country {
  id: string;
  name: string;
  tz: string;
}

export interface City {
  name: string;
  timezone: string;
  tz: string;
}

export interface Time {
  local: string;
  utc: string;
  status: string;
  timezone: Timezone;
  dst: any;
}

export interface Timezone {
  id: string;
  name: string;
  offset: number;
}

export interface Reliability {
  score: number;
  context: string;
  changes: Changes;
}

export interface Changes {
  authority: number;
  cross: number;
  definition: number;
  profile: number;
  type: number;
  variable: number;
  channels: number;
  centers: number;
}

export function arrow(x: number) {
  switch (x) {
    case 1:
    case 2:
    case 3:
      return 1;
    case 4:
    case 5:
    case 6:
      return -1;
    default:
      console.warn("arrow", x);
      return 0;
  }
}

export function authority(x: number) {
  switch (x) {
    case 0:
      return "情緒權威";
    case 2:
      return "脾權威";
    default:
      console.warn("authority", x);
      return String(x);
  }
}

export function center(i: number, xs: number[]) {
  switch (xs[i]) {
    case 0:
    case 1:
      return "#ffffff";
    case 2:
      return "#eec665";
    default:
      console.warn("center", xs[i]);
      return "#000000";
  }
}

export function cross(x: number) {
  switch (x) {
    case 125:
      return "左角度交叉之動盪 (18/17 | 39/38)";
    case 183:
      return "右角度交叉之張力(38/39 | 48/21)";
    default:
      console.warn("cross", x);
      return String(x);
  }
}

export function definition(x: number) {
  switch (x) {
    case 1:
      return "單一定義";
    case 2:
      return "二分定義";
    default:
      console.warn("definition", x);
      return String(x);
  }
}

export function gate(x: Gate) {
  switch (x.mode) {
    case 0:
      return "green";
    case 1:
      return "#ec8a8c";
    case 2:
      return "#094166";
    default:
      console.warn("gate", x);
      return "#000000";
  }
}

export function state(x: number) {
  switch (x) {
    case 1:
      return -1;
    case 2:
      return 1;
    default:
      console.warn("state", x);
      return 0;
  }
}
