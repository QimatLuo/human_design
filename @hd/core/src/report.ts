import { Chart } from "../types/chart";
import { arrow } from "./arrow";
import { authority } from "./authority";
import { center } from "./center";
import { cross } from "./cross";
import { definition } from "./definition";
import { profile } from "./profile";
import { signature } from "./signature";
import { strategy } from "./strategy";
import { theme } from "./theme";
import { type } from "./type";

export function report(chart: Chart) {
  return {
    arrow: arrow(chart.planets),
    authority: authority(chart.authority, chart.definition),
    cross: cross(chart.cross),
    center: center(chart.centers),
    definition: definition(chart.definition),
    profile: profile(chart.profile),
    signature: signature(chart.type),
    strategy: strategy(chart.type),
    theme: theme(chart.type),
    type: type(chart.type),
  };
}
