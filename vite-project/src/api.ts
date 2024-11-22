export async function getChart(name: string, time: string, timezone: string) {
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
  baseAlignment: number;
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
    case 1:
      return "薦骨權威";
    case 2:
      return "脾權威";
    case 3:
      return "意志⼒權威"; // 顯示型心權威
    case 5:
      return "投射型心權威";
    case 6:
      return "⽉循環權威"; // 月亮循環, 反響板
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
      return [
        "#eec665",
        "#f7931e",
        "#eec665",
        "#eec665",
        "#f7931e",
        "#aee8b8",
        "#eec665",
        "#aee8b8",
        "#aee8b8",
      ][i];
    default:
      console.warn("center", xs[i]);
      return "#000000";
  }
}

export function cross(x: number) {
  switch (x) {
    case 73:
      return "左角度交叉之循環 (54/53 | 32/42)";
    case 79:
      return "左角度交叉之要求 (58/52 | 48/21)";
    case 81:
      return "左角度交叉之分心 (60/56 | 28/27)";
    case 86:
      return "左角度交叉之教育 (12/11 | 25/46)";
    case 116:
      return "左角度交叉之革命 (49/4 | 14/8)";
    case 117:
      return "左角度交叉之革命 (4/49 | 8/14)";
    case 125:
      return "左角度交叉之動盪 (18/17 | 39/38)";
    case 126:
      return "左角度交叉之願望 (3/50 | 41/31)";
    case 129:
      return "右角度交叉之意識 (35/5 | 63/64)";
    case 131:
      return "右角度交叉之意識 (5/35 | 64/63)";
    case 169:
      return "右角度交叉之服務 (52/58 | 17/18)";
    case 181:
      return "右角度交叉之張力 (39/38 | 21/48)";
    case 183:
      return "右角度交叉之張力 (38/39 | 48/21)";
    case 187:
      return "右角度交叉之意料之外 (41/31 | 28/27)";
    case 188:
      return "右角度交叉之愛的器皿 (25/46 | 10/15)";
    default:
      console.warn("cross", x);
      return String(x);
  }
}

export function definition(x: number) {
  switch (x) {
    case 0:
      return "無定義";
    case 1:
      return "單一定義";
    case 2:
      return "二分定義";
    case 3:
      return "三分定義";
    case 4:
      return "四分定義";
    default:
      console.warn("definition", x);
      return String(x);
  }
}

export function gate(x: Gate) {
  switch (x.mode) {
    case 0:
      return "#ec8a8c";
    case 1:
      return "#094166";
    case 2:
      return "url(#red_black)";
    default:
      console.warn("gate", x);
      return "#000000";
  }
}

export function profile(x: number) {
  const [a, b] = x.toString().split("");
  return `${a}/${b}`;
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

export function type(x: number) {
  switch (x) {
    case 0:
      return "生產者";
    case 1:
      return "顯示生產者";
    case 2:
      return "顯示者";
    case 3:
      return "投射者";
    case 4:
      return "反映者";
    default:
      console.warn("type", x);
      return String(x);
  }
}
