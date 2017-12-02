import React, { PureComponent } from 'react'
import statesman from './statesman'


const connect = (WrappedComponent, requestedProps) => class extends PureComponent {
  state = statesman.getStore(requestedProps)

  componentDidMount = () => statesman.subscribe(this, requestedProps)

  componentWillUnmount = () => statesman.unsubscribe(this)

  action = props => statesman.dispatch(props)

  render = () => <WrappedComponent {...this.props} {...this.state} dispatch={this.action} />
}

export default connect
