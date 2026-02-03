import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { style } from '../../style.js';

@customElement('ember-nexus-template-demo-pill')
class DemoPill extends LitElement {
  static styles = [unsafeCSS(style)];

  @property({ type: String, attribute: 'element-id' })
  elementId: string;

  render(): TemplateResult {
    const name = this.elementId.slice(0, 8);
    return html`
      <div class="badge badge-primary font-sans font-semibold rounded-full shadow-sm">
        <span class="font-mono text-xs">${name}</span>
      </div>
    `;
  }
}

export { DemoPill };
