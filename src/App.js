import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import MainPage from './pages/MainPage'
import Profile from './pages/Profile'
import LoginAndSignUp from './components/LoginAndSignUp'
import Answers from './pages/Answers'
import OtherUserPro from './pages/OtherUserPro'

class App extends Component {
  render() {
    return (
      <div style={{height:'100vh',width:'100vw',position:'relative',display:'flex',flexDirection:'column'}}>
        <Switch>
          <Route path='/mainpage' component={MainPage} />  
          <Route path='/profile' component={Profile}/>
          <Route path='/answers' component={Answers}/>
          <Route path='/otheruseinfo' component={OtherUserPro}/>
          <Route exact path='/' component={LoginAndSignUp}/>    
        </Switch>
      </div>
    );
  }
}

export default App;
