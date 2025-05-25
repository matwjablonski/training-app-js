import { Service } from '../lib/Service';

export class DataStoreService extends Service {
  constructor(services, store = {}) {
    super(services);
    this.store = store;
    this.subscribers = {};
  }

  subscribe(key, callback) {
    if (!this.subscribers[key]) {
      this.subscribers[key] = [];
    }
    this.subscribers[key].push(callback);
  }

  notify(key) {
    const callbacks = this.subscribers[key] || [];

    callbacks.forEach(cb => cb(this.store[key]));
  }

  set(key, value) {
    this.store[key] = value;
    this.notify(key);
  }

  add(key, value) {
    if (!this.store[key]) {
      this.store[key] = [];
    }
    this.store[key].push(value);
    this.notify(key);
  }

  get(key) {
    return this.store[key];
  }

  has(key) {
    return key in this.store;
  }

  remove(key) {
    delete this.store[key];
    this.notify(key);
  }

  removeByValue(key, property, value) {
    if (this.store[key]) {
      this.store[key] = this.store[key].filter(item => item[property] !== value);
      this.notify(key);
    }
  }

  clear() {
    this.store = {};
    Object.keys(this.subscribers).forEach(key => this.notify(key));
  }
}
