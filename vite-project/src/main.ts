import './style.css'
const template = document.createElement('template');
template.innerHTML = `
<style>
button {
  background: var(--background);
  color: var(--color);
  padding: var(--padding);
  font-size: var(--font-size);
  border: 0;
}
</style>
<button>Sup?</button>`;

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
