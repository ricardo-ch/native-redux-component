const _ = require('lodash')

module.exports = class ReduxComponent {
  constructor(store, renderStateNames = [], stateNames = []) {
    this.state = _.cloneDeep(store.getState())
    this.dispatch = store.dispatch
    store.subscribe(() => {
      const newState = _.cloneDeep(store.getState())
      if (_.isEmpty(stateNames) && _.isEmpty(renderStateNames)) {
        this.preRender(newState)
        return
      }
      _.forEach(stateNames, name => this.preSetState(newState, name))
      if (!_.isEmpty(renderStateNames.filter(name => this.preRender(newState, name)))) this.render()
    })
  }

  preRender(newState, name = null) {
    if (name === null && !_.isEqual(this.state, newState)) {
      this.state = _.cloneDeep(newState)
      this.render()
      return false
    }

    const property = _.head(_.at(this.state, name))
    const newProperty = _.head(_.at(newState, name))

    if (!_.isEqual(property, newProperty)) {
      _.set(this.state, name, newProperty)
      return true
    }
    return false
  }

  preSetState(newState, name) {
    const property = _.head(_.at(this.state, name))
    const newProperty = _.head(_.at(newState, name))

    if (!_.isEqual(property, newProperty)) {
      _.set(this.state, name, newProperty)
    }
  }

  /* eslint class-methods-use-this:off */
  render() {
    console.log('base component render() method must be overrided')
  }

  /**
  * Setup change events listeners
  * @param {string} selector The id of the element
  * @param {Function} actionCreator Redux action creator
  */
  initOnChangeEvent(selector, actionCreator, validate = (value) => { return value }) {
    const items = document.querySelectorAll(selector)
    for (let i = 0; i < items.length; i += 1) {
      items[i].addEventListener('change', (event) => {
        event.preventDefault()
        const value = validate(event.target.value)
        if (value) {
          this.dispatch(actionCreator(value))
        }
      })
    }
  }
}
