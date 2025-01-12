import "./style.css";
import css from "./component-style.css?raw";
import cssSlider from "./slider.css?raw";
import Form from "./form.html?raw";
import Control from "./control.html?raw";
import Result from "./result.html?raw";
import Svg from "./bg.svg?raw";
import { restful } from "@hd/api";
import { report } from "@hd/core";
import type { ApiRes } from "@hd/core/types";
import { timezones } from "./timezone.ts";
import {
  fluentSlider,
  fluentSliderLabel,
  provideFluentDesignSystem,
} from "@fluentui/web-components";

provideFluentDesignSystem().register(fluentSlider(), fluentSliderLabel());

const template = document.createElement("template");
template.innerHTML = `
<style>${css}${cssSlider}</style>
<main class="init">
${Form}
${Svg}
<div class="info">
  ${Result}
  ${Control}
</div>
</main>
`;
const SVG_NS = "http://www.w3.org/2000/svg";

const getChart = restful(
  import.meta.env["VITE_API"],
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhZGVjNmYzMi00YzhjLTQyNzUtYTYwZC00YjdkY2RiY2QxOTEiLCJ3ZWJzaXRlVXJsIjoiaHR0cHM6Ly9odW1hbmRlc2lnbi1nYWxheHkuY29tIiwiaWF0IjoxNjkxNTcwMjU1fQ.mDRPEURo3d7LyjMl2Hl7xIh3zZuwrLQUvCYfyHnE8ok",
).serverSideGeneration;

class HumanDesign extends HTMLElement {
  charts: ApiRes[] = [];

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    if (this.shadowRoot) {
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    this.dom<HTMLSelectElement>(`form select[name="timezone"]`).then(
      (select) => {
        const m = timezones.reduce((m, x) => {
          const country = x.at(0) ?? "";
          const xs = m.get(country);
          if (xs) {
            xs.push(x);
          } else {
            m.set(country, [x]);
          }
          return m;
        }, new Map<string, [string, string, string, string][]>());

        Array.from(m.entries()).forEach(([key, xs]) => {
          const optgroup = document.createElement("optgroup");
          optgroup.label = key;
          select.append(optgroup);

          xs.forEach(([, state, city, tz]) => {
            const option = document.createElement("option");
            option.textContent = `${state} / ${city}`;
            option.value = tz;
            optgroup.append(option);
          });
        });
        select.value = "Asia/Taipei";
      },
    );

    this.dom<HTMLButtonElement>(`.control .reset`).then((button) => {
      button.addEventListener("click", () => this.resetChart());
    });

    this.dom<HTMLButtonElement>(`.control .multi`).then((button) => {
      button.addEventListener("click", () => this.drawMuliCharts());
    });

    if ("share" in navigator) {
      this.dom<HTMLButtonElement>(`.control .share`).then((button) => {
        button.style.display = "block";
        button.addEventListener("click", () => this.shareUrl());
      });
    }

    Promise.all([
      this.dom<HTMLInputElement>("fluent-slider"),
      this.dom<HTMLSpanElement>(".tooltip"),
    ]).then(([s, t]) => {
      s.addEventListener("change", () => {
        const x = this.charts.at(Number(s.value));
        if (x) {
          this.drawChart(x);
          t.textContent = x.meta.birthData.time.local.slice(-8, -3);
        }
      });
    });

    Promise.all([
      this.dom<HTMLFormElement>("form"),
      this.dom<HTMLInputElement>('form input[name="name"]'),
      this.dom<HTMLInputElement>('form input[name="date"]'),
      this.dom<HTMLInputElement>('form input[name="time"]'),
      this.dom<HTMLInputElement>('form select[name="timezone"]'),
      this.dom<HTMLButtonElement>("form button"),
    ]).then(([form, name, date, time, timezone, button]) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        e.stopPropagation();
      });

      button.addEventListener("click", () => {
        this.initialChart(
          name.value,
          `${date.value}T${time.value}:00.000Z`,
          timezone.value,
        );
      });
    });
  }

  createPlanetValue(x: ApiRes["chart"]["planets"][number], shift: number) {
    const value = `${x.gate}.${x.line}`.slice(-4);
    const dom = document.createElementNS(SVG_NS, "text");
    dom.classList.add(x.activation === 0 ? "design" : "personality");
    dom.setAttributeNS(null, "x", x.activation === 0 ? "125" : "605");
    dom.setAttributeNS(null, "y", `${customOrder(x.id) * shift + 160}`);
    dom.textContent = value;
    return dom;
  }

  createTriggers(x: ApiRes["chart"]["planets"][number], shift: number) {
    return x.fixing.triggers.map((y) => {
      const dom = document.createElementNS(SVG_NS, "polygon");
      dom.setAttributeNS(
        null,
        "points",
        "140.77 149.47 135.81 158.04 145.72 158.04 140.77 149.47",
      );
      const invert = trigerState(y.state);
      const scale = `scale(1,${invert})`;
      const translate = `translate(${x.activation === 0 ? 0 : 417}px, ${
        customOrder(x.id) * shift * invert
      }px)`;
      dom.style.transform = [scale, translate].join(" ");
      dom.style.transformOrigin = "0px 155px";
      dom.style.fill = x.activation === 0 ? "#ec8a8c" : "#094166";
      dom.dataset.value = `${x.gate}.${x.line}`;
      return dom;
    });
  }

  dom<T extends Element>(selector: string) {
    return new Promise<T>((resolve, reject) => {
      if (!this.shadowRoot) {
        reject("shadowRoot is null");
      } else {
        const dom = this.shadowRoot.querySelector<T>(selector);
        if (dom) {
          resolve(dom);
        } else {
          reject(`${selector} not found`);
        }
      }
    });
  }

  drawArrows(
    xs: {
      activation: number;
      base: number;
      id: number;
      left: boolean;
      tone: number;
    }[],
  ) {
    xs.forEach((x) => {
      this.dom<SVGTextElement>(`.arrow-${x.activation} .tone-${x.id}`).then(
        (a) => {
          a.textContent = `${x.tone}`;
        },
      );
      this.dom<SVGTextElement>(`.arrow-${x.activation} .base-${x.id}`).then(
        (a) => {
          a.textContent = `${x.base}`;
        },
      );
      this.dom<SVGPolygonElement>(`#arrow${x.activation}${x.id}`).then((a) => {
        a.style.transform = `scale(${x.left ? 1 : -1},1)`;
      });
    });
  }

  drawCenter(center: Record<string, boolean>) {
    Object.entries(center).forEach(([k, v]) => {
      this.dom<SVGPathElement>(`#${k}`).then((x) => {
        x.style.fill = v ? "" : "#ffffff";
      });
    });
  }

  drawChart(res: ApiRes) {
    const r = report(res.chart);
    this.drawArrows(r.arrow);
    this.drawCenter(r.center);
    this.drawGates(res.chart.gates);
    this.drawPlanets(res.chart.planets);
    Promise.all([
      this.dom<SVGTextElement>(".authority"),
      this.dom<SVGTextElement>("svg .name"),
      this.dom<SVGTextElement>(".cross"),
      this.dom<SVGTextElement>(".definition"),
      this.dom<SVGTextElement>(".profile"),
      this.dom<SVGTextElement>(".signature"),
      this.dom<SVGTextElement>(".strategy"),
      this.dom<SVGTextElement>(".theme"),
      this.dom<SVGTextElement>(".type"),
      this.dom<SVGTextElement>(".saturn"),
      this.dom<SVGTextElement>(".chiron"),
    ]).then(
      ([
        authority,
        name,
        cross,
        definition,
        profile,
        signature,
        strategy,
        theme,
        type,
        saturn,
        chiron,
      ]) => {
        authority.textContent = r.authority;
        name.textContent = res.meta.name;
        cross.textContent = r.cross;
        definition.textContent = r.definition;
        profile.textContent = r.profile;
        signature.textContent = r.signature;
        strategy.textContent = r.strategy;
        theme.textContent = r.theme;
        type.textContent = r.type;
        saturn.textContent = formatDate(res.chart.cycles.saturn);
        chiron.textContent = formatDate(res.chart.cycles.chiron);
      },
    );
  }

  drawGates(gates: ApiRes["chart"]["gates"]) {
    Promise.all(
      Array<number>(64)
        .fill(1)
        .map((x, i) => x + i)
        .map((x) =>
          Promise.all([
            this.dom<SVGGElement>(`#gate${x}-cbg`),
            this.dom<SVGRectElement>(`#gate${x}-l-b`),
            this.dom<SVGRectElement>(`#gate${x}-l-r`),
          ])
        ),
    ).then((xs) => {
      xs.forEach(([circle, line, slash], i) => {
        const g = gates.find((x) => x.gate === i + 1);
        circle.dataset.mode = g ? g.mode : "";
        line.dataset.mode = g ? g.mode : "";
        slash.dataset.mode = g ? g.mode : "";
      });
    });
  }

  drawMuliCharts() {
    const shift = (iso: string, n: number) =>
      Array(Math.abs(n))
        .fill(iso)
        .map((x) => Date.parse(x))
        .map((x, i) => x + (i + 1) * (n < 0 ? -1 : 1) * 1000 * 60 * 60)
        .map((x) => new Date(x).toJSON());

    Promise.all([
      this.dom<HTMLElement>(".control"),
      this.dom<HTMLInputElement>('form input[name="name"]'),
    ]).then(([section, name]) => {
      section.classList.add("is-loading");

      Promise.all(
        this.charts
          .slice(0, 1)
          .map((x) => x.meta.birthData.time)
          .map(({ local, timezone }) => ({
            time: `${local}Z`,
            timezone: timezone.id,
          }))
          .flatMap(({ time, timezone }) =>
            Array.of<string>()
              .concat(shift(time, -12), shift(time, 11))
              .map((x) => getChart(name.value, x, timezone))
          ),
      ).then((xs) => {
        this.charts.push(...xs);
        this.charts.sort((a, b) =>
          a.meta.birthData.time.local > b.meta.birthData.time.local ? 1 : -1
        );
        section.classList.add("is-multi");
        section.classList.remove("is-loading");
        this.drawSlider();
      });
    });
  }

  drawPlanets(planets: ApiRes["chart"]["planets"]) {
    this.dom<SVGGElement>(`svg .planets`).then((g) => {
      g.innerHTML = "";
      const shift = 34.5;
      planets.forEach((x) => {
        g.append(this.createPlanetValue(x, shift));
        g.append(...this.createTriggers(x, shift));
      });
    });
  }

  drawSlider() {
    Promise.all([
      this.dom<HTMLSpanElement>(".tooltip"),
      this.dom<HTMLInputElement>("fluent-slider"),
      this.dom<HTMLElement>(`fluent-slider-label[position="0"]`),
      this.dom<HTMLElement>(`fluent-slider-label[position="6"]`),
      this.dom<HTMLElement>(`fluent-slider-label[position="12"]`),
      this.dom<HTMLElement>(`fluent-slider-label[position="18"]`),
      this.dom<HTMLElement>(`fluent-slider-label[position="23"]`),
    ]).then(([tooltip, slider, ...labels]) => {
      labels
        .map((x) => [x, x.getAttribute("position")] as const)
        .concat([[tooltip, slider.value]])
        .forEach(([x, i]) => {
          const chart = this.charts.at(Number(i));
          if (chart) {
            x.textContent = chart.meta.birthData.time.local.slice(-8, -3);
          }
        });
    });
  }

  initialChart(name: string, time: string, timezone: string) {
    this.dom<HTMLElement>("main").then((dom) => {
      dom.classList.add("is-loading");

      getChart(name, time, timezone).then((x) => {
        this.charts = [x];
        this.drawChart(x);

        dom.classList.remove("is-loading");
        dom.classList.remove("init");
      });
    });
  }

  resetChart() {
    this.charts = [];
    Promise.all([
      this.dom<HTMLElement>(".control"),
      this.dom<HTMLElement>("main"),
    ]).then(([section, main]) => {
      main.classList.add("init");
      section.classList.remove("is-multi");
    });
  }

  shareUrl() {
    navigator.share({
      title: "分享你的人類圖",
      text: "此功能仍在開發中...",
      url: "https://humandesign-galaxy.com",
    });
  }
}

globalThis.customElements.define("human-design", HumanDesign);

function trigerState(x: number) {
  switch (x) {
    case 1:
      return -1;
    case 2:
      return 1;
    default:
      console.warn("state", x);
      return 0;
  }
}

function customOrder(planetId: number) {
  switch (planetId) {
    case 2:
      return 4;
    case 3:
      return 2;
    case 4:
      return 3;
    default:
      return planetId;
  }
}

function formatDate(iso: string) {
  return iso
    .split("T")
    .map((x) => x.split("-").join("/"))
    .at(0);
}
