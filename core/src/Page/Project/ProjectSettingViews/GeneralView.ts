import { ApiWrapper, ServiceResolver } from '@ember-nexus/app-core/Service';
import { ServiceIdentifier } from '@ember-nexus/app-core/Type/Enum';
import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import {customElement, property, state} from 'lit/decorators.js';

import { withServiceResolver } from '../../../Decorator/index.js';
import { pageStyle } from '../../../Style/index.js';
import { style } from '../../../style.js';
import { Project } from '../../../Type/Element/index.js';

@customElement('ember-nexus-template-page-project-settings-view-general')
@withServiceResolver()
class GeneralView extends LitElement {
  static styles = [unsafeCSS(style), pageStyle];

  serviceResolver: ServiceResolver;

  @property({ type: String, attribute: 'element-id' })
  elementId: string;

  project: Project | null = null;

  @state() name: string = '';
  @state() description: string = '';
  @state() color: string = '';
  @state() hasUserUpdatedData: boolean = false;

  private handleNameChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.name = target.value;
    this.hasUserUpdatedData = true;
  }

  private handleDescriptionChange(e: Event): void {
    const target = e.target as HTMLTextAreaElement;
    this.description = target.value;
    this.hasUserUpdatedData = true;
  }

  private handleColorChange(e: Event): void {
    const target = e.target as HTMLSelectElement;
    this.color = target.value;
    this.hasUserUpdatedData = true;
  }

  updateProject() {
    const apiWrapper = this.serviceResolver.getServiceOrFail<ApiWrapper>(ServiceIdentifier.serviceApiWrapper);
    apiWrapper
      .patchElement(this.elementId, {
        name: this.name,
        description: this.description,
        color: this.color,
      } satisfies Project['data'])
      .then(() => {
        console.log('updated project');
        this.hasUserUpdatedData = false;
      });
  }

  refreshData(): void {
    const apiWrapper = this.serviceResolver.getServiceOrFail<ApiWrapper>(ServiceIdentifier.serviceApiWrapper);
    apiWrapper.getElement(this.elementId).then((result) => {
      this.project = result as Project;
      this.name = this.project.data.name;
      this.description = this.project.data.description;
      this.color = this.project.data.color;
      this.requestUpdate();
    });
  }

  render(): TemplateResult {
    return html`
      <div class="flex flex-col w-full gap-3">
        <div class="card bg-base-200 shadow-sm p-3">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <p class="text-left font-bold">General settings</p>
            <div class="flex justify-end">
              <button class="btn ${this.hasUserUpdatedData ? 'btn-success' : 'btn-neutral'}" @click="${this.updateProject}">Update project</button>
            </div>
          </div>
        </div>
        <div class="flex flex-col card bg-base-200 shadow-sm p-3 gap-4">
          <wa-input label="Name" required .value=${this.name} @input=${this.handleNameChange}></wa-input>

          <wa-textarea
            label="Description"
            required
            resize="none"
            .value=${this.description}
            @input=${this.handleDescriptionChange}
          ></wa-textarea>

          <wa-color-picker
            label="Project color"
            swatches="
                #d0021b; #f5a623; #f8e71c; #8b572a; #7ed321; #417505; #bd10e0; #9013fe;
                #4a90e2; #50e3c2; #b8e986; #000; #444; #888; #ccc; #fff;
              "
            .value=${this.color}
            @input=${this.handleColorChange}
          ></wa-color-picker>
        </div>
      </div>
    `;
  }
}

export { GeneralView };
