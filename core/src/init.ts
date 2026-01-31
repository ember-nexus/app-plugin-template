import { RouteResolver, ServiceResolver } from '@ember-nexus/app-core/Service';
import {
  pluginInit,
  validatePluginIdentifierFromString,
  validateRouteIdentifierFromString,
} from '@ember-nexus/app-core/Type/Definition';

const init: pluginInit = (serviceResolver: ServiceResolver) => {
  // eslint-disable-next-line no-console
  console.log('app-plugin-template: init start');
  const routeResolver = serviceResolver.getServiceOrFail<RouteResolver>(RouteResolver.identifier);
  routeResolver.addRouteConfiguration({
    guard(): Promise<boolean> {
      return Promise.resolve(true);
    },
    pluginIdentifier: validatePluginIdentifierFromString('ember-nexus-template'),
    priority: 0,
    route: '/',
    routeIdentifier: validateRouteIdentifierFromString('ember-nexus-template-page-index'),
    webComponent: 'ember-nexus-template-page-index',
  });
  // eslint-disable-next-line no-console
  console.log('app-plugin-template: init completed');

  return Promise.resolve();
};

export { init };
