import test from 'ava'
import React from 'react'
import { shallow, mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { statesman, connect } from '../src/index'

configure({ adapter: new Adapter() })
statesman.createStore({ title: 'Hello World' })

test('Improper connection to store', t => t.throws(() => connect()))

const Foo = ({ title }) => (
  <div>
    <h1>{title || 'Bar'}</h1>
  </div>
)

const Connected = connect(Foo, ['title'])
const wrapper = shallow(<Connected outsideProp="Voila" />)

test.serial('Wrapped component has props', (t) => {
  t.is(typeof wrapper.props().dispatch, 'function')
  t.is(wrapper.props().outsideProp, 'Voila')
  t.deepEqual(wrapper.state(), { title: 'Hello World' })
})

test.serial('dispatch', (t) => {
  wrapper.props().dispatch({ title: 'Byebye World' })
  t.deepEqual(wrapper.state(), { title: 'Byebye World' })
})
