import { GetElementEndpoint } from '@ember-nexus/app-core/Endpoint/Element';
import { ServiceResolver } from '@ember-nexus/app-core/Service';

function init(serviceResolver: ServiceResolver): void {
  // eslint-disable-next-line no-console
  console.log('template plugin: init function called');
  // eslint-disable-next-line no-console
  console.log('service resolver:');
  // eslint-disable-next-line no-console
  console.log(serviceResolver);
  // eslint-disable-next-line no-console
  console.log(serviceResolver?.getService(GetElementEndpoint.identifier));
}

export { init };
