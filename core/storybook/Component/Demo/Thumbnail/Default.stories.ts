import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

type CustomArgs = { elementId: string };

const meta: Meta<CustomArgs> = {
  title: 'Component/Demo/Thumbnail',
  component: 'ember-nexus-template-demo-thumbnail',
  tags: ['thumbnail'],
  render: ({elementId}) => html`
    <ember-nexus-template-demo-thumbnail
      element-id="${elementId}"
    >
    </ember-nexus-template-demo-thumbnail>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    elementId: '56fda20c-b238-4034-b555-1df47c47e17a',
  }
};
