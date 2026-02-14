import { ApiWrapper, ServiceResolver } from '@ember-nexus/app-core/Service';
import { ServiceIdentifier } from '@ember-nexus/app-core/Type/Enum';
import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import {customElement, property} from 'lit/decorators.js';

import { withServiceResolver } from '../../../Decorator/index.js';
import { pageStyle } from '../../../Style/index.js';
import { style } from '../../../style.js';
import {Project} from "../../../Type/Element";
import WaDialog from "@awesome.me/webawesome/dist/components/dialog/dialog";


@customElement('ember-nexus-template-page-project-settings-view-general')
@withServiceResolver()
class GeneralView extends LitElement {
  static styles = [unsafeCSS(style), pageStyle];

  serviceResolver: ServiceResolver;

  @property({ type: String, attribute: 'element-id' })
  elementId: string;

  project: Project | null = null;

  name: string = '';
  description: string = '';
  color: string = '';

  private handleNameChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.name = target.value;
  }

  private handleDescriptionChange(e: Event): void {
    const target = e.target as HTMLTextAreaElement;
    this.description = target.value;
  }

  private handleColorChange(e: Event): void {
    const target = e.target as HTMLSelectElement;
    this.color = target.value;
  }

  updateProject(){
    const apiWrapper = this.serviceResolver.getServiceOrFail<ApiWrapper>(ServiceIdentifier.serviceApiWrapper);
    apiWrapper
      .patchElement(
        this.elementId,
        {
          name: this.name,
          description: this.description,
          color: this.color
        } satisfies Project["data"]
      )
      .then(() => {
        console.log("updated project");
      });
  }

  openDeleteProjectPrompt(){
    const dialog: WaDialog = this.renderRoot.querySelector('#delete-project-dialog');
    dialog.open = true;
  }

  deleteProject(){
    const apiWrapper = this.serviceResolver.getServiceOrFail<ApiWrapper>(ServiceIdentifier.serviceApiWrapper);
    apiWrapper
      .deleteElement(this.elementId)
      .then(() => {
        console.log("deleted project");
        const dialog: WaDialog = this.renderRoot.querySelector('#delete-project-dialog');
        dialog.open = false;
      });
  }

  refreshData(): void {
    const apiWrapper = this.serviceResolver.getServiceOrFail<ApiWrapper>(ServiceIdentifier.serviceApiWrapper);
    apiWrapper
      .getElement(this.elementId)
      .then((result) => {
        this.project = result as Project;
        this.name = this.project.data.name;
        this.description = this.project.data.description;
        this.color = this.project.data.color;
        this.requestUpdate();
      });
  }

  render(): TemplateResult {
    return html`
      <div class="flex flex-col gap-2 p-3">

        <wa-input
          label="Name"
          required
          .value=${this.name}
          @input=${this.handleNameChange}
        ></wa-input>

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

        <div class="flex flex-row-reverse gap-2">
          <button class="btn btn-primary" @click="${this.updateProject}">update project</button>
          <button class="btn btn-warning" @click="${this.openDeleteProjectPrompt}">delete project</button>
        </div>

        <wa-dialog label="Confirm action" light-dismiss id="delete-project-dialog">
          Do you really want to delete the project "${this.project?.data.name}"?
          <div class="flex columns-2 gap-0.5" slot="footer">
            <button class="btn" data-dialog="close">cancel</button>
            <button class="btn btn-warning" @click="${this.deleteProject}">delete project</button>
          </div>
        </wa-dialog>

      </div>
    `;
  }
}

export { GeneralView };
