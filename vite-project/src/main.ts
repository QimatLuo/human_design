import "./style.css";
import css from "./component-style.css?raw";
import Form from "./form.html?raw";
import Result from "./result.html?raw";
import Svg from "./svg.html?raw";
import { getChart } from "./api";
const template = document.createElement("template");
template.innerHTML = `
<style>${css}</style>
${Form}
${Svg}
${Result}
`;

class HumanDesign extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.dom<ShadowRoot>(() => this.shadowRoot).then((root) => {
      root.appendChild(template.content.cloneNode(true));

      this.dom<SVGPathElement>(() => root.querySelector(".cls-8")).then(
        (dom) => {
          dom.addEventListener("click", (x) => this.handleClick(x));
        },
      );

      Promise.all([
        this.dom<HTMLInputElement>(() => root.querySelector("input")),
        this.dom<SVGTextElement>(() => root.querySelector("svg .name")),
      ]).then(([input, text]) => {
        input.addEventListener("input", () =>
          this.updateName(text, input.value),
        );
      });

      Promise.all([
        this.dom<HTMLFormElement>(() => root.querySelector("form")),
        this.dom<SVGTextElement>(() => root.querySelector("svg .name")),
      ]).then(([form, text]) => {
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          Promise.all([
            this.dom<HTMLInputElement>(() =>
              root.querySelector('form>input[name="name"]'),
            ),
          ]).then(([name]) => {
            getChart(name.value).then((x) => {
              this.updateName(text, x.meta.name);
            });
          });
        });
      });
    });
  }

  dom<T>(getDom: () => unknown) {
    return new Promise<T>((resolve, reject) => {
      const dom = getDom() as T;
      if (dom) {
        resolve(dom);
      } else {
        reject(new Error(getDom.toString()));
      }
    });
  }

  handleClick(e: Event) {
    this.dom<SVGPathElement>(() => e.currentTarget).then((dom) => {
      dom.style.fill = dom.style.fill === "red" ? "white" : "red";
    });
  }

  updateName(text: SVGTextElement, value: string) {
    text.textContent = value;
  }
}

window.customElements.define("human-design", HumanDesign);
