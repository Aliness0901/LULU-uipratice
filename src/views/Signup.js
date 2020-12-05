import React, { Component } from 'react';
import{NavLink} from 'react-router-dom'

import Input from'../components/Input'

class Signup extends Component {

    render() {
        return (
            <div className='Login_Sign_container'>
                    <Input className='email_container input' type='text' placeholder='Email'/>
                    <Input type='text' className='pssw_container input' placeholder='Password' />
                    <Input type='text' className='name_container input' placeholder='Name' />
                    <button className='Login_Sign_button'>Signup</button>
                    <footer className='Login_Sign_footer'>Already have an account?<NavLink to='/'>Login</NavLink></footer>
            </div>
        );
    }
}

export default Signup;  