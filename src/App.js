import React, { Component } from 'react';
import LgandSu from'./components/LgandSu'
// import {NavLink, Route,Switch} from 'react-router-dom'
import TestFetch from './components/TestFetch'
class App extends Component {
  render() {
    return (
      <div className='container'>
        <LgandSu/>
        <TestFetch/>
      </div>
    );
  }
}

export default App;
