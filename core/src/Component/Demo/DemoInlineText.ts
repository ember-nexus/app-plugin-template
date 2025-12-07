import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { indexStyles } from '../../Style/index.js';

@customElement('ember-nexus-template-demo-inline-text')
class DemoInlineText extends LitElement {
  static styles = [unsafeCSS(indexStyles)];

  @property({ type: String, attribute: 'element-id' })
  elementId: string;

  render(): TemplateResult {
    const name = this.elementId.slice(0, 8);
    return html` <span><span class="font-mono text-xs">${name}</span></span> `;
  }
}

export { DemoInlineText };
