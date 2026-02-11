import { DecoratorHelpers } from '@storybook/addon-themes';
import type { DecoratorFunction, Renderer } from 'storybook/internal/types';
import {useEffect} from 'storybook/preview-api';

const { initializeThemeState, pluckThemeFromContext } = DecoratorHelpers;

export const withTheme = <TRenderer extends Renderer = any>({ themes, defaultTheme, _themeService }): DecoratorFunction<TRenderer> => {
  initializeThemeState(Object.keys(themes), defaultTheme);

  return (story, context) => {
    const selected = pluckThemeFromContext(context);
    const { themeOverride } = context.parameters.themes ?? {};

    useEffect(() => {
      const themeKey = themeOverride || selected || defaultTheme;

      document.body.setAttribute('data-theme', themeKey);
      //themeService.applyTheme(themeKey);
    }, [themeOverride, selected]);

    return story();
  };
};
