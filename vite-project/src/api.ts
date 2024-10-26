export async function getChart(
  ...args: Parameters<typeof serverSideGeneration>
) {
  return location.hostname === "localhost"
    ? mock()
    : serverSideGeneration(...args);
}

async function serverSideGeneration(name: string) {
  return fetch(
    "https://app.maiamechanics.com/api-v2/api/web-calculator/server-side-generation",
    {
      headers: {
        "calculator-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhZGVjNmYzMi00YzhjLTQyNzUtYTYwZC00YjdkY2RiY2QxOTEiLCJ3ZWJzaXRlVXJsIjoiaHR0cHM6Ly9odW1hbmRlc2lnbi1nYWxheHkuY29tIiwiaWF0IjoxNjkxNTcwMjU1fQ.mDRPEURo3d7LyjMl2Hl7xIh3zZuwrLQUvCYfyHnE8ok",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        tzData: {
          country: "TW",
          city: "Taipei (Taiwan)",
          timezone: "Asia/Taipei",
          timeInUtc: false,
          time: "2024-10-01T01:00:00Z",
        },
        data: {
          name,
        },
      }),
      method: "POST",
    },
  ).then((x) => x.json() as Promise<Root>);
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

function mock(): Promise<Root> {
  return Promise.resolve({
    chart: {
      planets: [
        {
          activation: 1,
          base: 2,
          color: 3,
          fixing: {
            triggers: [],
            state: 0,
            conditioned: false,
          },
          gate: 18,
          line: 5,
          tone: 4,
          basePercent: 6,
          colorPercent: 53,
          gatePercent: 73,
          id: 0,
          longitude: 188.02117797231023,
          linePercent: 42,
          tonePercent: 21,
          chartId: 0,
          baseAlignment: 1,
        },
        {
          activation: 1,
          base: 2,
          color: 3,
          fixing: {
            triggers: [],
            state: 0,
            conditioned: false,
          },
          gate: 17,
          line: 5,
          tone: 4,
          basePercent: 6,
          colorPercent: 53,
          gatePercent: 73,
          id: 1,
          longitude: 8.021177972310227,
          linePercent: 42,
          tonePercent: 21,
          chartId: 0,
          baseAlignment: 1,
        },
        {
          activation: 1,
          base: 3,
          color: 3,
          fixing: {
            triggers: [],
            state: 0,
            conditioned: false,
          },
          gate: 64,
          line: 5,
          tone: 5,
          basePercent: 84,
          colorPercent: 76,
          gatePercent: 74,
          id: 2,
          longitude: 165.55646763488252,
          linePercent: 46,
          tonePercent: 56,
          chartId: 0,
        },
        {
          activation: 1,
          base: 3,
          color: 6,
          fixing: {
            triggers: [
              {
                state: 1,
                planet: 1,
                activation: 1,
                gate: 17,
                line: 5,
                chartId: 0,
              },
            ],
            state: 1,
            conditioned: false,
          },
          gate: 17,
          line: 3,
          tone: 5,
          basePercent: 25,
          colorPercent: 74,
          gatePercent: 49,
          id: 3,
          longitude: 6.647141433583787,
          linePercent: 95,
          tonePercent: 45,
          chartId: 0,
          baseAlignment: 0,
        },
        {
          activation: 1,
          base: 3,
          color: 6,
          fixing: {
            triggers: [],
            state: 0,
            conditioned: false,
          },
          gate: 18,
          line: 3,
          tone: 5,
          basePercent: 25,
          colorPercent: 74,
          gatePercent: 49,
          id: 4,
          longitude: 186.64714143358378,
          linePercent: 95,
          tonePercent: 45,
          chartId: 0,
          baseAlignment: 0,
        },
        {
          activation: 1,
          base: 5,
          color: 2,
          fixing: {
            triggers: [],
            state: 0,
            conditioned: false,
          },
          gate: 18,
          line: 5,
          tone: 4,
          basePercent: 75,
          colorPercent: 65,
          gatePercent: 71,
          id: 5,
          longitude: 187.88415171945954,
          linePercent: 27,
          tonePercent: 95,
          chartId: 0,
        },
        {
          activation: 1,
          base: 3,
          color: 5,
          fixing: {
            triggers: [],
            state: 0,
            conditioned: false,
          },
          gate: 44,
          line: 2,
          tone: 3,
          basePercent: 50,
          colorPercent: 41,
          gatePercent: 28,
          id: 6,
          longitude: 219.25261830658548,
          linePercent: 73,
          tonePercent: 50,
          chartId: 0,
        },
        {
          activation: 1,
          base: 3,
          color: 4,
          fixing: {
            triggers: [
              {
                state: 1,
                planet: 7,
                activation: 1,
                gate: 39,
                line: 6,
                chartId: 0,
              },
            ],
            state: 1,
            conditioned: false,
          },
          gate: 39,
          line: 6,
          tone: 2,
          basePercent: 79,
          colorPercent: 25,
          gatePercent: 92,
          id: 7,
          longitude: 104.6968732337152,
          linePercent: 54,
          tonePercent: 55,
          chartId: 0,
        },
        {
          activation: 1,
          base: 5,
          color: 3,
          fixing: {
            triggers: [
              {
                state: 1,
                planet: 8,
                activation: 1,
                gate: 45,
                line: 5,
                chartId: 0,
              },
            ],
            state: 1,
            conditioned: false,
          },
          gate: 45,
          line: 5,
          tone: 6,
          basePercent: 27,
          colorPercent: 97,
          gatePercent: 74,
          id: 8,
          longitude: 81.21496181175036,
          linePercent: 49,
          tonePercent: 85,
          chartId: 0,
        },
        {
          activation: 1,
          base: 2,
          color: 2,
          fixing: {
            triggers: [],
            state: 0,
            conditioned: false,
          },
          gate: 63,
          line: 4,
          tone: 2,
          basePercent: 55,
          colorPercent: 21,
          gatePercent: 53,
          id: 9,
          longitude: 344.3779081387008,
          linePercent: 20,
          tonePercent: 31,
          chartId: 0,
        },
        {
          activation: 1,
          base: 4,
          color: 4,
          fixing: {
            triggers: [],
            state: 0,
            conditioned: false,
          },
          gate: 8,
          line: 3,
          tone: 3,
          basePercent: 5,
          colorPercent: 43,
          gatePercent: 42,
          id: 10,
          longitude: 56.91172677566213,
          linePercent: 57,
          tonePercent: 61,
          chartId: 0,
        },
        {
          activation: 1,
          base: 5,
          color: 6,
          fixing: {
            triggers: [],
            state: 0,
            conditioned: false,
          },
          gate: 36,
          line: 6,
          tone: 6,
          basePercent: 67,
          colorPercent: 98,
          gatePercent: 99,
          id: 11,
          longitude: 358.24831999562525,
          linePercent: 99,
          tonePercent: 93,
          chartId: 0,
        },
        {
          activation: 1,
          base: 4,
          color: 4,
          fixing: {
            triggers: [],
            state: 0,
            conditioned: false,
          },
          gate: 60,
          line: 4,
          tone: 1,
          basePercent: 14,
          colorPercent: 10,
          gatePercent: 58,
          id: 12,
          longitude: 299.67260964884787,
          linePercent: 51,
          tonePercent: 62,
          chartId: 0,
        },
        {
          activation: 0,
          base: 1,
          color: 4,
          fixing: {
            triggers: [
              {
                state: 2,
                planet: 7,
                activation: 1,
                gate: 39,
                line: 6,
                chartId: 0,
              },
            ],
            state: 2,
            conditioned: false,
          },
          gate: 39,
          line: 1,
          tone: 3,
          basePercent: 6,
          colorPercent: 33,
          gatePercent: 9,
          id: 0,
          longitude: 100.02117797235266,
          linePercent: 55,
          tonePercent: 1,
          chartId: 0,
          baseAlignment: 0,
        },
        {
          activation: 0,
          base: 1,
          color: 4,
          fixing: {
            triggers: [],
            state: 0,
            conditioned: false,
          },
          gate: 38,
          line: 1,
          tone: 3,
          basePercent: 6,
          colorPercent: 33,
          gatePercent: 9,
          id: 1,
          longitude: 280.0211779723527,
          linePercent: 55,
          tonePercent: 1,
          chartId: 0,
          baseAlignment: 0,
        },
        {
          activation: 0,
          base: 2,
          color: 6,
          fixing: {
            triggers: [
              {
                state: 2,
                planet: 2,
                activation: 0,
                gate: 24,
                line: 5,
                chartId: 0,
              },
            ],
            state: 2,
            conditioned: false,
          },
          gate: 24,
          line: 5,
          tone: 4,
          basePercent: 51,
          colorPercent: 55,
          gatePercent: 82,
          id: 2,
          longitude: 42.24228019701532,
          linePercent: 92,
          tonePercent: 30,
          chartId: 0,
        },
        {
          activation: 0,
          base: 3,
          color: 1,
          fixing: {
            triggers: [
              {
                state: 1,
                planet: 8,
                activation: 1,
                gate: 45,
                line: 5,
                chartId: 0,
              },
            ],
            state: 1,
            conditioned: false,
          },
          gate: 21,
          line: 3,
          tone: 4,
          basePercent: 76,
          colorPercent: 59,
          gatePercent: 34,
          id: 3,
          longitude: 11.467504766405947,
          linePercent: 9,
          tonePercent: 55,
          chartId: 0,
          baseAlignment: 2,
        },
        {
          activation: 0,
          base: 3,
          color: 1,
          fixing: {
            triggers: [],
            state: 0,
            conditioned: false,
          },
          gate: 48,
          line: 3,
          tone: 4,
          basePercent: 76,
          colorPercent: 59,
          gatePercent: 34,
          id: 4,
          longitude: 191.46750476640594,
          linePercent: 9,
          tonePercent: 55,
          chartId: 0,
          baseAlignment: 2,
        },
        {
          activation: 0,
          base: 3,
          color: 5,
          fixing: {
            triggers: [],
            state: 0,
            conditioned: false,
          },
          gate: 56,
          line: 2,
          tone: 2,
          basePercent: 7,
          colorPercent: 23,
          gatePercent: 28,
          id: 5,
          longitude: 117.97435116830883,
          linePercent: 70,
          tonePercent: 41,
          chartId: 0,
        },
        {
          activation: 0,
          base: 1,
          color: 3,
          fixing: {
            triggers: [],
            state: 0,
            conditioned: false,
          },
          gate: 53,
          line: 3,
          tone: 2,
          basePercent: 1,
          colorPercent: 16,
          gatePercent: 39,
          id: 6,
          longitude: 107.33864183238764,
          linePercent: 36,
          tonePercent: 0,
          chartId: 0,
        },
        {
          activation: 0,
          base: 3,
          color: 2,
          fixing: {
            triggers: [
              {
                state: 1,
                planet: 7,
                activation: 0,
                gate: 2,
                line: 4,
                chartId: 0,
              },
            ],
            state: 1,
            conditioned: false,
          },
          gate: 2,
          line: 4,
          tone: 1,
          basePercent: 76,
          colorPercent: 9,
          gatePercent: 53,
          id: 7,
          longitude: 46.233130946685876,
          linePercent: 18,
          tonePercent: 55,
          chartId: 0,
        },
        {
          activation: 0,
          base: 5,
          color: 5,
          fixing: {
            triggers: [],
            state: 0,
            conditioned: false,
          },
          gate: 16,
          line: 3,
          tone: 2,
          basePercent: 30,
          colorPercent: 31,
          gatePercent: 45,
          id: 8,
          longitude: 68.29844588209266,
          linePercent: 71,
          tonePercent: 86,
          chartId: 0,
        },
        {
          activation: 0,
          base: 1,
          color: 4,
          fixing: {
            triggers: [
              {
                state: 2,
                planet: 9,
                activation: 0,
                gate: 22,
                line: 3,
                chartId: 0,
              },
            ],
            state: 2,
            conditioned: false,
          },
          gate: 22,
          line: 3,
          tone: 4,
          basePercent: 78,
          colorPercent: 52,
          gatePercent: 43,
          id: 9,
          longitude: 349.4259815809877,
          linePercent: 58,
          tonePercent: 15,
          chartId: 0,
        },
        {
          activation: 0,
          base: 3,
          color: 2,
          fixing: {
            triggers: [],
            state: 0,
            conditioned: false,
          },
          gate: 8,
          line: 2,
          tone: 6,
          basePercent: 57,
          colorPercent: 91,
          gatePercent: 21,
          id: 10,
          longitude: 55.73735562295978,
          linePercent: 31,
          tonePercent: 51,
          chartId: 0,
        },
        {
          activation: 0,
          base: 3,
          color: 5,
          fixing: {
            triggers: [],
            state: 0,
            conditioned: false,
          },
          gate: 25,
          line: 2,
          tone: 5,
          basePercent: 85,
          colorPercent: 76,
          gatePercent: 29,
          id: 11,
          longitude: 359.9315296536487,
          linePercent: 79,
          tonePercent: 57,
          chartId: 0,
        },
        {
          activation: 0,
          base: 5,
          color: 2,
          fixing: {
            triggers: [],
            state: 0,
            conditioned: false,
          },
          gate: 60,
          line: 6,
          tone: 6,
          basePercent: 57,
          colorPercent: 98,
          gatePercent: 88,
          id: 12,
          longitude: 301.3727805384147,
          linePercent: 33,
          tonePercent: 91,
          chartId: 0,
        },
      ],
      gates: [
        {
          gate: 2,
          mode: 0,
        },
        {
          gate: 8,
          mode: 2,
        },
        {
          gate: 16,
          mode: 0,
        },
        {
          gate: 17,
          mode: 1,
        },
        {
          gate: 18,
          mode: 1,
        },
        {
          gate: 21,
          mode: 0,
        },
        {
          gate: 22,
          mode: 0,
        },
        {
          gate: 24,
          mode: 0,
        },
        {
          gate: 25,
          mode: 0,
        },
        {
          gate: 36,
          mode: 1,
        },
        {
          gate: 38,
          mode: 0,
        },
        {
          gate: 39,
          mode: 2,
        },
        {
          gate: 44,
          mode: 1,
        },
        {
          gate: 45,
          mode: 1,
        },
        {
          gate: 48,
          mode: 0,
        },
        {
          gate: 53,
          mode: 0,
        },
        {
          gate: 56,
          mode: 0,
        },
        {
          gate: 60,
          mode: 2,
        },
        {
          gate: 63,
          mode: 1,
        },
        {
          gate: 64,
          mode: 1,
        },
      ],
      channels: [33, 18],
      centers: [1, 0, 2, 1, 2, 1, 2, 1, 1],
      profile: 51,
      cross: 125,
      variable: 13,
      designBaseOrientation: 2,
      determination: 3,
      cognition: 2,
      environment: 0,
      personalityBaseOrientation: 2,
      motivation: 2,
      transference: 5,
      sense: 3,
      view: 6,
      type: 2,
      authority: 2,
      definition: 1,
      group: {
        env: ["solo", "large"],
        lg: [33],
        th: [2, 3],
      },
      cycles: {
        chiron: "2074-06-12T12:59:25Z",
        saturn: "2053-06-09T11:36:08Z",
        uranus: "2064-11-17T00:59:25Z",
        secondSaturn: "2083-03-22T09:34:07Z",
      },
    },
    meta: {
      type: "RAVE_CHART",
      name: "asfd",
      tags: [],
      created: "2024-10-26T12:46:01Z",
      updated: "2024-10-26T12:46:01Z",
      dirty: true,
      birthData: {
        location: {
          country: {
            id: "TW",
            name: "台灣",
            tz: "Asia/Taipei",
          },
          city: {
            name: "Taipei (Taiwan)",
            timezone: "Asia/Taipei",
            tz: "Asia/Taipei",
          },
        },
        time: {
          local: "2024-10-01T01:00:00",
          utc: "2024-09-30T17:00:00Z",
          status: "valid",
          timezone: {
            id: "Asia/Taipei",
            name: "GMT+8",
            offset: 8,
          },
          dst: null,
        },
        reliability: {
          score: 100,
          context: "CHANGES",
          changes: {
            authority: 0,
            cross: -581,
            definition: 0,
            profile: -581,
            type: 0,
            variable: -9,
            channels: 0,
            centers: 0,
          },
        },
      },
    },
  });
}
