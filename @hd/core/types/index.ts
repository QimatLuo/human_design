import { Chart } from "./chart.ts";
import { Meta } from "./meta.ts";

export interface ApiRes {
  chart: Chart;
  meta: Meta;
}
