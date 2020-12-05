import React, { Component } from 'react';
import{NavLink} from 'react-router-dom'

import Input from'../components/Input'

import './Login.css'

class Login extends Component {
    render() {
        return (
            <div className='Login_Sign_container'>
                <Input type='text' className='email_container input' placeholder='Email'/>
                <Input type='text' className='pssw_container input' placeholder='Password' />
                <button className='Login_Sign_button'>Login</button>
                <footer className='Login_Sign_footer'>Don't have an account?<NavLink to='/signup'>SignUp</NavLink></footer>   
            </div>
        );
    }
}

export default Login;