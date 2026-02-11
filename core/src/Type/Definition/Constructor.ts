/* eslint @typescript-eslint/no-explicit-any: "off" */
type Constructor<T = object> = new (...args: any[]) => T;

export { Constructor };
