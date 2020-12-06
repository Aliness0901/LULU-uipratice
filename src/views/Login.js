import React, { Component } from 'react';
import{NavLink} from 'react-router-dom'

import Input from'../components/Input'

import './Login.css'

class Login extends Component {
    state={
        checked:'none',
        errorText:'1111',
        input_bottom_color:'black'
    }

CheckEmail=(e)=>{
    const emailCheck=/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
    if (e.target.value.match(emailCheck)) {
      this.setState({
          checked:'none',
          input_bottom_color:'black'
      })
    }else if(e.target.value==='') {          //这种的话就是刚刚刷新出页面的时候是不会显示的，除非你打完了然后删除会有
        this.setState({
            checked:'block',
            errorText:'required',
            input_bottom_color:'red'
        })
    }else {
        this.setState({
            checked:'block',
            errorText:'error email',
            input_bottom_color:'red'
        })
    }
}

    render() {
        return (
            <div className='Login_Sign_container'>
                <Input type='text' className='email_container input' placeholder='Email' onChange={this.CheckEmail} checked={this.state.checked} errortext={this.state.errorText} buttomcolor={this.state.input_bottom_color}/>
                <Input type='text' className='pssw_container input' placeholder='Password' />
                <button className='Login_Sign_button'>Login</button>
                <footer className='Login_Sign_footer'>Don't have an account?<NavLink to='/signup'>SignUp</NavLink></footer>   
            </div>
        );
    }
}

export default Login;