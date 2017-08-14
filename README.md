[![npm version](https://badge.fury.io/js/%40ricardo-ch%2Fnative-redux-component.svg)](https://badge.fury.io/js/%40ricardo-ch%2Fnative-redux-component)

# native-redux-component

Want to use redux without using react ? Redux Component is a native implementation of react component which permits to watch your state and trigger `render()` method of your child component whenever it changes.

It also has the ability to render only when parts of the state change.

And cherry on the cake, the code is build with the [universal module definition](https://github.com/umdjs/umd/)

## Features
- Watch all state change and trigger `render()`
- Render only when properties paths change
- Keep up to date for properties paths without rendering

## Install

`npm install @ricardo-ch/native-redux-component`

## Usage

Create a component listening and rendering a specific part of your app:
```javascript
class MyComponent extends ReduxComponent {
  constructor(store) {
    super(store, ['todos'])
  }

  render() {
    // triggered each time 'todos' property of the state change
    ...

    // if needed dispatch a new change
    this.dispatch(myAction(value))
  }
}
```

## Demo

A simple app to create toto tasks has been created in this repository.
To use it, simply open `demo/src/index.html`in your favorite browser.

## License
native-redux-component is licensed under the MIT license. (http://opensource.org/licenses/MIT)
