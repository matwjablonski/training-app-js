import { Component } from '../lib/Component';
import { NavItem } from './NavItem';

export class Nav extends Component {
  constructor() {
    super();
  }

  render() {
    return this.createElement(
      'div',
      { class: 'container mb-4' },
      [
        this.createElement('nav', { class: 'navbar'}, [
          this.createElement('div', { class: 'navbar-menu' }, [
            new NavItem({ label: 'Home', href: '#' }),
            new NavItem({ label: 'About', href: '#' }),
            new NavItem({ label: 'Services', href: '#' }),
            new NavItem({ label: 'Contact', href: '#' }),
          ])
        ])
      ]
    );
  }
}
