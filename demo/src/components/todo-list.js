import ReduxComponent from '../../../src/redux-component'
import TodoComponent from './todo'

export default class TodoListComponent extends ReduxComponent {
  constructor(store) {
    super(store, ['todos'])
    this.todosNode = document.getElementById('todos')
  }

  render() {
    console.log('renderTodos')
    console.log(this.state.todos)
    this.todosNode.innerHTML = ''
    this.state.todos.forEach((todo) => {
      const todoComponent = new TodoComponent(this.store, todo)
      this.todosNode.appendChild(todoComponent.getNode())
    });
  }
}
