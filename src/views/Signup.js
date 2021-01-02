import React, { PureComponent } from 'react';
import { NavLink, withRouter } from 'react-router-dom'

import Input from '../components/Input'
import creatUser from '../components/createUser'

class Signup extends PureComponent {

    state = {
        email: '',                            //此处是为了给注册而保存的地方
        password: '',
        name: '',
        emailChecked: 'hidden',                  //为了css的布局，如果block的话，就会弹一下高度
        emailTextError: '',            //所以索性就改了让里面没有文字，并且那个框是一直留在那里的
        emailBottomColor: 'grey',      //但是组件依然是可以更改显示状态的
        passwordChecked: 'hidden',
        passwordTextError: '',
        passwordBottomColor: 'grey',
        signBoxStyle: {
            backgroundColor: 'silver',
            cursor: 'not-allowed',
            color: 'white'
        },
        BtnClickable: true
    }

    checkEmail = (e) => {
        this.setState({
            email: e.target.value
        })
        const emailCheck = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
        if (e.target.value.match(emailCheck)) {
            this.setState({
                emailChecked: 'hidden',
                emailBottomColor: 'grey',
            }, ()=>{this.bottomChecked()})

        } else if (e.target.value === '') {          //这种的话就是刚刚刷新出页面的时候是不会显示的，除非你打完了然后删除会有
            this.setState({
                emailChecked: 'visible',
                emailTextError: 'required',
                emailBottomColor: 'red'
            },()=>{this.bottomNoChecked()})
        } else {
            this.setState({
                emailChecked: 'visible',
                emailTextError: 'error email',
                emailBottomColor: 'red'
            },()=>{this.bottomNoChecked()})
        }
    }
    checkPassword = (e) => {
        this.setState({
            password: e.target.value
        })
        const emailCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,12}$/
        if (e.target.value.match(emailCheck)) {         //这里的正则表达式还没有写
            this.setState({
                passwordChecked: 'hidden',
                passwordBottomColor: 'grey',
            }, ()=>{this.bottomChecked()})
        } else if (e.target.value === '') {
            this.setState({
                passwordd_checked: 'visible',
                passwordTextError: 'required',
                passwordBottomColor: 'red'
            },()=>{this.bottomNoChecked()})
        } else {
            this.setState({
                passwordChecked: 'visible',
                passwordTextError: '密码需要大于6位，小于12位且至少有一个大写字母和小写字母',
                passwordBottomColor: 'red'
            },()=>{this.bottomNoChecked()})
        }
    }

    controlUsername = (e) => {
        this.setState({
            name: e.target.value
        }, ()=>{this.bottomChecked();this.bottomNoChecked()})
    }


    signupSuccess = () => {
    }

    getUserTokenSuccess=()=>{
        this.props.history.push('/MainPage')
    }

    failGetUserToken=()=>{

    }

    signUpFail = () => {
        this.props.loginErrorFunc('This email has been used');
        console.log('邮件重复');
    }

    signUpClick = () => {
        creatUser(this.state.email, this.state.password, this.state.name, this.signupSuccess, this.signUpFail,this.getUserTokenSuccess,this.failGetUserToken)
    }

    bottomChecked = () => {
        if (this.state.emailChecked === 'hidden' && this.state.passwordChecked === 'hidden' && this.state.name !== '') {
            this.setState({
                signBoxStyle: {
                    backgroundColor: '#ED5736',
                    cursor: 'pointer',
                    color: 'black'
                },
                bottomClickable: false
            })
        }
    }

    bottomNoChecked=()=>{
        if (this.state.emailChecked !== 'hidden' || this.state.passwordChecked !== 'hidden' || this.state.name === '') {
            this.setState({
                signBoxStyle: {
                    backgroundColor: 'silver',
                    cursor: 'not-allowed',
                    color: 'white'
                },
                bottomClickable: true
            })
        }
    }


    render() {
        return (
            <div className='Login_Sign_container'>
                <Input className='email_container input' type='text' ph='Email' onChange={this.checkEmail} checked={this.state.emailChecked} errortext={this.state.emailTextError} buttomcolor={this.state.emailBottomColor} value={this.state.email} />
                <Input type='password' className='pssw_container input' ph='Password' onChange={this.checkPassword} checked={this.state.passwordChecked} errortext={this.state.passwordTextError} buttomcolor={this.state.passwordBottomColor} value={this.state.password} />
                <Input type='text' className='name_container input' ph='Name' onChange={this.controlUsername} value={this.state.name} />
                <button style={this.state.signBoxStyle} className='Login_Sign_button' disabled={this.state.bottomClickable} onClick={this.signUpClick}>Signup</button>
                <footer className='Login_Sign_footer'>Already have an account? <NavLink to='/'  style={{color:'#ED5736'}}>Login</NavLink></footer>
            </div>
        );
    }
}

export default withRouter(Signup);  