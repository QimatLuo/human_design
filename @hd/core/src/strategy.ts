export function strategy(type: number) {
  switch (type) {
    case 0:
    case 1:
      return "回應";
    case 2:
      return "告知";
    case 3:
      return "等待邀請";
    case 4:
      return "等待月亮循環";
    default:
      return "";
  }
}
