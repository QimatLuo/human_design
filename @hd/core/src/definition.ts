export function definition(x: number) {
  switch (x) {
    case 0:
      return "無定義";
    case 1:
      return "單一定義";
    case 2:
      return "二分定義";
    case 3:
      return "三分定義";
    case 4:
      return "四分定義";
    default:
      console.warn("definition", x);
      return String(x);
  }
}
