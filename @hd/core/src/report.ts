import type { Chart } from "../types/chart.ts";
import { arrow } from "./arrow.ts";
import { authority } from "./authority.ts";
import { center } from "./center.ts";
import { cross } from "./cross.ts";
import { definition } from "./definition.ts";
import { profile } from "./profile.ts";
import { signature } from "./signature.ts";
import { strategy } from "./strategy.ts";
import { theme } from "./theme.ts";
import { type } from "./type.ts";

export function report(chart: Chart) {
  return {
    arrow: arrow(chart.planets),
    authority: authority(chart.authority, chart.definition),
    cross: cross(chart.planets, chart.profile),
    center: center(chart.centers),
    definition: definition(chart.definition),
    profile: profile(chart.profile),
    signature: signature(chart.type),
    strategy: strategy(chart.type),
    theme: theme(chart.type),
    type: type(chart.type),
  };
}
