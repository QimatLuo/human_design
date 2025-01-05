import type { Chart } from "./chart.ts";
import type { Meta } from "./meta.ts";

export interface ApiRes {
  chart: Chart;
  meta: Meta;
}
