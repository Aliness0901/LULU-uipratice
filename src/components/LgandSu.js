import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import Login from '../views/Login'
import Signup from '../views/Signup'
import Cancelbutton from './Cancelbutton'

import './LgandSu.css'

class LgandSu extends Component {
    state = {
        login_error_box: 'none'
    }

    loginErrorFunc = () => {
        this.setState({
            login_error_box: 'block'
        })
    }

    render() {
        return (
            <div className='container'>
                <div className='login'>
                    <header className='login_header'>BIG FISH</header>
                    <Switch>
                        <Route path='/signup' component={Signup} />
                        <Route path='/' component={Login} />
                    </Switch>
                </div>
                {/* 因为react是从上往下渲染的，所以如果想要覆盖整个页面的话，就需要把这个div放在最下面 */}
                <div className='error_login_container'>
                    <div className='error_login_info'>
                        Email or Password is Wrong.
                        <Cancelbutton/>
                    </div>
                </div>
            </div>
        );
    }
}

export default LgandSu;