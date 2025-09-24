import { Component } from '../lib/Component';
import { NavItem } from './NavItem';

export class Nav extends Component {
  constructor() {
    super();
    
    this.handleLogout = this.handleLogout.bind(this);
  }

  afterServicesInjected() {
    // Component is ready after services are injected
  }

  handleLogout() {
    if (confirm('Czy na pewno chcesz się wylogować?')) {
      this.services.AuthService.logout();
      // Reload the page to trigger login form
      window.location.reload();
    }
  }

  render() {
    return this.createElement(
      'div',
      { class: 'container mb-4' },
      [
        this.createElement('nav', { class: 'navbar'}, [
          this.createElement('div', { class: 'navbar-menu' }, [
            this.createElement('div', { class: 'navbar-start' }, [
              new NavItem({ label: '📋 Todo App', href: '#' }),
              new NavItem({ label: 'Home', href: '#' }),
              new NavItem({ label: 'About', href: '#' }),
            ]),
            this.createElement('div', { class: 'navbar-end' }, [
              this.createElement('div', { class: 'navbar-item' }, [
                this.createElement(
                  'button',
                  {
                    class: 'button is-light is-small',
                    onClick: this.handleLogout,
                    title: 'Wyloguj się'
                  },
                  ['🚪 Wyloguj']
                )
              ])
            ])
          ])
        ])
      ]
    );
  }
}
