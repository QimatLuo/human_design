import "./style.css";
import css from "./component-style.css?raw";
import html from "./component-layout.html?raw";
const template = document.createElement("template");
template.innerHTML = `
<style>${css}</style>
${html}
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
        input.addEventListener("input", () => this.updateName(input, text));
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

  updateName(input: HTMLInputElement, text: SVGTextElement) {
    text.textContent = input.value;
  }
}

window.customElements.define("human-design", HumanDesign);
