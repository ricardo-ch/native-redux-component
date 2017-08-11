
export default class TodoComponent {
  constructor(store, todo) {
    this.store = store
    this.todo = todo
    this.todoNode = document.createElement('div')
    this.todoNode.innerHTML = this.todo.text
  }

  getNode() {
    return this.todoNode
  }
}
