import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

type CustomArgs = { elementId: string };

const meta: Meta<CustomArgs> = {
  title: 'Component/Demo/Demo',
  component: 'ember-nexus-default',
  render: ({elementId}) => html`
    <div class="flex flex-col gap-2">
      <ember-nexus-template-demo-card
        element-id="${elementId}"
      >
      </ember-nexus-template-demo-card>
      <ember-nexus-template-demo-thumbnail
        element-id="${elementId}"
      >
      </ember-nexus-template-demo-thumbnail>
      <ember-nexus-template-demo-pill
        element-id="${elementId}"
      >
      </ember-nexus-template-demo-pill>
      <ember-nexus-template-demo-icon
        element-id="${elementId}"
      >
      </ember-nexus-template-demo-icon>
      <ember-nexus-template-demo-inline-text
        element-id="${elementId}"
      >
      </ember-nexus-template-demo-inline-text>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Demo: Story = {
  args: {
    elementId: '56fda20c-b238-4034-b555-1df47c47e17a',
  }
};
