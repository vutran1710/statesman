[![Build Status](https://travis-ci.org/vutran1710/statesman.svg?branch=master)](https://travis-ci.org/vutran1710/statesman)

# Made-easy Minimal State Management for React App
- Based on the similar idea of Redux
- Less duplicated code
- Easy setup
- No reducers
- No extra-brainloads like map-state-to-props, map-dispatch-to-prop
- No need third-parties/wrappers/binding like Thunk/Saga/React-redux etc
- Great for small-scale app/monolithic app

# Setup

#### Install statesman:
```
$ npm install -S react-statesman
```

#### How to use
In your React app:
##### Create a store at the entry point of the app, and assign some default props if neccessary
```
import App from './App'
import ReactDOM from 'react-dom'
import { statesman } from 'react-statesman'

statesman.createStore({
  prop1: 'awesome',
  prop2: 'not there yet pal!'
}).then(() => ReactDOM.render(<App />, document.getElementById('root')))
```
##### Then in your component, have it connected to store and pick the props you need:
```
import { connect } from 'react-statesman'
const Mycomponent = ({ prop1 }) => <div>{`Yay! it is sooo ${prop1}`}</div>

export default connect(Mycomponent, ['prop1'])
```
##### Props can be changed with default "dispatch" prop applied to all connectd component:
```
const Mycomponent2 = ({ prop2, dispatch }) => (
    <button onClick={() => dispatch({ prop2: 'Good job' })}>
        Click to dispatch!
    </button>
)

export default connect(Mycomponent2, ['prop2'])
```

### Hint:
<span style="color:blue; font-weight:bold">dispatch</span> function returns a **Promise.resolve()**, so it is now ***thenable***


For async-dispatch and nested-props, for the time being you have to manually mix the dispatch function with the promises, because it is my intention to leave things flexible and customizable and, most importantly, unbloated.
