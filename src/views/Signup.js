import React, { PureComponent } from 'react';
import { NavLink, withRouter } from 'react-router-dom'

import Input from '../components/Input'
import CreatUser from '../components/CreatUser'

class Signup extends PureComponent {

    state = {
        email: '',                            //此处是为了给注册而保存的地方
        password: '',
        name: '',
        email_checked: 'hidden',                  //为了css的布局，如果block的话，就会弹一下高度
        email_text_error: '',            //所以索性就改了让里面没有文字，并且那个框是一直留在那里的
        email_botoom_color: 'grey',      //但是组件依然是可以更改显示状态的
        password_checked: 'hidden',
        password_text_error: '',
        password_bottom_color: 'grey',
        SignBoxStyle: {
            backgroundColor: 'silver',
            cursor: 'not-allowed',
            color: 'white'
        },
        BtnClickable: true
    }

    CheckEmail = (e) => {
        this.setState({
            email: e.target.value
        })
        const emailCheck = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
        if (e.target.value.match(emailCheck)) {
            this.setState({
                email_checked: 'hidden',
                email_botoom_color: 'grey',
            }, ()=>{this.BtnChecked()})

        } else if (e.target.value === '') {          //这种的话就是刚刚刷新出页面的时候是不会显示的，除非你打完了然后删除会有
            this.setState({
                email_checked: 'visible',
                email_text_error: 'required',
                email_botoom_color: 'red'
            },()=>{this.BtnNoChecked()})
        } else {
            this.setState({
                email_checked: 'visible',
                email_text_error: 'error email',
                email_botoom_color: 'red'
            },()=>{this.BtnNoChecked()})
        }
    }
    CheckPassword = (e) => {
        this.setState({
            password: e.target.value
        })
        const emailCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,12}$/
        if (e.target.value.match(emailCheck)) {         //这里的正则表达式还没有写
            this.setState({
                password_checked: 'hidden',
                password_botoom_color: 'grey',
            }, ()=>{this.BtnChecked()})
        } else if (e.target.value === '') {
            this.setState({
                passwordd_checked: 'visible',
                password_text_error: 'required',
                password_botoom_color: 'red'
            },()=>{this.BtnNoChecked()})
        } else {
            this.setState({
                password_checked: 'visible',
                password_text_error: '密码需要大于6位，小于12位且至少有一个大写字母和小写字母',
                password_botoom_color: 'red'
            },()=>{this.BtnNoChecked()})
        }
    }

    controlUsername = (e) => {
        this.setState({
            name: e.target.value
        }, ()=>{this.BtnChecked();this.BtnNoChecked()})
    }


    SignupSuccess = () => {
    }

    GetUserTokenSuccess=()=>{
        this.props.history.push('/MainPage')
    }

    FailGetUserToken=()=>{

    }

    SignupFail = () => {
        this.props.loginErrorFunc('This email has been used');
        console.log('邮件重复');
    }

    SignupClick = () => {
        CreatUser(this.state.email, this.state.password, this.state.name, this.SignupSuccess, this.SignupFail,this.GetUserTokenSuccess,this.FailGetUserToken)
    }

    BtnChecked = () => {
        if (this.state.email_checked === 'hidden' && this.state.password_checked === 'hidden' && this.state.name !== '') {
            this.setState({
                SignBoxStyle: {
                    backgroundColor: '#ED5736',
                    cursor: 'pointer',
                    color: 'black'
                },
                BtnClickable: false
            })
        }
    }

    BtnNoChecked=()=>{
        if (this.state.email_checked !== 'hidden' || this.state.password_checked !== 'hidden' || this.state.name === '') {
            this.setState({
                SignBoxStyle: {
                    backgroundColor: 'silver',
                    cursor: 'not-allowed',
                    color: 'white'
                },
                BtnClickable: true
            })
        }
    }


    render() {

        // console.log(user_token);
        //作为测试，这里的user_token只能显示key，id是undefined
        return (
            <div className='Login_Sign_container'>
                <Input className='email_container input' type='text' ph='Email' onChange={this.CheckEmail} checked={this.state.email_checked} errortext={this.state.email_text_error} buttomcolor={this.state.email_botoom_color} value={this.state.email} />
                <Input type='password' className='pssw_container input' ph='Password' onChange={this.CheckPassword} checked={this.state.password_checked} errortext={this.state.password_text_error} buttomcolor={this.state.password_botoom_color} value={this.state.password} />
                <Input type='text' className='name_container input' ph='Name' onChange={this.controlUsername} value={this.state.name} />
                <button style={this.state.SignBoxStyle} className='Login_Sign_button' disabled={this.state.BtnClickable} onClick={this.SignupClick}>Signup</button>
                <footer className='Login_Sign_footer'>Already have an account? <NavLink to='/'  style={{color:'#ED5736'}}>Login</NavLink></footer>
            </div>
        );
    }
}

export default withRouter(Signup);  