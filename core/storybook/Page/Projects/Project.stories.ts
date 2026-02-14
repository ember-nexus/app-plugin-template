import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

type CustomArgs = { elementId: string };

const meta: Meta<CustomArgs> = {
  title: 'Page/Projects',
  component: 'ember-nexus-template-page-project',
  tags: ['page'],
  parameters: {
    layout: 'fullscreen'
  },
  render: ({elementId}) => html`
    <ember-nexus-template-page-project
      element-id="${elementId}"
    >
    </ember-nexus-template-page-project>
  `,
};

export default meta;
type Story = StoryObj;

export const Project: Story = {
  args: {
    elementId: '06d2038d-497c-4bc1-b9f2-f18b5aa57ea0',
  }
};
