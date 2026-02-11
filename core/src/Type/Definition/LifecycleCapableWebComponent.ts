/* eslint @typescript-eslint/no-explicit-any: "off" */
import { PropertyDeclaration } from '@lit/reactive-element';

interface LifecycleCapableWebComponent extends HTMLElement {
  connectedCallback?(): void;
  disconnectedCallback?(): void;
  requestUpdate?(name?: PropertyKey, oldValue?: unknown, options?: PropertyDeclaration): void;
}

export { LifecycleCapableWebComponent };
