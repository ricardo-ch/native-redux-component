import store from './store'
import AddTodo from './components/add-todo'
import TodoList from './components/todo-list'

const startup = (callback) => {
  if (document.readyState === 'complete') {
    callback()
  } else {
    document.addEventListener('readystatechange', () => {
      if (document.readyState === 'complete') {
        callback()
      }
    })
  }
}

startup(() => {
  new AddTodo(store)
  new TodoList(store)
})
