import { describe, expect, test } from "@jest/globals";
import { report } from "@hd/core";
import { mock } from "@hd/api";

export const data: [
  string,
  {
    arrow?: {
      activation: number;
      base: number;
      id: number;
      left: boolean;
      tone: number;
    }[];
    authority: string;
    center: Record<
      | "ajna"
      | "g"
      | "head"
      | "heart"
      | "root"
      | "sacral"
      | "solarPlexus"
      | "splenic"
      | "throat",
      boolean
    >;
    cross: string;
    definition: string;
    profile: string;
    signature: string;
    strategy: string;
    theme: string;
    type: string;
  },
][] = [
  [
    "1970-09-06T12:00:00",
    {
      authority: "情緒權威",
      center: {
        ajna: false,
        g: true,
        head: false,
        heart: true,
        root: true,
        sacral: true,
        solarPlexus: true,
        splenic: false,
        throat: false,
      },
      cross: "右角度交叉之意識 (64/63 | 35/5)",
      definition: "單一定義",
      profile: "2/5",
      signature: "滿足",
      strategy: "回應",
      theme: "挫敗",
      type: "生產者",
    },
  ],
  [
    "1978-11-06T12:00:00",
    {
      authority: "情緒權威",
      center: {
        ajna: false,
        g: true,
        head: false,
        heart: false,
        root: false,
        sacral: true,
        solarPlexus: true,
        splenic: true,
        throat: true,
      },
      cross: "右角度交叉之人面獅身 (1/2 | 7/13)",
      definition: "二分定義",
      profile: "1/3",
      signature: "滿足",
      strategy: "回應",
      theme: "挫敗",
      type: "生產者",
    },
  ],
  [
    "1983-02-20T23:00:00",
    {
      authority: "薦骨權威",
      center: {
        ajna: false,
        g: true,
        head: false,
        heart: false,
        root: true,
        sacral: true,
        solarPlexus: false,
        splenic: false,
        throat: true,
      },
      cross: "右角度交叉之沈睡鳳凰 (55/59 | 34/20)",
      definition: "單一定義",
      profile: "2/4",
      signature: "滿足",
      strategy: "回應",
      theme: "挫敗",
      type: "顯示生產者",
    },
  ],
  [
    "1984-04-24T11:55:00",
    {
      authority: "薦骨權威",
      center: {
        ajna: false,
        g: false,
        head: false,
        heart: false,
        root: true,
        sacral: true,
        solarPlexus: false,
        splenic: true,
        throat: false,
      },
      cross: "右角度交叉之意料之外 (27/28 | 41/31)",
      definition: "單一定義",
      profile: "3/5",
      signature: "滿足",
      strategy: "回應",
      theme: "挫敗",
      type: "生產者",
    },
  ],
  [
    "1984-06-04T12:00:00",
    {
      authority: "環境權威",
      center: {
        ajna: true,
        g: false,
        head: false,
        heart: false,
        root: false,
        sacral: false,
        solarPlexus: false,
        splenic: false,
        throat: true,
      },
      cross: "右角度交叉之意識 (35/5 | 63/64)",
      definition: "單一定義",
      profile: "3/5",
      signature: "成功",
      strategy: "等待邀請",
      theme: "苦澀",
      type: "投射者",
    },
  ],
  [
    "1986-02-07T15:40:00",
    {
      authority: "情緒權威",
      center: {
        ajna: true,
        g: true,
        head: true,
        heart: true,
        root: true,
        sacral: true,
        solarPlexus: true,
        splenic: true,
        throat: true,
      },
      cross: "左角度交叉之面具 (13/7 | 43/23)",
      definition: "四分定義",
      profile: "6/2",
      signature: "滿足",
      strategy: "回應",
      theme: "挫敗",
      type: "生產者",
    },
  ],
  [
    "1987-06-28T14:45:00",
    {
      arrow: [
        {
          activation: 1,
          base: 1,
          id: 0,
          left: true,
          tone: 1,
        },
        {
          activation: 1,
          base: 3,
          id: 3,
          left: false,
          tone: 6,
        },
        {
          activation: 0,
          base: 5,
          id: 0,
          left: false,
          tone: 5,
        },
        {
          activation: 0,
          base: 5,
          id: 3,
          left: false,
          tone: 5,
        },
      ],
      authority: "情緒權威",
      center: {
        ajna: true,
        g: false,
        head: false,
        heart: true,
        root: true,
        sacral: false,
        solarPlexus: true,
        splenic: true,
        throat: true,
      },
      cross: "右角度交叉之服務 (52/58 | 17/18)",
      definition: "單一定義",
      profile: "3/5",
      signature: "平靜",
      strategy: "告知",
      theme: "憤怒",
      type: "顯示者",
    },
  ],
  [
    "1987-07-03T13:56:00",
    {
      authority: "直覺權威",
      center: {
        ajna: true,
        g: false,
        head: false,
        heart: true,
        root: true,
        sacral: false,
        solarPlexus: false,
        splenic: true,
        throat: true,
      },
      cross: "右角度交叉之張力 (39/38 | 21/48)",
      definition: "單一定義",
      profile: "2/4",
      signature: "平靜",
      strategy: "告知",
      theme: "憤怒",
      type: "顯示者",
    },
  ],
  [
    "1990-09-15T15:07:00",
    {
      authority: "情緒權威",
      center: {
        ajna: false,
        g: false,
        head: false,
        heart: false,
        root: false,
        sacral: false,
        solarPlexus: true,
        splenic: false,
        throat: true,
      },
      cross: "左角度交叉之告知 (47/22 | 12/11)",
      definition: "單一定義",
      profile: "6/2",
      signature: "平靜",
      strategy: "告知",
      theme: "憤怒",
      type: "顯示者",
    },
  ],
  [
    "1991-03-05T12:00:00",
    {
      authority: "⾃我投射權威",
      center: {
        ajna: true,
        g: true,
        head: false,
        heart: false,
        root: false,
        sacral: false,
        solarPlexus: false,
        splenic: false,
        throat: true,
      },
      cross: "右角度交叉之意識 (63/64 | 5/35)",
      definition: "單一定義",
      profile: "3/6",
      signature: "成功",
      strategy: "等待邀請",
      theme: "苦澀",
      type: "投射者",
    },
  ],
  [
    "1991-05-26T22:13:00",
    {
      authority: "情緒權威",
      center: {
        ajna: false,
        g: false,
        head: false,
        heart: true,
        root: false,
        sacral: true,
        solarPlexus: true,
        splenic: false,
        throat: true,
      },
      cross: "左角度交叉之二元性 (20/34 | 37/40)",
      definition: "二分定義",
      profile: "6/2",
      signature: "滿足",
      strategy: "回應",
      theme: "挫敗",
      type: "顯示生產者",
    },
  ],
  [
    "1991-06-20T03:40:00",
    {
      authority: "意志⼒權威",
      center: {
        ajna: false,
        g: true,
        head: false,
        heart: true,
        root: false,
        sacral: false,
        solarPlexus: false,
        splenic: false,
        throat: true,
      },
      cross: "左角度交叉之教育 (12/11 | 25/46)",
      definition: "單一定義",
      profile: "6/2",
      signature: "平靜",
      strategy: "告知",
      theme: "憤怒",
      type: "顯示者",
    },
  ],
  [
    "1992-04-21T11:13:00",
    {
      authority: "⽉循環權威",
      center: {
        ajna: false,
        g: false,
        head: false,
        heart: false,
        root: false,
        sacral: false,
        solarPlexus: false,
        splenic: false,
        throat: false,
      },
      cross: "左角度交叉之願望 (3/50 | 41/31)",
      definition: "無定義",
      profile: "6/2",
      signature: "驚喜",
      strategy: "等待月亮循環",
      theme: "失望",
      type: "反映者",
    },
  ],
  [
    "1993-09-28T21:05:00",
    {
      authority: "情緒權威",
      center: {
        ajna: true,
        g: false,
        head: false,
        heart: true,
        root: true,
        sacral: true,
        solarPlexus: true,
        splenic: true,
        throat: true,
      },
      cross: "右角度交叉之服務 (18/17 | 52/58)",
      definition: "三分定義",
      profile: "2/4",
      signature: "滿足",
      strategy: "回應",
      theme: "挫敗",
      type: "顯示生產者",
    },
  ],
  [
    "1995-05-09T12:00:00",
    {
      authority: "情緒權威",
      center: {
        ajna: true,
        g: true,
        head: true,
        heart: false,
        root: true,
        sacral: true,
        solarPlexus: true,
        splenic: false,
        throat: false,
      },
      cross: "左角度交叉之反抗 (2/1 | 49/4)",
      definition: "三分定義",
      profile: "6/2",
      signature: "滿足",
      strategy: "回應",
      theme: "挫敗",
      type: "生產者",
    },
  ],
  [
    "1998-03-19T08:48:00",
    {
      authority: "情緒權威",
      center: {
        ajna: false,
        g: true,
        head: false,
        heart: true,
        root: true,
        sacral: true,
        solarPlexus: true,
        splenic: false,
        throat: false,
      },
      cross: "左角度交叉之物質層面 (36/6 | 10/15)",
      definition: "二分定義",
      profile: "6/3",
      signature: "滿足",
      strategy: "回應",
      theme: "挫敗",
      type: "生產者",
    },
  ],
  [
    "2000-02-18T21:17:00",
    {
      authority: "情緒權威",
      center: {
        ajna: false,
        g: true,
        head: false,
        heart: false,
        root: true,
        sacral: true,
        solarPlexus: true,
        splenic: true,
        throat: true,
      },
      cross: "左角度交叉之勤奮 (30/29 | 34/20)",
      definition: "單一定義",
      profile: "6/2",
      signature: "滿足",
      strategy: "回應",
      theme: "挫敗",
      type: "顯示生產者",
    },
  ],
  [
    "2024-02-02T15:57:00",
    {
      authority: "情緒權威",
      center: {
        ajna: true,
        g: true,
        head: true,
        heart: true,
        root: true,
        sacral: true,
        solarPlexus: true,
        splenic: true,
        throat: false,
      },
      cross: "左角度交叉之精緻 (19/33 | 1/2)",
      definition: "四分定義",
      profile: "6/2",
      signature: "滿足",
      strategy: "回應",
      theme: "挫敗",
      type: "生產者",
    },
  ],
];

describe("api", () => {
  test.each(data)("%s", (localTime, expected) => {
    const { arrow, theme, signature, ...rest } = expected;
    const result = mock.get(localTime);
    if (result) {
      const { arrow: arrowR, ...res } = report(result.chart);
      expect(res).toEqual(rest);
      if (arrow) {
        expect(arrowR).toEqual(arrow);
      }
    } else {
      expect(`${localTime} mock not found`).toEqual(localTime);
    }
  });
});
