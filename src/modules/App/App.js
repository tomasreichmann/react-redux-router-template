import './App.scss';
import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import { DevTools } from '../';

const INITIAL_STATE = Map({
  state: 'uninitialized',
  testCounter: 0,
});

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'INITIALIZE': {
      return state.set('state', 'initialize');
    }
    case 'INCREMENT': {
      return state.update('testCounter', (count)=>(count+1));
    }
    default: {
      return state;
    }
  }
};

const mapStateToProps = state => ({
  state: console.log('state', state) && state.appReducer.get('state'),
  testCounter: state.appReducer.get('testCounter'),
});

const mapActionsToProps = {
  increment: ()=>(
    {
      type: 'INCREMENT'
    }
  ),
  go: (to)=>(
    push(to)
  )
};

@connect(
  mapStateToProps,
  mapActionsToProps,
)
class App extends Component {

  render() {
    const { testCounter, increment, children, go } = this.props;
    console.log('App props', this.props);
    return <div className="App">
      <div className="App-heading App-flex">
        <h2>
          Welcome to <span className="App-react">React</span> State: {testCounter} <br />
          <button onClick={increment} >Increment</button>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <button onClick={ go.bind(this, '/') } >Home</button>
          <button onClick={ go.bind(this, '/about') } >About</button>
        </h2>
      </div>
      {children}
      <DevTools />
    </div>
  }
};

export default App;

export {appReducer};
