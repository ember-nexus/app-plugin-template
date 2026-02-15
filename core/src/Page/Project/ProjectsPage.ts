import { ApiWrapper, ServiceResolver } from '@ember-nexus/app-core/Service';
import {
  ElasticsearchQueryDSLMixinStep,
  ElementHydrationStep,
} from '@ember-nexus/app-core/Type/Definition/Search/Step';
import { ElementHydrationStepResult } from '@ember-nexus/app-core/Type/Definition/Search/StepResult';
import { ServiceIdentifier } from '@ember-nexus/app-core/Type/Enum';
import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import { withServiceResolver } from '../../Decorator/index.js';
import { pageStyle } from '../../Style/index.js';
import { style } from '../../style.js';
import { Project } from '../../Type/Element/index.js';

@customElement('ember-nexus-template-page-projects')
@withServiceResolver()
class ProjectsPage extends LitElement {
  static styles = [unsafeCSS(style), pageStyle];

  serviceResolver: ServiceResolver;

  projects: Project[] = [];

  refreshData(): void {
    const apiWrapper = this.serviceResolver.getServiceOrFail<ApiWrapper>(ServiceIdentifier.serviceApiWrapper);
    apiWrapper
      .postSearch([
        {
          type: 'elasticsearch-query-dsl-mixin',
          query: {
            exists: {
              field: 'name',
            },
          },
          parameters: {
            nodeTypes: ['Project'],
          },
        } satisfies ElasticsearchQueryDSLMixinStep,
        {
          type: 'element-hydration',
        } satisfies ElementHydrationStep,
      ])
      .then((results) => {
        const tmp = results as unknown as ElementHydrationStepResult;
        const projects = tmp as unknown as Project[];
        this.projects = [...projects].sort((a, b) => a.data.name.localeCompare(b.data.name));
        this.requestUpdate();
      });
  }

  render(): TemplateResult {
    return html`
      <ember-nexus-template-layout-default>
        <wa-breadcrumb>
          <wa-breadcrumb-item href="https://example.com/home"> Projects </wa-breadcrumb-item>
        </wa-breadcrumb>

        <div class="flex flex-row-reverse">
          <button class="btn btn-primary">create new project todo fixme</button>
        </div>
        <div class="grid gap-4 grid-cols-1 sm:[grid-template-columns:repeat(auto-fit,minmax(25em,1fr))]">
          ${this.projects.map(
            (project) =>
              html`<ember-nexus-template-project-card element-id="${project.id}"></ember-nexus-template-project-card>`,
          )}
        </div>
      </ember-nexus-template-layout-default>
    `;
  }
}

export { ProjectsPage };
