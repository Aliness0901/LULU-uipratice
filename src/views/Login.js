import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

import Input from '../components/Input'
import { Login_Check } from '../components/Login_checkFunc'

import './Login.css'

class Login extends Component {
    state = {
        email: '',
        passowrd: '',
        checked: null
    }

    Login_email_Control = (e) => {
        this.setState({
            email: e.target.value            //这里可以直接写
        })
    }

    Login_password_Control = (e) => {
        let event = e.target.value
        this.setState({
            passowrd: event
        })
    }

    Login_success = () => {
        this.setState({
            checked: true
        })
        window.open('http://localhost:3000/mainpage', '_self')
    }

    Login_fail = () => {
        this.setState({
            checked: false
        })
    }

    Login_check = () => {
        let email = this.state.email
        let password = this.state.passowrd
        // this.passwordbox.value=''               //为什么这里的清不了
        // this.emailbox.value=''
        Login_Check('https://bigfish-aliness.herokuapp.com/user_tokens', email, password, this.Login_success, this.Login_fail)
        this.setState({
            email: '',
            passowrd: ''
        })
    }

    render() {
        return (

                <div className='Login_Sign_container'>
                    <Input type='text' ref={Input => this.emailbox = Input} className='email_container input' ph='Email' onChange={this.Login_email_Control} />
                    <Input type='text' ref={Input => this.passwordbox = Input} className='pssw_container input' ph='Password' onChange={this.Login_password_Control} />
                    <button onClick={this.Login_check} className='Login_Sign_button'>Login</button>
                    <footer className='Login_Sign_footer'>Don't have an account?<NavLink to='/signup'>SignUp</NavLink></footer>
                </div>
            
        );
    }
}

export default Login;