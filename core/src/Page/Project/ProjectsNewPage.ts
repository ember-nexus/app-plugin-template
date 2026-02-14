import { ApiWrapper, ServiceResolver } from '@ember-nexus/app-core/Service';
import { NodeWithOptionalId} from '@ember-nexus/app-core/Type/Definition';
import { ServiceIdentifier } from '@ember-nexus/app-core/Type/Enum';
import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import { withServiceResolver } from '../../Decorator/index.js';
import { pageStyle } from '../../Style/index.js';
import { style } from '../../style.js';



@customElement('ember-nexus-template-page-projects-new')
@withServiceResolver()
class ProjectNewPage extends LitElement {
  static styles = [unsafeCSS(style), pageStyle];

  serviceResolver: ServiceResolver;

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

  createNewProject(){
    const apiWrapper = this.serviceResolver.getServiceOrFail<ApiWrapper>(ServiceIdentifier.serviceApiWrapper);
    apiWrapper
      .postIndex(
        {
          type: 'Project',
          data: {
            name: this.name,
            description: this.description,
            color: this.color
          }
        } satisfies NodeWithOptionalId
      )
      .then(() => {
        console.log("saved");
      });
  }

  render(): TemplateResult {
    return html`
      <div class="p-3 flex flex-col gap-2">
        <h2>New Project</h2>

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

        <button class="btn btn-primary" @click="${this.createNewProject}">create new project</button>
      </div>
    `;
  }
}

export { ProjectNewPage };
