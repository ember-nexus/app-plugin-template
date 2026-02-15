import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { pageStyle } from '../Style/index.js';
import { style } from '../style.js';

@customElement('ember-nexus-template-layout-default')
class DefaultLayout extends LitElement {
  static styles = [unsafeCSS(style), pageStyle];

  render(): TemplateResult {
    return html`
      <div class="m-auto container max-w-5xl flex flex-col gap-2 p-3">
        <slot></slot>
      </div>
    `;
  }
}

export { DefaultLayout };
