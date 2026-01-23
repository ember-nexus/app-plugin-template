function init(serviceRegistry: unknown): void {
  // eslint-disable-next-line no-console
  console.log('template plugin: init function called');
  // eslint-disable-next-line no-console
  console.log('service registry:');
  // eslint-disable-next-line no-console
  console.log(serviceRegistry);
}

export { init };
