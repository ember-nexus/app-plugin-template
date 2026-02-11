import { ApiWrapper, ServiceResolver } from '@ember-nexus/app-core/Service';
import { NodeWithOptionalId } from '@ember-nexus/app-core/Type/Definition';
import {
  ElasticsearchQueryDSLMixinStep,
  ElementHydrationStep,
} from '@ember-nexus/app-core/Type/Definition/Search/Step';
import { ServiceIdentifier } from '@ember-nexus/app-core/Type/Enum';
import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import { withServiceResolver } from '../Decorator/index.js';
import { pageStyle } from '../Style/index.js';
import { style } from '../style.js';

@customElement('ember-nexus-template-page-index')
@withServiceResolver()
class IndexPage extends LitElement {
  static styles = [unsafeCSS(style), pageStyle];

  serviceResolver: ServiceResolver;

  onClick() {
    if (!this.serviceResolver) return;
    const apiWrapper = this.serviceResolver.getServiceOrFail<ApiWrapper>(ServiceIdentifier.serviceApiWrapper);
    apiWrapper.getElement('8940d70b-5b6f-43b7-bee4-41d073396ff8').then((element) => {
      console.log(element);
    });
    apiWrapper
      .postSearch([
        {
          type: 'elasticsearch-query-dsl-mixin',
          query: {
            match: {
              description: {
                query: 'lily',
              },
            },
          },
          parameters: {
            nodeTypes: ['Plant'],
          },
        } satisfies ElasticsearchQueryDSLMixinStep,
        {
          type: 'element-hydration',
        } satisfies ElementHydrationStep,
      ])
      .then((results) => {
        console.log(results);
      });
  }

  createNewNode() {
    if (!this.serviceResolver) return;
    const apiWrapper = this.serviceResolver.getServiceOrFail<ApiWrapper>(ServiceIdentifier.serviceApiWrapper);
    apiWrapper
      .postIndex({
        type: 'Task',
        data: {
          state: 'planned',
          name: 'generic todo task',
        },
      } satisfies NodeWithOptionalId)
      .then((id) => {
        console.log(id);
        apiWrapper.getElement(id).then((element) => {
          console.log(element);
        });
      });
  }

  render(): TemplateResult {
    return html`
      <div class="border-2 border-blue-500 w-full min-h-full block">
        <div class="card-body p-3">
          <h2 class="card-title">Index Page</h2>
          <p>Hello world :D</p>
          <div class="flex gap-4">
            <button class="btn btn-primary" @click="${this.onClick}">Style Test Button</button>
            <button class="btn btn-secondary" @click="${this.createNewNode}">Create new element</button>
          </div>
          <div class="flex flex-col gap-4">
            <div class="w-[300px] h-[300px] bg-blue-400"></div>
          </div>
        </div>
      </div>
    `;
  }
}

export { IndexPage };
