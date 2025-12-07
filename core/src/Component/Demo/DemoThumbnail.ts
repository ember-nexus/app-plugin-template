import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { indexStyles } from '../../Style/index.js';

@customElement('ember-nexus-template-demo-thumbnail')
class DemoThumbnail extends LitElement {
  static styles = [unsafeCSS(indexStyles)];

  @property({ type: String, attribute: 'element-id' })
  elementId: string;

  render(): TemplateResult {
    return html`
      <div class="card thumbnail bg-base-100 shadow-sm">
        <div class="card-body items-center justify-center h-full p-3 pb-5">
          <h2 class="card-title flex-none text-center">Demo</h2>
          <p class="font-mono text-xs flex-none">${this.elementId.slice(0, 8)}</p>
        </div>
      </div>
    `;
  }
}

export { DemoThumbnail };
