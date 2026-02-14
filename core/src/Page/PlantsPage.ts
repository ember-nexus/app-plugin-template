import { ApiWrapper, ServiceResolver } from '@ember-nexus/app-core/Service';
import { Node } from '@ember-nexus/app-core/Type/Definition';
import {
  ElasticsearchQueryDSLMixinStep,
  ElementHydrationStep,
} from '@ember-nexus/app-core/Type/Definition/Search/Step';
import { ElementHydrationStepResult } from '@ember-nexus/app-core/Type/Definition/Search/StepResult';
import { ServiceIdentifier } from '@ember-nexus/app-core/Type/Enum';
import { LitElement, TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import { withServiceResolver } from '../Decorator/index.js';
import { pageStyle } from '../Style/index.js';
import { style } from '../style.js';

type PlantNode = Node & {
  data: {
    name: string;
    description: string;
    scientificName: string;
    images: {
      imageLinkThumbnail: string;
    }[];
  };
};

@customElement('ember-nexus-template-page-plants')
@withServiceResolver()
class PlantsPage extends LitElement {
  static styles = [unsafeCSS(style), pageStyle];

  serviceResolver: ServiceResolver;

  plants: PlantNode[] = [];

  query: string = 'Lily';

  refreshData(): void {
    const apiWrapper = this.serviceResolver.getServiceOrFail<ApiWrapper>(ServiceIdentifier.serviceApiWrapper);
    apiWrapper
      .postSearch([
        {
          type: 'elasticsearch-query-dsl-mixin',
          query: {
            bool: {
              should: [
                {
                  match: {
                    name: {
                      query: this.query,
                      fuzziness: 'AUTO',
                      boost: 10.0,
                    },
                  },
                },
                {
                  match: {
                    description: {
                      query: this.query,
                      fuzziness: 'AUTO',
                    },
                  },
                },
                {
                  match_phrase_prefix: {
                    name: {
                      query: this.query,
                      max_expansions: 50, // number of variations to try
                      boost: 5.0,
                    },
                  },
                },
              ],
              minimum_should_match: 1,
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
        const tmp = results as unknown as ElementHydrationStepResult;
        this.plants = tmp as unknown as PlantNode[];
        this.requestUpdate();
      });
  }

  handleInputChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.query = target.value;
    this.refreshData();
  }

  render(): TemplateResult {
    return html`
      <div class="">
        <div class="card-body p-3">
          <input
            type="text"
            placeholder="Type here"
            class="input"
            value=${this.query}
            @input=${this.handleInputChange}
          />
          <h2 class="card-title">Results for: ${this.query}</h2>
          <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
            ${this.plants.map(
              (plant) =>
                html` <div class="card bg-base-100 shadow-sm">
                  ${plant.data.images && plant.data.images.length > 0
                    ? html` <figure>
                        <img
                          class="aspect-square object-cover select-none w-full"
                          src="${plant.data.images[0].imageLinkThumbnail}"
                          alt="Shoes"
                        />
                      </figure>`
                    : nothing}
                  <div class="card-body">
                    <h2 class="card-title">${plant.data.name}</h2>
                    <p class="italic">${plant.data.scientificName}</p>
                    <p class="line-clamp-6">${plant.data.description}</p>
                  </div>
                </div>`,
            )}
          </div>
        </div>
      </div>
    `;
  }
}

export { PlantsPage };
