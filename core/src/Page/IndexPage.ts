import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import { style } from '../style.js';

@customElement('ember-nexus-template-page-index')
class IndexPage extends LitElement {
  static styles = [unsafeCSS(style)];

  render(): TemplateResult {
    return html`
      <div class="card bg-base-100 bg-(--test-color) w-full shadow-sm">
        <div class="card-body p-3">
          <h2 class="card-title">Index Page</h2>
          <p>Hello world :D</p>
          <button class="btn btn-primary">Style Test Button</button>
        </div>
      </div>
    `;
  }
}

export { IndexPage };
