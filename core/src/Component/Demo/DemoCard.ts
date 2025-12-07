import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { indexStyles } from '../../Style/index.js';

@customElement('ember-nexus-template-demo-card')
class DemoCard extends LitElement {
  static styles = [unsafeCSS(indexStyles)];

  @property({ type: String, attribute: 'element-id' })
  elementId: string;

  render(): TemplateResult {
    return html`
      <div class="card bg-base-100 w-full shadow-sm">
        <div class="card-body p-3">
          <h2 class="card-title">Demo</h2>
          <p class="font-mono text-xs">${this.elementId}</p>
        </div>
      </div>
    `;
  }
}

export { DemoCard };
