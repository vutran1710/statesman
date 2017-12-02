import { _deepClone, _pick } from './ginger'

const statesman = {
  createStore: function(defaultProps) {
    if (this.hasOwnProperty('store')) throw 'No re-creating store'
    Object.defineProperties(this, {
      store: { writable: false, value: [] },
      listeners: { writable: false, value: [] }
    })
    if (defaultProps) this.dispatch(defaultProps)

    return Promise.resolve()
  },
  getStore: function(props) {
    if (!this.store) throw 'Store must be created first'
    const latest = this.store.slice(-1)[0]
    if (!latest) return {}
    if (!props) return latest
    return _pick(props)(latest)
  },
  dispatch: function(obj) {
    const lastSet = Object.assign(_deepClone(this.getStore()), obj)
    Object.freeze(lastSet)
    this.store.push(lastSet)
    this.listeners.forEach(({ component, props }) => {
      if (props.some(p => obj.hasOwnProperty(p))) {
        component.setState(this.getStore(props))
      }
    })
    return Promise.resolve()
  },
  subscribe: function(component, props = []) {
    if (this.listeners.find(item => item.component === component)) return
    this.listeners.push({ component, props })
  },
  unsubscribe: function(component) {
    const item = this.listeners.find(item => item.component === component)
    if (!item) return
    const index = this.listeners.findIndex(x => x === item)
    this.listeners.splice(index, 1)
  }
}

export default statesman
