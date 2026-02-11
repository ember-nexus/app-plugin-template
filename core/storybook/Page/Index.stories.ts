import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

type CustomArgs = {};

const meta: Meta<CustomArgs> = {
  title: 'Page',
  component: 'ember-nexus-template-page-index',
  tags: ['page'],
  parameters: {
    layout: 'fullscreen'
  },
  render: ({elementId}) => html`
    <ember-nexus-template-page-index
      element-id="${elementId}"
    >
    </ember-nexus-template-page-index>
  `,
};

export default meta;
type Story = StoryObj;

export const Index: Story = {
  args: {}
};
