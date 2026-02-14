import { ServiceResolver } from '@ember-nexus/app-core/Service';
import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { withServiceResolver } from '../Decorator/index.js';
import { pageStyle } from '../Style/index.js';
import { style } from '../style.js';

interface PlantFormData {
  name: string;
  scientificName: string;
  description: string;
  primaryColor: string;
}

@customElement('ember-nexus-template-page-add-plant')
@withServiceResolver()
class AddPlantPage extends LitElement {
  static styles = [unsafeCSS(style), pageStyle];

  serviceResolver: ServiceResolver;

  @state()
  private plant: PlantFormData = {
    name: '',
    scientificName: '',
    description: '',
    primaryColor: '',
  };

  // ---------- Data Change Handlers ----------

  private handleNameChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.plant = { ...this.plant, name: target.value };
  }

  private handleScientificNameChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.plant = { ...this.plant, scientificName: target.value };
  }

  private handleDescriptionChange(e: Event): void {
    const target = e.target as HTMLTextAreaElement;
    this.plant = { ...this.plant, description: target.value };
  }

  private handleColorChange(e: Event): void {
    const target = e.target as HTMLSelectElement;
    this.plant = { ...this.plant, primaryColor: target.value };
  }

  // ---------- Submit ----------

  private submit(event: Event): void {
    event.preventDefault();
    console.log('Plant form submitted:', this.plant);
  }
  render(): TemplateResult {
    return html`
      <div class="mx-auto w-full max-w-3xl p-4">
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title">Add Plant</h2>

            <form
              class="flex flex-col gap-4"
              @submit=${this.submit}
            >
              <wa-input
                label="Name"
                required
                .value=${this.plant.name}
                @input=${this.handleNameChange}
              ></wa-input>

              <wa-input
                label="Scientific Name"
                required
                .value=${this.plant.scientificName}
                @input=${this.handleScientificNameChange}
              ></wa-input>

              <wa-textarea
                label="Description"
                required
                resize="none"
                .value=${this.plant.description}
                @input=${this.handleDescriptionChange}
              ></wa-textarea>

              <wa-select
                label="Primary Color"
                required
                .value=${this.plant.primaryColor}
                @change=${this.handleColorChange}
              >
                <wa-option value="red">Red</wa-option>
                <wa-option value="yellow">Yellow</wa-option>
                <wa-option value="purple">Purple</wa-option>
              </wa-select>

              <wa-color-picker
                label="Secondary color"
                swatches="
                  #d0021b; #f5a623; #f8e71c; #8b572a; #7ed321; #417505; #bd10e0; #9013fe;
                  #4a90e2; #50e3c2; #b8e986; #000; #444; #888; #ccc; #fff;
                "
              ></wa-color-picker>

              <div class="card-actions justify-end pt-2">
                <button type="submit" class="btn btn-primary">
                  Create Plant
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }

}

export { AddPlantPage };
