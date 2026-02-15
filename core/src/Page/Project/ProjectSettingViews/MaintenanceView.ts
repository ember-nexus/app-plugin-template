import WaDialog from '@awesome.me/webawesome/dist/components/dialog/dialog';
import { ApiWrapper, ServiceResolver } from '@ember-nexus/app-core/Service';
import { ServiceIdentifier } from '@ember-nexus/app-core/Type/Enum';
import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { withServiceResolver } from '../../../Decorator/index.js';
import { pageStyle } from '../../../Style/index.js';
import { style } from '../../../style.js';
import { Project } from '../../../Type/Element/index.js';
import {Trash2} from "lucide-static";

@customElement('ember-nexus-template-page-project-settings-view-maintenance')
@withServiceResolver()
class MaintenanceView extends LitElement {
  static styles = [unsafeCSS(style), pageStyle];

  serviceResolver: ServiceResolver;

  @property({ type: String, attribute: 'element-id' })
  elementId: string;

  project: Project | null = null;

  openDeleteProjectPrompt() {
    const dialog: WaDialog = this.renderRoot.querySelector('#delete-project-dialog');
    dialog.open = true;
  }

  deleteProject() {
    const apiWrapper = this.serviceResolver.getServiceOrFail<ApiWrapper>(ServiceIdentifier.serviceApiWrapper);
    apiWrapper.deleteElement(this.elementId).then(() => {
      console.log('deleted project');
      const dialog: WaDialog = this.renderRoot.querySelector('#delete-project-dialog');
      dialog.open = false;
    });
  }

  refreshData(): void {
    const apiWrapper = this.serviceResolver.getServiceOrFail<ApiWrapper>(ServiceIdentifier.serviceApiWrapper);
    apiWrapper.getElement(this.elementId).then((result) => {
      this.project = result as Project;
      this.requestUpdate();
    });
  }

  private encodeSvg(svg: string): string {
    const encoded = encodeURIComponent(svg).replace(/'/g, '%27').replace(/"/g, '%22');
    return `data:image/svg+xml,${encoded}`;
  }

  render(): TemplateResult {
    return html`
      <div class="flex flex-col w-full gap-3">
        <div class="card bg-base-200 shadow-sm p-3">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <p class="text-left font-bold">Maintenance</p>
            <div class="flex justify-end">
              <button class="btn btn-error" @click="${this.openDeleteProjectPrompt}">
                <wa-icon src="${this.encodeSvg(Trash2)}"></wa-icon>
                Delete project
              </button>
            </div>
          </div>
        </div>
        <wa-dialog label="Confirm action" light-dismiss id="delete-project-dialog">
          Do you really want to delete the project "${this.project?.data.name}"?
          <div class="flex columns-2 gap-0.5" slot="footer">
            <button class="btn" data-dialog="close">cancel</button>
            <button class="btn btn-error" @click="${this.deleteProject}">delete project</button>
          </div>
        </wa-dialog>
      </div>
    `;
  }
}

export { MaintenanceView };
