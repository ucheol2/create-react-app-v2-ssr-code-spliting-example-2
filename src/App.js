import React, { Component } from 'react';
import Loadable from 'react-loadable';
import Loading from './Loading';

const Greeter = Loadable({
  loader: () => import('./Greeter'),
  loading: Loading,
})

const Title = Loadable({
  loader: () => import(`./Title`),
  loading: Loading,
})

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      show: false,
    }
  }

  render() {
    const { show } = this.state;

    return (
      <div>
        <Title/>
        <button onClick={() => this.setState(({show}) => ({show: !show}))}>Toggle</button>
        {show && (
          <Greeter/>
        )}
      </div>
    );
  }
}

export default App;
