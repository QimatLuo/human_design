export function signature(type: number) {
  switch (type) {
    case 0:
    case 1:
      return "滿足";
    case 2:
      return "平靜";
    case 3:
      return "成功";
    case 4:
      return "驚喜";
    default:
      return "";
  }
}
