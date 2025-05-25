import { Component } from '../lib/Component';
import { AddTodo } from './AddTodo';
import { TaskActions } from './TaskActions';

export class TodosList extends Component {
  constructor(args) {
    super(args);

    this.subscribeStore('todos', 'data');
  }

  getAsyncActions() {
    return [this.fetchData.bind(this)];
  }

  async fetchData() {
    await this.services.TodosService.fetchTodos();
  }

  render() {    
    return this.createElement(
      'main',
      { class: 'container fixed-grid has-2-cols', 'data-testId': 'test-action-list-wrapper' },
      [
        this.createElement(
          'div', 
          { class: 'grid' }, 
          (this.data || []).map(({ task, description, done, id }) => this.createElement(
            'div',
            { class: 'card cell ', 'data-done': done ? 'true' : 'false' },
            [
              this.createElement(
                'div',
                { class: 'card-content' },
                [
                  this.createElement(
                    'div',
                    { class: 'content' },
                    [
                      this.createElement(
                        'h2',
                        { class: 'title is-5' },
                        [task]
                      ),
                      this.createElement(
                        'p',
                        { class: 'description' },
                        [description]
                      )
                    ]
                  )
                ]
              ),
              new TaskActions({
                removeLabel: 'Usuń zadanie', 
                doneLabel: 'Oznacz jako wykonane',
                undoneLabel: 'Oznacz jako niewykonane',
                done: done,
                taskId: id,
              }),
            ]
          ))
        ),
        new AddTodo(),
      ]
    );
  }
}
