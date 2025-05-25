import { Component } from '../lib/Component';

export class AddTodo extends Component {
  form;

  constructor() {
    super();

    this.subscribeStore('todos', 'data');
  }

  handleFormChange(event) {
    const { name, value } = event.target;

    if (!this.form) {
      this.form = {};
    }

    this.form[name] = value;
  }

  render() {
    return this.createElement(
      'div',
      {},
      [
        this.createElement(
          'h2',
          { class: 'title is-4' },
          ['Dodaj nowe zadanie']
        ),
        this.createElement(
          'input',
          {
            class: 'input mb-4',
            type: 'text',
            placeholder: 'Wpisz tytuł zadania',
            name: 'task',
            onChange: this.handleFormChange,
          },
        ),
        this.createElement(
          'textarea',
          {
            class: 'textarea mb-4',
            placeholder: 'Wpisz opis zadania',
            name: 'description',
            onChange: this.handleFormChange,
          },
        ),
        this.createElement(
          'button',
          {
            class: 'button is-primary is-fullwidth',
            onClick: () => {
              // @TODO: Add validation
              this.services.TodosService.addTodo({ ...this.form })
            }
          },
          ['Dodaj zadanie']
        )
      ]
    )
  }
}
