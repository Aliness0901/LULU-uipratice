import React, { Component } from 'react';
import LgandSu from './components/LgandSu'
import { Route, Switch } from 'react-router-dom'

import MainPage from './views/MainPage'
import Profile from './views/Profile'

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          {/* 这里我们直接利用switch来定义mainpage的网页路径，然后在login里面用window.open来跳转，如果不是switch的话， 是跳转不出来的，不过有点疑惑，如果不用route的话，会出现什么样的问题 */} 
          <Route path='/mainpage' component={MainPage} />  
          <Route path='/profile' component={Profile}/>
          {/* 在过去，这里可以使用indexrouter来表示首页，但是已经过时了，现在可以path任何的链接，让他们同时显示 */}
          <Route path='/' component={LgandSu} />    
        </Switch>
      </div>
    );
  }
}

export default App;
