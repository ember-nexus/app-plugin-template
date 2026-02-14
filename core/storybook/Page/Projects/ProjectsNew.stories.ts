import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

type CustomArgs = {};

const meta: Meta<CustomArgs> = {
  title: 'Page/Projects',
  component: 'ember-nexus-template-page-projects-new',
  tags: ['page'],
  parameters: {
    layout: 'fullscreen'
  },
  render: () => html`
    <ember-nexus-template-page-projects-new>
    </ember-nexus-template-page-projects-new>
  `,
};

export default meta;
type Story = StoryObj;

export const New: Story = {
  args: {}
};
