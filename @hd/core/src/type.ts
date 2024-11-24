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
