import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

type CustomArgs = {};

const meta: Meta<CustomArgs> = {
  title: 'Page',
  component: 'ember-nexus-template-page-plants',
  tags: ['page'],
  parameters: {
    layout: 'fullscreen'
  },
  render: ({elementId}) => html`
    <ember-nexus-template-page-plants
      element-id="${elementId}"
    >
    </ember-nexus-template-page-plants>
  `,
};

export default meta;
type Story = StoryObj;

export const Plants: Story = {
  args: {}
};
