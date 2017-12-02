import test from 'ava'
import { statesman } from '../src/index'


test.serial('Store un-initialized', t => {
  t.throws(() => statesman.getStore())
})

test.serial('Create store with default props', t => {
  statesman.createStore({ a: 1 })
  t.truthy(statesman.store)
  t.truthy(statesman.listeners)
  t.is(statesman.store.length, 1)
  t.is(statesman.getStore().a, 1)
})

test.serial('Props in store are readonly', t => {
  t.throws(() => { statesman.getStore().a = 3 })
})

test.serial('Store dispatch', t => {
  statesman.dispatch({ a: 3 })
  t.deepEqual(statesman.getStore(), { a: 3 })
  const props = { b: 5, c: 7, d: 'hihihaha', e: 0, i: Infinity, g: null, h: 'undefined', j: false }
  statesman.dispatch(props)
  t.deepEqual(statesman.getStore(), Object.assign(props, { a: 3 }))
  t.deepEqual(statesman.store[0], { a: 1 })
})

test.serial('Circular reference parse', t => {
  const somedata = ['a']
  const data = { somekey: somedata }
  statesman.dispatch({ data })
  somedata.push(data)
  statesman.dispatch({ data })
  t.deepEqual(statesman.getStore().data.somekey, somedata)
})

test.serial('Subscription', t => {
  const component = 'a react component'
  const props = ['a', 'e']
  statesman.subscribe(component, props)
  const result = {
    component: 'a react component',
    props: ['a', 'e']
  }
  t.deepEqual(statesman.listeners[0], result)

  const component2 = 'another react component'
  statesman.subscribe(component2)
  const result2 = {
    component: 'another react component',
    props: []
  }
  t.deepEqual(statesman.listeners[1], result2)
})

test.serial('Unsubscribe', t => {
  const component = 'a react component'
  statesman.unsubscribe(component)
  t.deepEqual(statesman.listeners[0].props, [])
})

test.serial('Get specified props', t => {
  t.deepEqual(statesman.getStore(['a', 'd', 'e']), { a: 3, d: 'hihihaha', e: 0 })
})

test.serial('Thenable dispatch', t => statesman.dispatch({ a: 11 }).then(() => {
  const { a } = statesman.getStore(['a'])
  t.is(a, 11)
}))
