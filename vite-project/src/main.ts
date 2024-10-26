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
    this.dom<ShadowRoot>(() => this.shadowRoot)
      .then((dom) => {
        dom.appendChild(template.content.cloneNode(true));
        return this.dom<SVGPathElement>(() => dom.querySelector(".cls-8"));
      })
      .then((dom) => {
        dom.addEventListener("click", (x) => this.handleClick(x));
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
}

window.customElements.define("human-design", HumanDesign);
