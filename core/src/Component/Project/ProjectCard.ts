import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { style } from '../../style.js';
import {withServiceResolver} from "../../Decorator";
import {ApiWrapper, ServiceResolver} from "@ember-nexus/app-core/Service";
import {Project} from "../../Type/Element";
import {ServiceIdentifier} from "@ember-nexus/app-core/Type/Enum";

@customElement('ember-nexus-template-project-card')
@withServiceResolver()
class ProjectCard extends LitElement {
  static styles = [unsafeCSS(style)];

  serviceResolver: ServiceResolver;

  @property({ type: String, attribute: 'element-id' })
  elementId: string;

  project: Project | null = null;

  refreshData(): void {
    const apiWrapper = this.serviceResolver.getServiceOrFail<ApiWrapper>(ServiceIdentifier.serviceApiWrapper);
    apiWrapper
      .getElement(this.elementId)
      .then((result) => {
        this.project = result as Project;
        this.requestUpdate();
      });
  }

  render(): TemplateResult {
    return html`
      <div class="card bg-base-100 w-full shadow-sm">
        <div class="card-body p-3">
            <h2 class="card-title">
              <div
                class="inline-block w-[1em] h-[1em] rounded-full"
                style="background-color: ${this.project?.data.color ?? '#ffffff'};"
              ></div>
            ${this.project?.data.name ?? 'loading'}</h2>
          <p class="line-clamp-6">${this.project?.data.description}</p>
        </div>
      </div>
    `;
  }
}

export { ProjectCard };
