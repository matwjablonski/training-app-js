import { Component } from './Component';

export const createApp = (container, childComponents = [], appServices = []) => {
  const app = document.createElement('div');
  app.className = 'app';

  const services = {};

  appServices.forEach(Service => {
    if (typeof Service === 'function') {
      const newService = new Service(services);
      services[newService.constructor.name] = newService;
    } else {
      console.warn('Service is not a valid function:', Service);
    }
  });

  Component.prototype.services = services;

  childComponents.forEach(ChildComponent => {
    ChildComponent.prototype.services = services;
    const childComponent = new ChildComponent();
    
    if (childComponent && childComponent.component) {
      if (typeof childComponent.injectServices === 'function') {
        childComponent.injectServices(services);
      }
      app.appendChild(childComponent.component);
    } else {
      console.warn('Component is not valid:', childComponent);
    }
  });

  container.appendChild(app);
  return app;
}
