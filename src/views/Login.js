import React, { Component } from 'react';
import{NavLink} from 'react-router-dom'

import Input from'../components/Input'

import './Login.css'

class Login extends Component {
    state={
        checked:'none'
    }

CheckEmail=(e)=>{
    const emailCheck=/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
    if (e.target.value.match(emailCheck)) {
      this.setState({
          checked:'none'
      })
    }else {
        this.setState({
            checked:'block'
        })
    }
}

    render() {
        return (
            <div className='Login_Sign_container'>
                <Input type='text' className='email_container input' placeholder='Email' onChange={this.CheckEmail} checked={this.state.checked} errortext={'email invalid'}/>
                <Input type='text' className='pssw_container input' placeholder='Password' />
                <button className='Login_Sign_button'>Login</button>
                <footer className='Login_Sign_footer'>Don't have an account?<NavLink to='/signup'>SignUp</NavLink></footer>   
            </div>
        );
    }
}

export default Login;