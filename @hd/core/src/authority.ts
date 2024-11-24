export function authority(x: number, definition: number) {
  switch (x) {
    case 0:
      return "情緒權威";
    case 1:
      return "薦骨權威";
    case 2:
      return "直覺權威"; // 脾權威
    case 3:
      return "意志⼒權威"; // 顯示型心權威
    case 4:
      return "⾃我投射權威"; //自我投射型權威"
    case 5:
      return "投射型心權威";
    case 6:
      return definition === 0 ? "⽉循環權威" : "環境權威"; // ? 月亮循環 : 反響板
    default:
      console.warn("authority", x);
      return String(x);
  }
}
