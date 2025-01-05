import type { Planet } from "../types/chart.ts";
import { PlanetId } from "./PlanetId.ts";

export function arrow(planets: Planet[]) {
  return planets
    .filter((x) => x.id === PlanetId.sun || x.id === PlanetId.northNode)
    .map(({ activation, base, id, tone }) => ({
      activation,
      base,
      id,
      left: direction(tone),
      tone,
    }));
}

function direction(x: number) {
  switch (x) {
    case 1:
    case 2:
    case 3:
      return true;
    case 4:
    case 5:
    case 6:
      return false;
    default:
      console.warn("arrow", x);
      return false;
  }
}
