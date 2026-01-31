import { GetElementEndpoint } from '@ember-nexus/app-core/Endpoint/Element';
import { RouteResolver, ServiceResolver } from '@ember-nexus/app-core/Service';
import {
  validatePluginIdentifierFromString,
  validateRouteIdentifierFromString,
} from '@ember-nexus/app-core/Type/Definition';

function init(serviceResolver: ServiceResolver): void {
  // eslint-disable-next-line no-console
  console.log('template plugin: init function called');
  // eslint-disable-next-line no-console
  console.log('service resolver:');
  // eslint-disable-next-line no-console
  console.log(serviceResolver);
  // eslint-disable-next-line no-console
  console.log(serviceResolver?.getService(GetElementEndpoint.identifier));

  // eslint-disable-next-line no-console
  console.log('configuring routes');
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
  console.log('configuration complete');
}

export { init };
