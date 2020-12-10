import React, { Component } from 'react';
import{NavLink} from 'react-router-dom'

import Input from'../components/Input'

class Signup extends Component {

    state={
        email_checked:'block',                  //为了css的布局，如果block的话，就会弹一下高度
        email_text_error:'',            //所以索性就改了让里面没有文字，并且那个框是一直留在那里的
        email_botoom_color:'none',      //但是组件依然是可以更改显示状态的
        password_checked:'block',
        password_text_error:'',
        password_bottom_color:'none'
    }

CheckEmail=(e)=>{
    const emailCheck=/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
    if (e.target.value.match(emailCheck)) {
      this.setState({
          email_checked:'none',
      })
    }else if(e.target.value==='') {          //这种的话就是刚刚刷新出页面的时候是不会显示的，除非你打完了然后删除会有
        this.setState({
            email_checked:'block',
            email_text_error:'required',
            email_botoom_color:'red'
        })
    }else {
        this.setState({
            email_checked:'block',
            email_text_error:'error email',
            email_botoom_color:'red'
        })
    }
}
CheckPassword=(e)=>{
    const emailCheck=/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
    if (e.target.value.match(emailCheck)) {         //这里的正则表达式还没有写
      this.setState({
          password_checked:'none',
      })
    }else if(e.target.value==='') {          
        this.setState({
            passwordd_checked:'block',
            password_text_error:'required',
            password_botoom_color:'red'
        })
    }else {
        this.setState({
            password_checked:'block',
            password_text_error:'error email',
            password_botoom_color:'red'
        })
    }
}

    render() {
        return (
            <div className='Login_Sign_container'>
                    <Input className='email_container input' type='text' ph='Email' onChange={this.CheckEmail} checked={this.state.email_checked} errortext={this.state.email_text_error} buttomcolor={this.state.email_botoom_color}/>
                    <Input type='text' className='pssw_container input' ph='Password' onChange={this.CheckPassword} checked={this.state.password_checked} errortext={this.state.password_text_error} buttomcolor={this.state.password_botoom_color} />
                    <Input type='text' className='name_container input' ph='Name' />
                    <button className='Login_Sign_button'>Signup</button>
                    <footer className='Login_Sign_footer'>Already have an account?<NavLink to='/'>Login</NavLink></footer>
            </div>
        );
    }
}

export default Signup;  