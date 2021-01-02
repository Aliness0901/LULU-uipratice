import React, { Component } from 'react';
import { NavLink,withRouter } from 'react-router-dom'

import Input from '../components/Input'

import { loginCheck } from '../components/loginCheck'

import './Login.css'


export let userToken={
    userID:'',
    key:''
};

class Login extends Component {
    state = {
        email: 'i@bigfish.com',
        password: 'Ab123456',
    }

    loginEmailControl = (e) => {
        this.setState({
            email: e.target.value           
        })
    }

    LoginPasswordControl = (e) => {
        let event = e.target.value
        this.setState({
            password: event
        })
    }

    loginSuccess = () => {
        this.setState({
            checked: true
        })
        localStorage.userID=userToken.userID        
        localStorage.userKey=userToken.key
        this.props.history.push('/mainPage')      
    }

    loginFail = () => {
        this.props.loginErrorFunc('Email or password is wrong');            
        this.setState({
            checked: false
        })
        console.log('fail调用了');
    }

    loginCheck = () => {
        this.props.loadingShow();
        let email = this.state.email
        let password = this.state.password
        loginCheck( email, password, this.loginSuccess, this.loginFail)
        this.setState({
            email: '',                          
            password: ''                        
        })
    }

    render() {
        return (
            <div className='Login_Sign_container'>
                <Input type='text' value={this.state.email} ref={Input => this.emailbox = Input} className='email_container input' ph='Email' onChange={this.loginEmailControl} />
                <Input type='password' value={this.state.password} ref={Input => this.passwordbox = Input} className='pssw_container input' ph='Password' onChange={this.LoginPasswordControl} />
                <button onClick={this.loginCheck} className='Login_Sign_button'>Login</button>
                <footer className='Login_Sign_footer'>Don't have an account? <NavLink to='/signup' style={{color:'#ED5736'}}>SignUp</NavLink></footer>
            </div>

        );
    }
}

export default withRouter(Login);       



