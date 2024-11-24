export function theme(type: number) {
  switch (type) {
    case 0:
    case 1:
      return "挫敗";
    case 2:
      return "憤怒";
    case 3:
      return "苦澀";
    case 4:
      return "失望";
    default:
      return "";
  }
}
