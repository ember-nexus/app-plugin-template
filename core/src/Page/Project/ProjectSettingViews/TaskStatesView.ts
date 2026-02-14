import {ApiWrapper, ServiceResolver} from '@ember-nexus/app-core/Service';
import {ServiceIdentifier} from '@ember-nexus/app-core/Type/Enum';
import {html, LitElement, TemplateResult, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import {withServiceResolver} from '../../../Decorator/index.js';
import {pageStyle} from '../../../Style/index.js';
import {style} from '../../../style.js';
import {TaskState} from "../../../Type/Element";
import {NodeWithOptionalId, Uuid} from "@ember-nexus/app-core/Type/Definition";
import {CypherPathSubsetStep, ElementHydrationStep} from "@ember-nexus/app-core/Type/Definition/Search/Step";
import {ElementHydrationStepResult} from "@ember-nexus/app-core/Type/Definition/Search/StepResult";
import {Pencil, Trash2, Plus} from "lucide-static";
import WaDialog from "@awesome.me/webawesome/dist/components/dialog/dialog";


@customElement('ember-nexus-template-page-project-settings-view-task-states')
@withServiceResolver()
class TaskStatesView extends LitElement {
  static styles = [unsafeCSS(style), pageStyle];

  serviceResolver: ServiceResolver;

  @property({ type: String, attribute: 'element-id' })
  elementId: string;

  taskStates: TaskState[] = [];

  newTaskStateName: string = '';
  newTaskStateColor: string = '';

  private handleNewTaskStateNameChange(e: Event): void {
    const target = e.target as HTMLSelectElement;
    this.newTaskStateName = target.value;
  }

  private handleNewTaskStateColorChange(e: Event): void {
    const target = e.target as HTMLSelectElement;
    this.newTaskStateColor = target.value;
  }

  private deleteTaskStatus(event: Event): void
  {
    const target = event.currentTarget as HTMLButtonElement;
    const elementId = target.dataset.elementId as Uuid;
    const apiWrapper = this.serviceResolver.getServiceOrFail<ApiWrapper>(ServiceIdentifier.serviceApiWrapper);
    apiWrapper
      .deleteElement(elementId)
      .then(() => {
        this.refreshData();
      });
  }

  openCreateTaskStateDialog(): void
  {
    this.newTaskStateName = '';
    this.newTaskStateColor = '';
    const dialog: WaDialog = this.renderRoot.querySelector('#create-task-state-dialog');
    dialog.open = true;
  }

  createNewTaskState(){
    const apiWrapper = this.serviceResolver.getServiceOrFail<ApiWrapper>(ServiceIdentifier.serviceApiWrapper);
    apiWrapper
      .postElement(
        this.elementId,
        {
          type: 'TaskState',
          data: {
            name: this.newTaskStateName,
            color: this.newTaskStateColor
          }
        } satisfies NodeWithOptionalId
      )
      .then(() => {
        this.newTaskStateName = '';
        this.newTaskStateColor = '';
        const dialog: WaDialog = this.renderRoot.querySelector('#create-task-state-dialog');
        dialog.open = false;
        console.log("saved");
        this.refreshData();
      });
  }

  refreshData(): void {
    const apiWrapper = this.serviceResolver.getServiceOrFail<ApiWrapper>(ServiceIdentifier.serviceApiWrapper);
    apiWrapper
      .postSearch([
        {
          type: 'cypher-path-subset',
          query: "MATCH path=((:Project {id: $projectId})-[:OWNS|HAS_READ_ACCESS*..]->(ts:TaskState)) RETURN path",
          parameters: {
            projectId: this.elementId
          },
        } satisfies CypherPathSubsetStep,
        {
          type: 'element-hydration',
        } satisfies ElementHydrationStep,
      ])
      .then((results) => {
        const elements = results as unknown as ElementHydrationStepResult;
        this.taskStates = (elements as any[])
          .filter((element) => element.type === "TaskState")
          .sort((a, b) =>
            (a?.data?.name ?? "").localeCompare(b?.data?.name ?? "")
          ) as TaskState[];
        this.requestUpdate();
      });
  }

  encodeSvg(svg: string): string
  {
    const encoded = encodeURIComponent(svg)
      .replace(/'/g, '%27')
      .replace(/"/g, '%22');

    return `data:image/svg+xml,${encoded}`;
  }

  render(): TemplateResult {
    return html`
      <div class="flex flex-col gap-2 p-3">

        <ul class="w-full">

          ${this.taskStates.map(
            (taskState, index) =>
              html`
                <li class="p-3 flex gap-2 ${index < this.taskStates.length - 1 ? 'border-b border-gray-300' : ''}">
                  <div class="flex gap-2 grow items-center">
                    <div
                      class="inline-block w-[1em] h-[1em] rounded-full"
                      style="background-color: ${taskState.data.color ?? '#ffffff'};"
                    ></div>
                    ${taskState.data.name}
                  </div>
                  <button
                    class="btn btn-square btn-ghost"
                    title="edit task status"
                  >
                    <wa-icon src="${this.encodeSvg(Pencil)}"></wa-icon>
                  </button>
                  <button
                    class="btn btn-square btn-ghost"
                    title="delete task status"
                    data-element-id=${taskState.id}
                    @click=${this.deleteTaskStatus}
                  >
                    <wa-icon src="${this.encodeSvg(Trash2)}"></wa-icon>
                  </button>
                </li>
              `,
          )}
        </ul>


        <wa-dialog label="Create task state" light-dismiss id="create-task-state-dialog">
          <div class="flex gap-0.5 w-full">
            <wa-color-picker
              label="Color"
              swatches="
                  #d0021b; #f5a623; #f8e71c; #8b572a; #7ed321; #417505; #bd10e0; #9013fe;
                  #4a90e2; #50e3c2; #b8e986; #000; #444; #888; #ccc; #fff;
                "
              .value=${this.newTaskStateColor}
              @input=${this.handleNewTaskStateColorChange}
            ></wa-color-picker>

            <wa-input
              class="grow"
              label="Name"
              required
              .value=${this.newTaskStateName}
              @input=${this.handleNewTaskStateNameChange}
            ></wa-input>
          </div>
          <div class="flex columns-2 gap-0.5" slot="footer">
            <button class="btn" data-dialog="close">cancel</button>
            <button class="btn btn-warning" @click="${this.createNewTaskState}">
              <wa-icon src="${this.encodeSvg(Plus)}"></wa-icon>
              create task state
            </button>
          </div>
        </wa-dialog>

        <div class="flex flex-row-reverse gap-2">
          <button class="btn btn-primary" @click="${this.openCreateTaskStateDialog}">
            <wa-icon src="${this.encodeSvg(Plus)}"></wa-icon>
            create new task state
          </button>
        </div>

      </div>
    `;
  }
}

export { TaskStatesView };
