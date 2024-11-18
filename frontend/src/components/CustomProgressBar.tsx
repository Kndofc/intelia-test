class CustomProgressBar extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot!.innerHTML = `
        <style>
          .progress-bar {
            width: 100%;
            background: #ccc;
            border-radius: 5px;
            overflow: hidden;
          }
          .progress-bar-inner {
            height: 20px;
            background: #007BFF;
            width: 0%;
            transition: width 0.3s ease;
          }
        </style>
        <div class="progress-bar">
          <div class="progress-bar-inner" id="inner"></div>
        </div>
      `;
    }
  
    set value(val: number) {
      const innerBar = this.shadowRoot!.getElementById('inner') as HTMLElement;
      if (innerBar) {
        innerBar.style.width = `${val}%`;
      }
    }
  }
  
  if (!customElements.get('custom-progress-bar')) {
    customElements.define('custom-progress-bar', CustomProgressBar);
  }
    export {};