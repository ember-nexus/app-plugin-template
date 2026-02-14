import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { style } from '../../style.js';
import {withServiceResolver} from "../../Decorator";
import {ApiWrapper, ServiceResolver} from "@ember-nexus/app-core/Service";
import {TaskState} from "../../Type/Element";
import {ServiceIdentifier} from "@ember-nexus/app-core/Type/Enum";

@customElement('ember-nexus-template-task-state-card')
@withServiceResolver()
class TaskStateCard extends LitElement {
  static styles = [unsafeCSS(style)];

  serviceResolver: ServiceResolver;

  @property({ type: String, attribute: 'element-id' })
  elementId: string;

  taskState: TaskState | null = null;

  refreshData(): void {
    const apiWrapper = this.serviceResolver.getServiceOrFail<ApiWrapper>(ServiceIdentifier.serviceApiWrapper);
    apiWrapper
      .getElement(this.elementId)
      .then((result) => {
        this.taskState = result as TaskState;
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
                style="background-color: ${this.taskState?.data.color ?? '#ffffff'};"
              ></div>
            ${this.taskState?.data.name ?? 'loading'}</h2>
        </div>
      </div>
    `;
  }
}

export { TaskStateCard };
