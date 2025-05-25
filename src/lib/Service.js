export class Service {
  constructor(services) {
    Object.keys(services).forEach(serviceName => {
      this[serviceName] = services[serviceName];
    });
  }
}
