import ReduxComponent from '../../../src/redux-component'
import { addTodo } from '../actions'

export default class AddTodoComponent extends ReduxComponent {
  constructor(store) {
    super(store, ['todos'])
    this.counter = this.state.todos.length
    this.init()
  }

  init() {
    document.getElementById('add-todo').addEventListener('click', () => {
      this.dispatch(addTodo(`todo ${this.counter}`))
    })
  }

  render() {
    this.counter = this.counter + 1
  }
}
