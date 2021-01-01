import React, { Component } from 'react';
import { NavLink,withRouter } from 'react-router-dom'

import Input from '../components/Input'
import { Login_Check } from '../components/Login_checkFunc'

import './Login.css'


export let user_token={
    user_id:'',
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
        localStorage.user_id=user_token.user_id         //讲道理我们不需要拿一个全局变量去接收了，直接在fetch里赋给全局变量就行了
        localStorage.userkey=user_token.key
        // getuserInfo(user_id,key);                    //这里我们就只是把它log出来看一下，这个用户信息到底包含了什么
        // console.log('以下是用户信息'+user_token.user_id);  //这里log出来是undefined，此时的id还没有被附上，看是不是锁帧的问题
        //这里不是锁帧的问题，是本身在这个函数中，success是执行在赋值之前的，所以此时打印的话，当然是undefined
        //另外如果在这里使用setstate的话，需要注意，必须是等所有的数据都获取完毕了，可以set，不然先跳转在set会有问题
        this.props.history.push('/MainPage')        //这里如果我们没有引入withRouter这个高阶组件的话，是没有办法使用的，因为这个组件中本身并没有history这个props
    }

    loginFail = () => {
        this.props.loginErrorFunc('Email or password is wrong');            //利用父组件给子组件的方程，来改变父组件的state，从而让父组件的错误提示显示出来
        this.setState({
            checked: false
        })
        console.log('fail调用了');
    }

    loginCheck = () => {
        let email = this.state.email
        let password = this.state.password
        Login_Check( email, password, this.loginSuccess, this.loginFail)
        this.setState({
            email: '',                          //通过如果是受控组件的话，我们的value就是在label里加value=state的
            password: ''                        //再加上onchange的话，就可以形成联动combo
        })
    }

    render() {
        return (
            <div className='Login_Sign_container'>
                <Input type='text' value={this.state.email} ref={Input => this.emailbox = Input} className='email_container input' ph='Email' onChange={this.loginEmailControl} />
                <Input type='password' value={this.state.password} ref={Input => this.passwordbox = Input} className='pssw_container input' ph='Password' onChange={this.LoginPasswordControl} />
                <button onClick={this.Login_check} className='Login_Sign_button'>Login</button>
                <footer className='Login_Sign_footer'>Don't have an account? <NavLink to='/signup' style={{color:'#ED5736'}}>SignUp</NavLink></footer>
            </div>

        );
    }
}

export default withRouter(Login);       //然后这里导出的话就需要用这个withRouter(Login)来套一层container




