import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

type CustomArgs = { elementId: string };

const meta: Meta<CustomArgs> = {
  title: 'Component/Demo/Icon',
  component: 'ember-nexus-template-demo-icon',
  tags: ['icon'],
  render: ({elementId}) => html`
    <ember-nexus-template-demo-icon
      element-id="${elementId}"
    >
    </ember-nexus-template-demo-icon>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    elementId: '56fda20c-b238-4034-b555-1df47c47e17a',
  }
};
