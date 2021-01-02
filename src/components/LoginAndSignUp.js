import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import Login from '../views/Login'
import Signup from '../views/Signup'


import './LoginAndSignUp.css'


class LoginAndSignUp extends Component {
    state = {
        loginErrorBox: 'none',
        errorMessage:''
    }

    loginErrorFunc = (message) => {
        this.setState({
            loginErrorBox: 'flex',
            errorMessage:message
        })
    }

    cancleButtonHandle=()=>{
        this.setState({
            loginErrorBox:'none'
        })
    }

    render() {
        return (
            <div className='container'>
                <div className='login'>
                    <header className='login_header'>BIG FISH</header>
                    <Switch>
                        <Route path='/signup' render={()=><Signup loginErrorFunc={this.loginErrorFunc} />} />
                        <Route path='/' render={()=><Login loginErrorFunc={this.loginErrorFunc} />} />
                    </Switch>
                </div>
                <div className='error_login_container' style={{display:this.state.loginErrorBox}}>
                    <div className='error_login_info'>
                        {this.state.errorMessage}
                        <div  className='cancel_button' onClick={this.cancleButtonHandle}></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginAndSignUp;