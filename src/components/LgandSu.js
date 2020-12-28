import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import Login from '../views/Login'
import Signup from '../views/Signup'


import './LgandSu.css'


class LgandSu extends Component {
    state = {
        login_error_box: 'none',
        error_message:''
    }

    loginErrorFunc = (message) => {
        this.setState({
            login_error_box: 'flex',
            error_message:message
            // 如果css里用的是flex，就不要用block去显示了，flex也是一样的
        })
        console.log('父类已传方程已调用');
    }

    cancleButtonHandle=()=>{
        this.setState({
            login_error_box:'none'
        })
    }

    render() {
        return (
            <div className='container'>
                <div className='login'>
                    <header className='login_header'>BIG FISH</header>
                    <Switch>
                        <Route path='/signup' render={()=><Signup loginErrorFunc={this.loginErrorFunc} />} />
                        {/* 这里涉及到了如何给route中的子组件传props的问题 */}
                        {/* 因为我们需要全屏变灰，所以需要在父组件中改变state，来写div */}
                        {/* 判断是否改变的条件是通过子组件login中的fail函数来调用的 */}
                        {/* 也就是我们一直说的把父类的props传给子组件，然后用方程来改变父类的state */}
                        {/* 现在的问题是传不进去，因为这里是个route */}
                        {/* 这里已经解决，通过route里面自带的render来编写一个类似.map的渲染，只不过我们不是createelement，而是route更推荐的render */}
                        <Route path='/' render={()=><Login loginErrorFunc={this.loginErrorFunc} />} />
                    </Switch>
                </div>
                {/* 因为react是从上往下渲染的，所以如果想要覆盖整个页面的话，就需要把这个div放在最下面 */}
                <div className='error_login_container' style={{display:this.state.login_error_box}}>
                    <div className='error_login_info'>
                        {this.state.error_message}
                        <div  className='cancel_button' onClick={this.cancleButtonHandle}></div>
                        {/* 如果是自己写的组件，只要css被引入到原组件中，只要在另一个组件中引入js文件，会把css也一起引入进去，这个是必然的 */}
                    </div>
                </div>
            </div>
        );
    }
}

export default LgandSu;