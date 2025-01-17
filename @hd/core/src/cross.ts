import type { Planet } from "../types/chart.ts";

import { Activation } from "./Activation.ts";
import { PlanetId } from "./PlanetId.ts";

const mapping = new Map([
  ["1,2,4,49-j", "自我表達"],
  ["1,2,4,49-l", "違抗 2"],
  ["1,2,7,13-r", "人面獅身 4"],
  ["10,15,18,17-j", "行為舉止"],
  ["10,15,18,17-l", "預防 2"],
  ["10,15,46,25-r", "愛的器皿 4"],
  ["11,12,46,25-j", "想法"],
  ["11,12,46,25-l", "教育 2"],
  ["11,12,6,36-r", "伊甸園 2"],
  ["12,11,25,46-j", "表達"],
  ["12,11,25,46-l", "教育 1"],
  ["12,11,36,6-r", "伊甸園 4"],
  ["13,7,1,2-r", "人面獅身 1"],
  ["13,7,43,23-j", "傾聽"],
  ["13,7,43,23-l", "面具 1"],
  ["14,8,29,30-r", "感染 4"],
  ["14,8,59,55-j", "賦權"],
  ["14,8,59,55-l", "不確定 2"],
  ["15,10,17,18-j", "極端"],
  ["15,10,17,18-l", "預防 1"],
  ["15,10,25,46-r", "愛的器皿 2"],
  ["16,9,37,40-r", "計畫 2"],
  ["16,9,63,64-j", "實驗"],
  ["16,9,63,64-l", "指認 1"],
  ["17,18,38,39-j", "建議"],
  ["17,18,38,39-l", "動盪 1"],
  ["17,18,58,52-r", "服務 1"],
  ["18,17,39,38-j", "修正"],
  ["18,17,39,38-l", "動盪 2"],
  ["18,17,52,58-r", "服務 3"],
  ["19,33,1,2-j", "需求"],
  ["19,33,1,2-l", "精煉 2"],
  ["19,33,44,24-r", "四方之路 4"],
  ["2,1,13,7-r", "人面獅身 2"],
  ["2,1,49,4-j", "駕駛"],
  ["2,1,49,4-l", "違抗 1"],
  ["20,34,37,40-j", "當下"],
  ["20,34,37,40-l", "二元性 1"],
  ["20,34,55,59-r", "沈睡的鳳凰 2"],
  ["21,48,38,39-r", "張力 1"],
  ["21,48,54,53-j", "控制"],
  ["21,48,54,53-l", "努力 1"],
  ["22,47,11,12-j", "優雅"],
  ["22,47,11,12-l", "告知 1"],
  ["22,47,26,45-r", "統領 1"],
  ["23,43,30,29-j", "同化"],
  ["23,43,30,29-l", "奉獻 1"],
  ["23,43,49,4-r", "解釋 2"],
  ["24,44,13,7-j", "合理化"],
  ["24,44,13,7-l", "輪迴 1"],
  ["24,44,19,33-r", "四方之路 1"],
  ["25,46,10,15-r", "愛的器皿 1"],
  ["25,46,58,52-j", "純真"],
  ["25,46,58,52-l", "療癒 1"],
  ["26,45,47,22-r", "統領 4"],
  ["26,45,6,36-j", "幻術師"],
  ["26,45,6,36-l", "對峙 2"],
  ["27,28,19,33-j", "滋養"],
  ["27,28,19,33-l", "結盟 1"],
  ["27,28,41,31-r", "不預期 1"],
  ["28,27,31,41-r", "不預期 3"],
  ["28,27,33,19-j", "風險"],
  ["28,27,33,19-l", "結盟 2"],
  ["29,30,20,34-j", "承諾"],
  ["29,30,20,34-l", "勤奮 2"],
  ["29,30,8,14-r", "感染 3"],
  ["3,50,41,31-j", "突變"],
  ["3,50,41,31-l", "希望 1"],
  ["3,50,60,56-r", "律法 1"],
  ["30,29,14,8-r", "感染 1"],
  ["30,29,34,20-j", "命運"],
  ["30,29,34,20-l", "勤奮 1"],
  ["31,41,24,44-j", "影嚮力"],
  ["31,41,24,44-l", "領導 1"],
  ["31,41,27,28-r", "不預期 2"],
  ["32,42,56,60-j", "保育"],
  ["32,42,56,60-l", "限制 2"],
  ["32,42,62,61-r", "瑪雅 3"],
  ["33,19,2,1-j", "退隱"],
  ["33,19,2,1-l", "精煉 1"],
  ["33,19,24,44-r", "四方之路 2"],
  ["34,20,40,37-j", "力量"],
  ["34,20,40,37-l", "二元性 2"],
  ["34,20,59,55-r", "沈睡的鳳凰 4"],
  ["35,5,22,47-j", "經驗"],
  ["35,5,22,47-l", "分離 1"],
  ["35,5,63,64-r", "意識 2"],
  ["36,6,10,15-j", "危機"],
  ["36,6,10,15-l", "物質層面 1"],
  ["36,6,11,12-r", "伊甸園 1"],
  ["37,40,5,35-j", "協商"],
  ["37,40,5,35-l", "遷徙 1"],
  ["37,40,9,16-r", "計畫 1"],
  ["38,39,48,21-r", "張力 4"],
  ["38,39,57,51-j", "反對"],
  ["38,39,57,51-l", "個人主義 2"],
  ["39,38,21,48-r", "張力 2"],
  ["39,38,51,57-j", "挑釁"],
  ["39,38,51,57-l", "個人主義 1"],
  ["4,49,23,43-r", "解釋 3"],
  ["4,49,8,14-j", "公式"],
  ["4,49,8,14-l", "革命 2"],
  ["40,37,16,9-r", "計畫 3"],
  ["40,37,35,5-j", "拒絕"],
  ["40,37,35,5-l", "遷徙 2"],
  ["41,31,28,27-r", "不預期 4"],
  ["41,31,44,24-j", "幻想"],
  ["41,31,44,24-l", "領導 2"],
  ["42,32,60,56-j", "完成"],
  ["42,32,60,56-l", "限制 1"],
  ["42,32,61,62-r", "瑪雅 1"],
  ["43,23,29,30-j", "洞見"],
  ["43,23,29,30-l", "奉獻 2"],
  ["43,23,4,49-r", "解釋 4"],
  ["44,24,33,19-r", "四方之路 3"],
  ["44,24,7,13-j", "警覺"],
  ["44,24,7,13-l", "輪迴 2"],
  ["45,26,22,47-r", "統領 2"],
  ["45,26,36,6-j", "佔有"],
  ["45,26,36,6-l", "對峙 1"],
  ["46,25,15,10-r", "愛的器皿 3"],
  ["46,25,52,58-j", "機遇"],
  ["46,25,52,58-l", "療癒 2"],
  ["47,22,12,11-j", "壓抑"],
  ["47,22,12,11-l", "告知 2"],
  ["47,22,45,26-r", "統領 3"],
  ["48,21,39,38-r", "張力 3"],
  ["48,21,53,54-j", "深度"],
  ["48,21,53,54-l", "努力 2"],
  ["49,4,14,8-j", "原則"],
  ["49,4,14,8-l", "革命 1"],
  ["49,4,43,23-r", "解釋 1"],
  ["5,35,47,22-j", "習慣"],
  ["5,35,47,22-l", "分離 2"],
  ["5,35,64,63-r", "意識 4"],
  ["50,3,31,41-j", "價值"],
  ["50,3,31,41-l", "希望 2"],
  ["50,3,56,60-r", "律法 3"],
  ["51,57,54,53-r", "滲透 1"],
  ["51,57,61,62-j", "驚嚇"],
  ["51,57,61,62-l", "號角 1"],
  ["52,58,17,18-r", "服務 2"],
  ["52,58,21,48-j", "靜止不動"],
  ["52,58,21,48-l", "要求 1"],
  ["53,54,42,32-j", "開始"],
  ["53,54,42,32-l", "迴圈 1"],
  ["53,54,51,57-r", "滲透 2"],
  ["54,53,32,42-j", "野心"],
  ["54,53,32,42-l", "迴圈 2"],
  ["54,53,57,51-r", "滲透 4"],
  ["55,59,34,20-r", "沈睡的鳳凰 1"],
  ["55,59,9,16-j", "情緒"],
  ["55,59,9,16-l", "靈魂 1"],
  ["56,60,27,28-j", "刺激"],
  ["56,60,27,28-l", "分心 1"],
  ["56,60,3,50-r", "律法 2"],
  ["57,51,53,54-r", "滲透 3"],
  ["57,51,62,61-j", "直覺"],
  ["57,51,62,61-l", "號角 2"],
  ["58,52,18,17-r", "服務 4"],
  ["58,52,48,21-j", "生命力"],
  ["58,52,48,21-l", "要求 2"],
  ["59,55,16,9-j", "策略"],
  ["59,55,16,9-l", "靈魂 2"],
  ["59,55,20,34-r", "沈睡的鳳凰 3"],
  ["6,36,12,11-r", "伊甸園 3"],
  ["6,36,15,10-j", "衝突"],
  ["6,36,15,10-l", "物質層面 2"],
  ["60,56,28,27-j", "限制"],
  ["60,56,28,27-l", "分心 2"],
  ["60,56,50,3-r", "律法 4"],
  ["61,62,32,42-r", "瑪雅 4"],
  ["61,62,50,3-j", "思考"],
  ["61,62,50,3-l", "晦澀 2"],
  ["62,61,3,50-j", "細節"],
  ["62,61,3,50-l", "晦澀 1"],
  ["62,61,42,32-r", "瑪雅 2"],
  ["63,64,26,45-j", "懷疑"],
  ["63,64,26,45-l", "支配 1"],
  ["63,64,5,35-r", "意識 1"],
  ["64,63,35,5-r", "意識 3"],
  ["64,63,45,26-j", "困惑"],
  ["64,63,45,26-l", "支配 2"],
  ["7,13,2,1-r", "人面獅身 3"],
  ["7,13,23,43-j", "互動"],
  ["7,13,23,43-l", "面具 2"],
  ["8,14,30,29-r", "感染 2"],
  ["8,14,55,59-j", "貢獻"],
  ["8,14,55,59-l", "不確定 1"],
  ["9,16,40,37-r", "計畫 4"],
  ["9,16,64,63-j", "專注"],
  ["9,16,64,63-l", "指認 2"],
]);

const angleMapping = new Map([
  ["l", "左角度"],
  ["r", "右角度"],
  ["j", "並列"],
]);

function profileToAngle(x: number) {
  if (x === 41) {
    return "j";
  } else if (x > 50) {
    return "l";
  } else {
    return "r";
  }
}

export function cross(xs: Planet[], profile: number) {
  const gates = xs
    .filter(
      (x) =>
        x.activation === Activation.red || x.activation === Activation.black,
    )
    .filter((x) => x.id === PlanetId.sun || x.id === PlanetId.earth)
    .sort((a, b) => {
      return a.activation === b.activation
        ? a.id - b.id
        : b.activation - a.activation;
    })
    .map((x) => x.gate);

  const a = profileToAngle(profile);
  const key = `${gates.join(",")}-${a}`;

  const n = mapping.get(key) ?? key;
  const angle = angleMapping.get(a ?? "");

  return `${angle}交叉之${n}`;
}

/*
0 並列交叉之警覺 (44/24 | 7/13)
1 並列交叉之野心 (54/53 | 32/42)
63 並列交叉之活力 (58/52 | 48/21)
73 左角度交叉之循環 (54/53 | 32/42)
76 左角度交叉之反抗 (2/1 | 49/4)
79 左角度交叉之要求 (58/52 | 48/21)
81 左角度交叉之分心 (60/56 | 28/27)
84 左角度交叉之二元性 (20/34 | 37/40)
86 左角度交叉之教育 (12/11 | 25/46)
98 左角度交叉之勤奮 (30/29 | 34/20)
101 左角度交叉之告知 (47/22 | 12/11)
104 左角度交叉之面具 (13/7 | 43/23)
110 左角度交叉之物質層面 (36/6 | 10/15)
115 左角度交叉之精緻 (19/33 | 1/2)
116 左角度交叉之革命 (49/4 | 14/8)
117 左角度交叉之革命 (4/49 | 8/14)
118 左角度交叉之分離 (35/5 | 22/47)
119 左角度交叉之分離 (5/35 | 47/22)
120 左角度交叉之心靈 (55/59 | 9/16)
121 左角度交叉之心靈 (59/55 | 16/9)
122 左角度交叉之不確定 (8/14 | 55/59)
123 左角度交叉之不確定 (14/8 | 59/55)
124 左角度交叉之動盪 (17/18 | 38/39)
125 左角度交叉之動盪 (18/17 | 39/38)
126 左角度交叉之願望 (3/50 | 41/31)
127 左角度交叉之願望 (50/3 | 31/41)
128 右角度交叉之意識 (63/64 | 5/35)
129 右角度交叉之意識 (35/5 | 63/64)
130 右角度交叉之意識 (64/63 | 35/5)
131 右角度交叉之意識 (5/35 | 64/63)
132 右角度交叉之感染力 (30/29 | 14/8)
133 右角度交叉之感染力 (8/14 | 30/29)
134 右角度交叉之感染力 (29/30 | 8/14)
135 右角度交叉之感染力 (14/8 | 29/30)
136 右角度交叉之伊甸園 (36/6 | 11/12)
137 右角度交叉之伊甸園 (12/11 | 36/6)
138 右角度交叉之伊甸園 (6/36 | 12/11)
139 右角度交叉之伊甸園 (11/12 | 6/36)
140 右角度交叉之說明 (49/4 | 43/23)
141 右角度交叉之說明 (23/43 | 49/4)
142 右角度交叉之說明 (4/49 | 23/43)
143 右角度交叉之說明 (43/23 | 4/49)
144 右角度交叉之四方之路 (24/44 | 19/33)
145 右角度交叉之四方之路 (33/19 | 24/44)
146 右角度交叉之四方之路 (44/24 | 33/19)
147 右角度交叉之四方之路 (19/33 | 44/24)
148 右角度交叉之律法 (3/50 | 60/56)
149 右角度交叉之律法 (56/60 | 3/50)
150 右角度交叉之律法 (50/3 | 56/60)
151 右角度交叉之律法 (60/56 | 50/3)
152 右角度交叉之馬雅 (42/32 | 61/62)
153 右角度交叉之馬雅 (62/61 | 42/32)
154 右角度交叉之馬雅 (32/42 | 32/42)
155 右角度交叉之馬雅 (61/62 | 32/42)
156 右角度交叉之穿透 (51/57 | 54/53)
157 右角度交叉之穿透 (53/54 | 51/57)
158 右角度交叉之穿透 (57/51 | 53/54)
159 右角度交叉之穿透 (54/53 | 57/51)
160 右角度交叉之計畫 (37/40 | 9/16)
161 右角度交叉之計畫 (16/9 | 37/40)
162 右角度交叉之計畫 (40/37 | 16/9)
163 右角度交叉之計畫 (9/16 | 40/37)
164 右角度交叉之領導力 (22/47 | 26/45)
165 右角度交叉之領導力 (45/26 | 22/47)
166 右角度交叉之領導力 (47/22 | 45/26)
167 右角度交叉之領導力 (26/45 | 47/22)
168 右角度交叉之服務 (17/18 | 58/52)
169 右角度交叉之服務 (52/58 | 17/18)
170 右角度交叉之服務 (18/17 | 52/58)
171 右角度交叉之服務 (58/52 | 18/17)
172 右角度交叉之沈睡鳳凰 (55/59 | 34/20)
173 右角度交叉之沈睡鳳凰 (20/34 | 55/59)
174 右角度交叉之沈睡鳳凰 (59/55 | 20/34)
175 右角度交叉之沈睡鳳凰 (34/20 | 59/55)
176 右角度交叉之人面獅身 (13/7 | 1/2)
177 右角度交叉之人面獅身 (2/1 | 13/7)
178 右角度交叉之人面獅身 (7/13 | 2/1)
179 右角度交叉之人面獅身 (1/2 | 7/13)
180 右角度交叉之張力 (21/48 | 38/39)
181 右角度交叉之張力 (39/38 | 21/48)
182 右角度交叉之張力 (48/21 | 39/38)
183 右角度交叉之張力 (38/39 | 48/21)
184 右角度交叉之意料之外 (27/28 | 41/31)
185 右角度交叉之意料之外 (31/41 | 27/28)
186 右角度交叉之意料之外 (28/27 | 31/41)
187 右角度交叉之意料之外 (41/31 | 28/27)
188 右角度交叉之愛的器皿 (25/46 | 10/15)
189 右角度交叉之愛的器皿 (15/10 | 25/46)
190 右角度交叉之愛的器皿 (46/25 | 15/10)
191 右角度交叉之愛的器皿 (10/15 | 46/25)
*/
