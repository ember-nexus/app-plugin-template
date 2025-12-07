import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { indexStyles } from '../../Style/index.js';

@customElement('ember-nexus-template-demo-icon')
class DemoIcon extends LitElement {
  static styles = [unsafeCSS(indexStyles)];

  @property({ type: String, attribute: 'element-id' })
  elementId: string;

  render(): TemplateResult {
    const identifier = String(this.elementId).toUpperCase().slice(0, 2);
    return html`
      <div class="avatar avatar-placeholder select-none">
        <div class="bg-primary text-primary-content text-sm font-semibold w-6 rounded-full shadow-sm">
          <span class="font-mono">${identifier}</span>
        </div>
      </div>
    `;
  }
}

export { DemoIcon };
