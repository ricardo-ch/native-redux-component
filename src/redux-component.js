const _ = require('lodash')

module.exports = class ReduxComponent {
  /**
   * Creates an instance of ReduxComponent.
   *
   * @param {object} store the redux store to listen to
   * @param {string[]} [renderStateNames=[]] list of properties which trigger render method, if empty or no set, render method will be triggered each time the store is updated
   * @param {string[]} [stateNames=[]] list of properties which are set when changed but do not trigger render
   */
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

  /**
   * Pre render step, to check if state (or state's property) changed.
   * If it changed, it will set the new value to the component's state,
   * and trigger render method.
   *
   * @param {object} newState the changed state
   * @param {string} [name=null] optional - the property's name to watch / set
   * @returns true if a property changed else false
   */
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

  /**
   * Set state's property by copying new state's one by its name
   *
   * @param {object} newState the changed state
   * @param {string} name the property's name to set
   */
  preSetState(newState, name) {
    const property = _.head(_.at(this.state, name))
    const newProperty = _.head(_.at(newState, name))

    if (!_.isEqual(property, newProperty)) {
      _.set(this.state, name, newProperty)
    }
  }

  /**
   * Render method to be overridden by child class
   * Triggered when the state (or a listened property of the state) change
   */
  /* eslint class-methods-use-this:off */
  /* eslint no-console:off */
  render() {
    console.log('base component render() method must be overridden')
  }

  /**
  * Setup change events listeners
  *
  * @param {string} selector the dom selector of the element to listen to
  * @param {Function} actionCreator redux action creator
  * @param {Function} [validate=(value) => { return value }] optional function to format/validate the value before dispatch it
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
