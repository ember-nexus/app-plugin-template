import type {Preview} from '@storybook/web-components-vite';

import './style.css?style';
import './preview.css?style';

import {init as appPluginTemplateInit} from '../dist/browser/index.js';
appPluginTemplateInit();

const preview: Preview = {
  parameters: {
    options: {
      storySort: (a, b) => {
        const parse = (item) => {
          const [path, story] = item.id.split('--');
          const parts = path.split('-');
          const parent = parts[parts.length - 1];
          return { parent, story };
        };

        const A = parse(a);
        const B = parse(b);

        const aIsParentStory = A.story === A.parent;
        const bIsParentStory = B.story === B.parent;

        // Parent-named story always comes first at its level
        if (aIsParentStory && !bIsParentStory) return -1;
        if (bIsParentStory && !aIsParentStory) return 1;

        return a.id === b.id ? 0 : a.id.localeCompare(b.id, undefined, { numeric: true });
      }
    },
    layout: 'centered',
  }
};

export default preview;
