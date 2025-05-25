import { Service } from '../lib/Service';

export class TodosService extends Service {
  constructor(services) {
    super(services);
  }

  async removeTodoById(todoId) {
    this.DataStoreService.removeByValue('todos', 'id', todoId);
  }

  async addTodo(todo) {
    const todos = this.DataStoreService.get('todos');
    todo.id = todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1;
    todo.done = false;

    this.DataStoreService.add('todos', todo);
  }

  async markTodoAsDone(todoId) {
    const todos = this.DataStoreService.get('todos');
    const todo = todos.find(t => t.id === todoId);
   
    if (todo) {
      todo.done = true;
      this.DataStoreService.set('todos', todos);
    }
  }

  async fetchTodos() {
    try {
      const response = await fetch('/data.json')
      const { data } = await response.json();
      
      this.DataStoreService.set('todos', data);
    } catch (error) {
      console.error('Error initializing TodosService:', error);
    }
  }
}
