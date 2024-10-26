import "./style.css";
import css from "./component-style.css?raw";
import Form from "./form.html?raw";
import Result from "./result.html?raw";
import Svg from "./svg.html?raw";
import * as api from "./api";
import { DateTime } from "luxon";
const template = document.createElement("template");
template.innerHTML = `
<style>${css}</style>
${Form}
${Svg}
${Result}
`;
const SVG_NS = "http://www.w3.org/2000/svg";

class HumanDesign extends HTMLElement {
  charts: api.Root[] = [];

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    if (this.shadowRoot) {
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    this.dom<HTMLInputElement>(`input[type="range"]`).then((input) => {
      input.addEventListener("input", () => {
        const x = this.charts.at(+input.value);
        if (x) {
          this.drawChart(x);
        }
      });
    });

    Promise.all([
      this.dom<HTMLFormElement>("form"),
      this.dom<HTMLInputElement>('form>input[name="name"]'),
      this.dom<HTMLInputElement>('form>input[name="date"]'),
      this.dom<HTMLInputElement>('form>input[name="time"]'),
      this.dom<HTMLInputElement>('form>select[name="country"]'),
      this.dom<HTMLInputElement>('form>select[name="timezone"]'),
    ]).then(([form, name, date, time, country, timezone]) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const iso8601 = `${date.value}T${time.value}:00.000Z`;
        Promise.all(
          [iso8601]
            .concat(
              Array<DateTime<true> | DateTime<false>>(12)
                .fill(DateTime.fromISO(iso8601).toUTC())
                .filter((x) => x.isValid)
                .map((x, i) => x.minus({ hour: i + 1 }).toJSON()),
              Array<DateTime<true> | DateTime<false>>(11)
                .fill(DateTime.fromISO(iso8601).toUTC())
                .filter((x) => x.isValid)
                .map((x, i) => x.plus({ hour: i + 1 }).toJSON()),
            )
            .map((x) =>
              api.getChart(name.value, x, country.value, timezone.value),
            ),
        ).then((xs) => {
          this.charts = xs.toSorted((a, b) =>
            a.meta.name > b.meta.name ? 1 : -1,
          );
          xs.slice(0, 1).forEach((x) => this.drawChart(x));
        });
      });
    });
  }

  createArrowValue(x: api.Planet, type: "base" | "tone") {
    const [left, right] = type === "base" ? ["207", "485"] : ["227", "465"];
    const dom = document.createElementNS(SVG_NS, "text");
    dom.setAttributeNS(null, "x", x.activation === 0 ? left : right);
    dom.setAttributeNS(null, "y", `${x.id * 73 + 187}`);
    dom.textContent = String(x.tone);
    return dom;
  }

  createPlantValue(x: api.Planet, shift: number) {
    const value = ` ${x.gate}.${x.line}`;
    const dom = document.createElementNS(SVG_NS, "text");
    dom.setAttributeNS(null, "x", x.activation === 0 ? "95" : "580");
    dom.setAttributeNS(null, "y", `${x.id * shift + 160}`);
    dom.textContent = value;
    return dom;
  }

  createTriggers(x: api.Planet, shift: number) {
    return x.fixing.triggers.map((y) => {
      const dom = document.createElementNS(SVG_NS, "polygon");
      dom.setAttributeNS(
        null,
        "points",
        "140.77 149.47 135.81 158.04 145.72 158.04 140.77 149.47",
      );
      const invert = api.state(y.state);
      const scale = `scale(1,${invert})`;
      const translate = `translate(${x.activation === 0 ? 0 : 417}px, ${x.id * shift * invert}px)`;
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

  drawArrows(planets: api.Planet[]) {
    this.dom<SVGGElement>(".arrows").then((g) => {
      Array<number>(2)
        .fill(0)
        .map((x, i) => x + i)
        .flatMap((activation) =>
          Array<number>(2)
            .fill(0)
            .map((x, i) => x + i)
            .map((id) => ({ activation, id })),
        )
        .map((x) =>
          planets.find((p) => p.activation === x.activation && p.id === x.id),
        )
        .filter((x) => !!x)
        .forEach((x) => {
          g.append(this.createArrowValue(x, "tone"));
          g.append(this.createArrowValue(x, "base"));

          this.dom<SVGGElement>(`.arrow${x.activation}${x.id}`).then((a) => {
            a.style.transform = `scale(${api.arrow(x.tone)},1)`;
          });
        });
    });
  }

  drawCenters(centers: number[]) {
    Promise.all(
      Array<number>(9)
        .fill(0)
        .map((x, i) => x + i)
        .map((x) => `.center${x}`)
        .map((x) => this.dom<SVGPathElement>(x)),
    ).then((xs) =>
      xs.forEach((x, i) => {
        x.style.fill = api.center(i, centers);
      }),
    );
  }

  drawChart(res: api.Root) {
    this.drawCenters(res.chart.centers);
    this.drawGates(res.chart.gates);
    this.drawPlanets(res.chart.planets);
    Promise.all([
      this.dom<SVGTextElement>(".authority"),
      this.dom<SVGTextElement>("svg .name"),
      this.dom<SVGTextElement>(".cross"),
      this.dom<SVGTextElement>(".definition"),
    ]).then(([authority, name, cross, definition]) => {
      authority.textContent = api.authority(res.chart.authority);
      name.textContent = res.meta.name;
      cross.textContent = api.cross(res.chart.cross);
      definition.textContent = api.definition(res.chart.definition);
    });
  }

  drawGates(gates: api.Gate[]) {
    Promise.all(
      Array<number>(64)
        .fill(1)
        .map((x, i) => x + i)
        .map((x) => `.gate${x}-c`)
        .map((x) => this.dom<SVGPathElement>(x)),
    ).then((xs) => {
      xs.forEach((x, i) => {
        const g = gates.find((x) => x.gate === i);
        if (g) {
          x.style.fill = api.gate(g);
        }
      });
    });
  }

  drawPlanets(planets: api.Planet[]) {
    this.drawArrows(planets);

    this.dom<SVGGElement>(`svg .planets`).then((g) => {
      g.innerHTML = "";
      const shift = 34.5;
      planets.forEach((x) => {
        g.append(this.createPlantValue(x, shift));
        g.append(...this.createTriggers(x, shift));
      });
    });
  }
}

window.customElements.define("human-design", HumanDesign);
