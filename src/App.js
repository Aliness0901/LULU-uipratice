import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import MainPage from './views/MainPage'
import Profile from './views/Profile'
import LoginAndSignUp from './components/LoginAndSignUp'
import Answers from './views/Answers'
import OtherUserPro from './views/OtherUserPro'

class App extends Component {
  render() {
    return (
      <div style={{height:'100vh',width:'100vw',position:'relative',display:'flex',flexDirection:'column'}}>
        <Switch>
          <Route path='/mainpage' component={MainPage} />  
          <Route path='/profile' component={Profile}/>
          <Route path='/answers' component={Answers}/>
          <Route path='/otheruseinfo' component={OtherUserPro}/>
          <Route path='/' component={LoginAndSignUp}/>    
        </Switch>
      </div>
    );
  }
}

export default App;
