import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

type CustomArgs = {};

const meta: Meta<CustomArgs> = {
  title: 'Page',
  component: 'ember-nexus-template-page-add-plant',
  tags: ['page'],
  parameters: {
    layout: 'fullscreen'
  },
  render: ({elementId}) => html`
    <ember-nexus-template-page-add-plant
      element-id="${elementId}"
    >
    </ember-nexus-template-page-add-plant>
  `,
};

export default meta;
type Story = StoryObj;

export const AddPlant: Story = {
  args: {}
};
