import { ApiWrapper, ServiceResolver } from '@ember-nexus/app-core/Service';
import { ServiceIdentifier } from '@ember-nexus/app-core/Type/Enum';
import {LitElement, TemplateResult, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import { withServiceResolver } from '../../Decorator/index.js';
import { pageStyle } from '../../Style/index.js';
import { style } from '../../style.js';
import {Project} from "../../Type/Element";


@customElement('ember-nexus-template-page-project-settings')
@withServiceResolver()
class ProjectSettingsPage extends LitElement {
  static styles = [unsafeCSS(style), pageStyle];

  serviceResolver: ServiceResolver;

  @property({ type: String, attribute: 'element-id' })
  elementId: string;

  project: Project | null = null;

  currentView: string = 'general';

  views = {
    general: {
      name: 'General',
      component: () => html`<ember-nexus-template-page-project-settings-view-general element-id="${this.elementId}"></ember-nexus-template-page-project-settings-view-general>`
    },
    taskStates: {
      name: 'Task States',
      component: () => html`<ember-nexus-template-page-project-settings-view-task-states element-id="${this.elementId}"></ember-nexus-template-page-project-settings-view-task-states>`
    },
  };

  refreshData(): void {
    const apiWrapper = this.serviceResolver.getServiceOrFail<ApiWrapper>(ServiceIdentifier.serviceApiWrapper);
    apiWrapper
      .getElement(this.elementId)
      .then((result) => {
        this.project = result as Project;
        this.requestUpdate();
      });
  }

  changeView(event: Event): void {
    const target = event.currentTarget as HTMLButtonElement | null;
    if (!target) return;

    const view = target.dataset.view;
    if (view && view in this.views && view !== this.currentView) {
      this.currentView = view;
      this.requestUpdate();
    }
  }

  handleSelectViewChange(event: Event): void
  {
    const target = event.target as HTMLSelectElement;
    this.currentView = target.value;
    this.requestUpdate();
  }

  render(): TemplateResult {
    return html`
      <div class="m-auto container max-w-5xl flex flex-col gap-2 p-3">

        <wa-breadcrumb>
          <wa-breadcrumb-item href="https://example.com/home">
            Projects
            <wa-icon slot="separator" name="chevron-right" variant="solid"></wa-icon>
          </wa-breadcrumb-item>
          <wa-breadcrumb-item href="https://example.com/home/services">
            ${this.project?.data.name}
            <wa-icon slot="separator" name="chevron-right" variant="solid"></wa-icon>
          </wa-breadcrumb-item>
          <wa-breadcrumb-item>Settings</wa-breadcrumb-item>
        </wa-breadcrumb>

          <h1 class="py-4 text-4xl font-semibold">Project Settings</h1>

          <div class="grid grid-cols-8 pt-3 sm:grid-cols-10 gap-1">
            <div class="relative my-4 w-56 sm:hidden">
              <wa-select
                value=${this.currentView}
                @change=${this.handleSelectViewChange}
              >
                ${Object.entries(this.views).map(([key, { name }]) => html`
                  <wa-option value="${key}">${name}</wa-option>
                `)}
              </wa-select>
            </div>

            <div class="col-span-3 md:col-span-2 hidden sm:block">
              <ul class="menu w-full gap-1">
                ${Object.entries(this.views).map(([key, { name }]) => html`
                  <li>
                    <button
                      class=${this.currentView === key ? 'menu-active' : ''}
                      data-view=${key}
                      @click=${this.changeView}
                    >
                      ${name}
                    </button>
                  </li>
                `)}
              </ul>
            </div>

            <div class="col-span-8 sm:col-span-7 md:col-span-8 card bg-base-200 shadow-sm">

              ${this.views[this.currentView].component()}

            </div>
          </div>
        </div>

      </div>
    `;
  }
}

export { ProjectSettingsPage };
