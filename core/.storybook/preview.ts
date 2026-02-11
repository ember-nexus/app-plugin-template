import type {Preview} from '@storybook/web-components-vite';
import {withTheme} from "./withTheme.decorator";

import './style.css?style';
import './preview.css?style';

// import {init as appPluginTemplateInit} from '../dist/browser/index.js';
// appPluginTemplateInit();


import {
  init as coreInit,
  optimizeDynamicConfigurations as coreOptimizeDynamicConfigurations,
  initEventListeners
} from "@ember-nexus/app-core";
import {ApiConfiguration, ServiceResolver} from "@ember-nexus/app-core/Service";
import {
  init as pluginInit,
  optimizeDynamicConfigurations as pluginOptimizeDynamicConfigurations
} from "../src";

// export * from "./Router.js";

// import './index.css';

declare global {
  interface Window {
    sr?: ServiceResolver;
  }
}

async function init(){
  const body = document.body;
  const serviceResolver = new ServiceResolver();
  window.sr = serviceResolver;

  console.log('plugin init...');

  await coreInit(serviceResolver);
  await pluginInit(serviceResolver);

  console.log('special core init');

  initEventListeners(body, serviceResolver);
  serviceResolver.getServiceOrFail<ApiConfiguration>(ApiConfiguration.identifier)
    .setApiHost('https://reference-dataset.ember-nexus.dev')
    .setToken('secret-token:1nc1pFdBO2QLYRMMvULgtQ');

  console.log('plugin optimize dynamic configurations...');

  await coreOptimizeDynamicConfigurations(serviceResolver);
  await pluginOptimizeDynamicConfigurations(serviceResolver);

  console.log("init done");
}

init();

const preview: Preview = {
  parameters: {
    controls: {
      disableSaveFromUI: true
    },
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
  },
  decorators: [
    withTheme({
      themes: {
        light: 'light',
        dark: 'dark',
        emerald: 'emerald',
        dim: 'dim',
        wireframe: 'wireframe',
      },
      defaultTheme: 'light',
      _themeService: null
      // themeService: themeService
    })
  ],
};

export default preview;
