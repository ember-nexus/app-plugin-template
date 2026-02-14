import WaDialog from '@awesome.me/webawesome/dist/components/dialog/dialog';
import { ApiWrapper, ServiceResolver } from '@ember-nexus/app-core/Service';
import { NodeWithOptionalId, Uuid } from '@ember-nexus/app-core/Type/Definition';
import { CypherPathSubsetStep, ElementHydrationStep } from '@ember-nexus/app-core/Type/Definition/Search/Step';
import { ElementHydrationStepResult } from '@ember-nexus/app-core/Type/Definition/Search/StepResult';
import { ServiceIdentifier } from '@ember-nexus/app-core/Type/Enum';
import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Pencil, Plus, Trash2 } from 'lucide-static';

import { withServiceResolver } from '../../../Decorator/index.js';
import { pageStyle } from '../../../Style/index.js';
import { style } from '../../../style.js';
import { TaskState } from '../../../Type/Element/index.js';

@customElement('ember-nexus-template-page-project-settings-view-task-states')
@withServiceResolver()
class TaskStatesView extends LitElement {
  static styles = [unsafeCSS(style), pageStyle];

  serviceResolver: ServiceResolver;

  @property({ type: String, attribute: 'element-id' })
  elementId!: string;

  @state() taskStates: TaskState[] = [];
  @state() newTaskStateName = '';
  @state() newTaskStateColor = '';

  private createTaskStateDialog!: WaDialog;

  @state() editTaskStateId: Uuid | null = null;
  @state() editTaskStateName = '';
  @state() editTaskStateColor = '';

  private updateTaskStateDialog!: WaDialog;

  firstUpdated() {
    this.createTaskStateDialog = this.renderRoot.querySelector('#create-task-state-dialog')!;
    this.updateTaskStateDialog = this.renderRoot.querySelector('#update-task-state-dialog')!;
  }

  private handleInputChange = (prop: string) => (e: Event) => {
    this[prop] = (e.target as HTMLInputElement).value;
  };

  private encodeSvg(svg: string): string {
    const encoded = encodeURIComponent(svg).replace(/'/g, '%27').replace(/"/g, '%22');
    return `data:image/svg+xml,${encoded}`;
  }

  private async deleteTaskStatus(e: Event): Promise<void> {
    const elementId = (e.currentTarget as HTMLButtonElement).dataset.elementId as Uuid;
    const apiWrapper = this.serviceResolver.getServiceOrFail<ApiWrapper>(ServiceIdentifier.serviceApiWrapper);
    await apiWrapper.deleteElement(elementId);
    this.refreshData();
  }

  private openCreateTaskStateDialog(): void {
    this.newTaskStateName = '';
    this.newTaskStateColor = '';
    this.createTaskStateDialog.open = true;
  }

  private openUpdateTaskStateDialog(taskState: TaskState): void {
    this.editTaskStateId = taskState.id;
    this.editTaskStateName = taskState.data.name ?? '';
    this.editTaskStateColor = taskState.data.color ?? '';
    this.updateTaskStateDialog.open = true;
  }

  private async createNewTaskState(): Promise<void> {
    const apiWrapper = this.serviceResolver.getServiceOrFail<ApiWrapper>(ServiceIdentifier.serviceApiWrapper);
    await apiWrapper.postElement(this.elementId, {
      type: 'TaskState',
      data: { name: this.newTaskStateName, color: this.newTaskStateColor },
    } satisfies NodeWithOptionalId);

    this.createTaskStateDialog.open = false;
    this.refreshData();
  }

  private async updateTaskState(): Promise<void> {
    if (!this.editTaskStateId) return;

    const apiWrapper = this.serviceResolver.getServiceOrFail<ApiWrapper>(ServiceIdentifier.serviceApiWrapper);

    await apiWrapper.patchElement(this.editTaskStateId, {
      name: this.editTaskStateName,
      color: this.editTaskStateColor,
    });

    this.updateTaskStateDialog.open = false;
    this.refreshData();
  }

  private async refreshData(): Promise<void> {
    const apiWrapper = this.serviceResolver.getServiceOrFail<ApiWrapper>(ServiceIdentifier.serviceApiWrapper);

    const results = (await apiWrapper.postSearch([
      {
        type: 'cypher-path-subset',
        query: 'MATCH path=((:Project {id: $projectId})-[:OWNS|HAS_READ_ACCESS*..]->(ts:TaskState)) RETURN path',
        parameters: { projectId: this.elementId },
      } satisfies CypherPathSubsetStep,
      {
        type: 'element-hydration',
      } satisfies ElementHydrationStep,
    ])) as unknown as ElementHydrationStepResult;

    this.taskStates = (results as any[])
      .filter((el) => el.type === 'TaskState')
      .sort((a, b) => (a?.data?.name ?? '').localeCompare(b?.data?.name ?? ''));
  }

  private renderTaskState(taskState: TaskState, index: number): TemplateResult {
    return html`
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
          @click=${() => this.openUpdateTaskStateDialog(taskState)}
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
    `;
  }

  renderCreateTaskStateDialog(): TemplateResult {
    return html`
      <wa-dialog label="Create task state" light-dismiss id="create-task-state-dialog">
        <div class="flex gap-0.5 w-full">
          <wa-color-picker
            label="Color"
            swatches="
                #d0021b; #f5a623; #f8e71c; #8b572a; #7ed321; #417505; #bd10e0; #9013fe;
                #4a90e2; #50e3c2; #b8e986; #000; #444; #888; #ccc; #fff;
              "
            .value=${this.newTaskStateColor}
            @input=${this.handleInputChange('newTaskStateColor')}
          ></wa-color-picker>

          <wa-input
            class="grow"
            label="Name"
            required
            .value=${this.newTaskStateName}
            @input=${this.handleInputChange('newTaskStateName')}
          ></wa-input>
        </div>

        <div class="grid grid-cols-2 gap-0.5 w-full" slot="footer">
          <button class="btn" data-dialog="close">cancel</button>
          <button class="btn btn-success" @click=${this.createNewTaskState}>
            <wa-icon src="${this.encodeSvg(Plus)}"></wa-icon>
            create task state
          </button>
        </div>
      </wa-dialog>
    `;
  }

  renderUpdateTaskStateDialog(): TemplateResult {
    return html`
      <wa-dialog label="Update task state" light-dismiss id="update-task-state-dialog">
        <div class="flex gap-0.5 w-full">
          <wa-color-picker
            label="Color"
            swatches="
            #d0021b; #f5a623; #f8e71c; #8b572a; #7ed321; #417505; #bd10e0; #9013fe;
            #4a90e2; #50e3c2; #b8e986; #000; #444; #888; #ccc; #fff;
          "
            .value=${this.editTaskStateColor}
            @input=${this.handleInputChange('editTaskStateColor')}
          ></wa-color-picker>

          <wa-input
            class="grow"
            label="Name"
            required
            .value=${this.editTaskStateName}
            @input=${this.handleInputChange('editTaskStateName')}
          ></wa-input>
        </div>

        <div class="grid grid-cols-2 gap-0.5 w-full" slot="footer">
          <button class="btn" data-dialog="close">close</button>
          <button class="btn btn-primary" @click=${this.updateTaskState}>save</button>
        </div>
      </wa-dialog>
    `;
  }

  render(): TemplateResult {
    return html`
      <div class="flex flex-col gap-2 p-3">
        <div class="flex flex-row-reverse gap-2">
          <button class="btn btn-primary" @click=${this.openCreateTaskStateDialog}>
            <wa-icon src="${this.encodeSvg(Plus)}"></wa-icon>
            create task state
          </button>
        </div>

        <ul class="w-full">
          ${this.taskStates.map(this.renderTaskState.bind(this))}
        </ul>

        ${this.renderCreateTaskStateDialog()} ${this.renderUpdateTaskStateDialog()}
      </div>
    `;
  }
}

export { TaskStatesView };
