import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import LoadingShow from '../components/LoadingShow'
import Login from '../pages/Login'
import Signup from '../pages/Signup'


import './LoginAndSignUp.css'


class LoginAndSignUp extends Component {
    state = {
        loginErrorBox: 'none',
        errorMessage:'',
        loadingShow:'none'
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

    loadingShow=()=>{
        this.setState({
            loadingShow:'flex'
        })
    }

    loadingClose=()=>{
        this.setState({
            loadingShow:'none'
        })
    }

    render() {
        return (
            <div className='container'>
                <div className='login'>
                    <header className='login_header'>BIG FISH</header>
                    <Switch>
                        <Route path='/signup' render={()=><Signup loginErrorFunc={this.loginErrorFunc} loadingClose={this.loadingClose} loadingShow={this.loadingShow} />} />
                        <Route path='/' render={()=><Login loginErrorFunc={this.loginErrorFunc} loadingClose={this.loadingClose} loadingShow={this.loadingShow} />} />
                    </Switch>
                </div>
                <LoadingShow style={{display:this.state.loadingShow}}/>
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