import { GetServiceResolverEvent } from '@ember-nexus/app-core/BrowserEvent';
import { ServiceResolver } from '@ember-nexus/app-core/Service';

import { Constructor, LifecycleCapableWebComponent } from '../Type/Definition/index.js';
import { maxRetryAttempts, retryTimeoutMinMilliseconds, retryTimeoutVariance } from '../Type/index.js';

const delay = (delayInMilliseconds: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, delayInMilliseconds));

async function resolveService(element: HTMLElement): Promise<ServiceResolver> {
  let attempt = 0;
  while (attempt < maxRetryAttempts) {
    const getServiceResolverEvent = new GetServiceResolverEvent();
    element.dispatchEvent(getServiceResolverEvent);
    const serviceResolver = getServiceResolverEvent.getServiceResolver();
    if (serviceResolver !== null) {
      return serviceResolver;
    }

    const timeToWaitInMilliseconds = Math.round(
      (1 << attempt) *
        retryTimeoutMinMilliseconds *
        (Math.random() * 2 * retryTimeoutVariance + 1 - retryTimeoutVariance),
    );
    await delay(timeToWaitInMilliseconds);

    attempt++;
  }

  // logger service can not be used here, as service resolver is not available -> we can not resolve the logger
  throw new Error('Service resolution failed after max retries.');
}

function hasRefreshData(obj: unknown): obj is { refreshData: () => void } {
  return typeof (obj as any).refreshData === 'function';
}

/* eslint @typescript-eslint/no-explicit-any: "off" */
function withServiceResolver(): <TBase extends Constructor<LifecycleCapableWebComponent>>(Base: TBase) => any {
  return function <TBase extends Constructor<LifecycleCapableWebComponent>>(Base: TBase): any {
    return class extends Base {
      serviceResolver: ServiceResolver;

      connectedCallback(): void {
        super.connectedCallback?.();
        resolveService(this).then((serviceResolver: ServiceResolver) => {
          this.serviceResolver = serviceResolver;
          if (hasRefreshData(this)) {
            this.refreshData();
          }
        });
      }
    };
  };
}

export { resolveService, withServiceResolver };
