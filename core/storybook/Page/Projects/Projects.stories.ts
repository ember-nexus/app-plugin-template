import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

type CustomArgs = {};

const meta: Meta<CustomArgs> = {
  title: 'Page/Projects',
  component: 'ember-nexus-template-page-projects',
  tags: ['page'],
  parameters: {
    layout: 'fullscreen'
  },
  render: () => html`
    <ember-nexus-template-page-projects>
    </ember-nexus-template-page-projects>
  `,
};

export default meta;
type Story = StoryObj;

export const Projects: Story = {
  args: {}
};
