import { Component } from '../lib/Component';

export class TaskActions extends Component {
  constructor(args) {
    super(args);

    this.subscribeStore('todos', 'data');
  }

  addAction(action) {
    this.actions.push(action);
  }

  onDone(e) {
    this.component.parentElement.dataset.done = true;
    this.services.TodosService.markTodoAsDone(this.taskId);
    this.onArgChange('done', true);
  }

  onUndone(e) {
    this.component.parentElement.dataset.done = false;
    this.onArgChange('done', false);
  }

  onRemove() {
    this.services.TodosService.removeTodoById(this.taskId);
  }

  render() {
    return this.createElement(
      'div',
      { class: 'card-footer' },
      [
        this.createElement(
          'button', 
          { class: 'card-footer-item', onclick: this.onDone },
          [this.doneLabel]
        ),
        this.createElement(
          'button', 
          { class: 'card-footer-item', onclick: this.onUndone },
          [this.undoneLabel]
        ),
        this.createElement(
          'button', 
          { class: 'card-footer-item', onclick: this.onRemove, disabled: this.done || undefined },
          [this.removeLabel]
        )
      ]
    );
  }
}
