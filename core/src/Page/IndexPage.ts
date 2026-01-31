import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import { indexStyles } from '../Style/index.js';

@customElement('ember-nexus-template-page-index')
class IndexPage extends LitElement {
  static styles = [unsafeCSS(indexStyles)];

  render(): TemplateResult {
    return html`
      <div class="card bg-base-100 w-full shadow-sm">
        <div class="card-body p-3">
          <h2 class="card-title">Index Page</h2>
        </div>
      </div>
    `;
  }
}

export { IndexPage };
