export function center(xs: number[]) {
  return {
    ajna: isEnabled(xs[7]),
    g: isEnabled(xs[5]),
    head: isEnabled(xs[8]),
    ego: isEnabled(xs[4]),
    root: isEnabled(xs[0]),
    sacral: isEnabled(xs[1]),
    solarplexus: isEnabled(xs[3]),
    spleen: isEnabled(xs[2]),
    throat: isEnabled(xs[6]),
  };
}

function isEnabled(x: number) {
  switch (x) {
    case 0:
    case 1:
      return false;
    case 2:
      return true;
    default:
      console.warn("center", x);
      return false;
  }
}
