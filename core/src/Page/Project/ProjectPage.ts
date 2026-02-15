import { ApiWrapper, ServiceResolver } from '@ember-nexus/app-core/Service';
import { CypherPathSubsetStep, ElementHydrationStep } from '@ember-nexus/app-core/Type/Definition/Search/Step';
import { ElementHydrationStepResult } from '@ember-nexus/app-core/Type/Definition/Search/StepResult';
import { ServiceIdentifier } from '@ember-nexus/app-core/Type/Enum';
import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { withServiceResolver } from '../../Decorator/index.js';
import { pageStyle } from '../../Style/index.js';
import { style } from '../../style.js';
import { Project, TaskState } from '../../Type/Element/index.js';

@customElement('ember-nexus-template-page-project')
@withServiceResolver()
class ProjectPage extends LitElement {
  static styles = [unsafeCSS(style), pageStyle];

  serviceResolver: ServiceResolver;

  @property({ type: String, attribute: 'element-id' })
  elementId: string;

  project: Project | null = null;
  taskStates: TaskState[] = [];

  refreshData(): void {
    const apiWrapper = this.serviceResolver.getServiceOrFail<ApiWrapper>(ServiceIdentifier.serviceApiWrapper);
    apiWrapper.getElement(this.elementId).then((result) => {
      this.project = result as Project;
      this.requestUpdate();
    });
    apiWrapper
      .postSearch([
        {
          type: 'cypher-path-subset',
          query: 'MATCH path=((:Project {id: $projectId})-[:OWNS|HAS_READ_ACCESS*..]->(ts:TaskState)) RETURN path',
          parameters: {
            projectId: this.elementId,
          },
        } satisfies CypherPathSubsetStep,
        {
          type: 'element-hydration',
        } satisfies ElementHydrationStep,
      ])
      .then((results) => {
        const elements = results as unknown as ElementHydrationStepResult;
        const taskStates = (elements as any[])
          .filter((element) => element.type === 'TaskState')
          .sort((a, b) => (a?.data?.name ?? '').localeCompare(b?.data?.name ?? '')) as TaskState[];

        this.taskStates = taskStates;
        this.requestUpdate();
      });
  }

  render(): TemplateResult {
    return html`
      <ember-nexus-template-layout-default>
        <wa-breadcrumb>
          <wa-breadcrumb-item href="https://example.com/home">
            Projects
            <wa-icon slot="separator" name="chevron-right" variant="solid"></wa-icon>
          </wa-breadcrumb-item>
          <wa-breadcrumb-item href="https://example.com/home/services"> ${this.project?.data.name} </wa-breadcrumb-item>
        </wa-breadcrumb>

        <div class="flex flex-row-reverse gap-2">
          <button class="btn btn-primary">project settings</button>
          <button class="btn btn-primary">create new ticket</button>
        </div>
        <h2>
          <div
            class="inline-block w-[1em] h-[1em] rounded-full"
            style="background-color: ${this.project?.data.color ?? '#ffffff'};"
          ></div>
          ${this.project?.data.name ?? 'loading'}
        </h2>
        <p class="line-clamp-6">${this.project?.data.description}</p>
        <div class="flex flex-row-reverse">
          <wa-select with-clear>
            ${this.taskStates.map(
              (taskState) =>
                html`<wa-option value="${taskState.id}">
                  ${taskState.data.name}
                  <div
                    class="inline-block w-[1em] h-[1em] mr-2 rounded-full"
                    style="background-color: ${taskState.data.color ?? '#ffffff'};"
                    slot="start"
                  ></div>
                </wa-option>`,
            )}
          </wa-select>
        </div>
      </ember-nexus-template-layout-default>
    `;
  }
}

export { ProjectPage };
