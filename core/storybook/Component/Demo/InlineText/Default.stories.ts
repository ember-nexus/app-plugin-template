import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

type CustomArgs = { elementId: string };

const meta: Meta<CustomArgs> = {
  title: 'Component/Demo/InlineText',
  component: 'ember-nexus-template-demo-inline-text',
  tags: ['inlineText'],
  render: ({elementId}) => html`
    <ember-nexus-template-demo-inline-text
      element-id="${elementId}"
    >
    </ember-nexus-template-demo-inline-text>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    elementId: '56fda20c-b238-4034-b555-1df47c47e17a',
  }
};
