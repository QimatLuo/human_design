import './style.css'
import css from './component-style.css?raw'
import html from './component-layout.html?raw'
const template = document.createElement('template');
template.innerHTML = `
<style>${css}</style>
${html}
`;

class HumanDesign extends HTMLElement {
  
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    const button = this.shadowRoot.querySelector("button");
    button.addEventListener("click", this.handleClick);
  }
  
  handleClick(e) {
    alert("Sup?");
  }
  
}

window.customElements.define('human-design', HumanDesign);
