import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

type CustomArgs = { elementId: string };

const meta: Meta<CustomArgs> = {
  title: 'Component/Demo/Card',
  component: 'ember-nexus-template-demo-card',
  tags: ['card'],
  render: ({elementId}) => html`
    <div class="flex flex-col gap-2">
      <ember-nexus-template-demo-card
        element-id="${elementId}"
      >
      </ember-nexus-template-demo-card>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    elementId: '56fda20c-b238-4034-b555-1df47c47e17a',
  }
};
