import React, { Component } from 'react';
import { NavLink,withRouter } from 'react-router-dom'

import Input from '../components/Input'
import {Login_Check } from '../components/Login_checkFunc'
// import {getuserInfo} from '../components/GetUserInfo'        //返回的id在验证的时候就返回了，不是我们去获取了才有的
//获取是需要通过id和key去获取该用户的详细信息的

import './Login.css'


export let user_token={
    user_id:'',
    key:''
};
// 首先在这里，我们并不能像鹿鹿在给我们的例子中这样去写一个全局变量，因为这里面涉及到了值传递和引用传递的问题
//undefined本身就是一个值，和num是一个类型，如果我们用let user_id；这样去做全局变量的话，传过去的就是一个undefined，而不是我们的变量名
//也就是说在js内部，变量名都是引用的一个地址，而这个地址则是保存着什么东西的， 如果我们的userid引用的是undefined的值的话
//那么传过去的就是undefined的引用地址，并不是我们这个变量名，并不能告诉js说我要改变这个变量名的引用地址，把这个全局的变量名的引用指向另一个num
//所以此时的系统就会报错说userid被赋值了，但是从来没有使用过，因为此时的userid已经不是我们的全局变量的userid了，而是另一个全新的变量名，指向的是
//我们赋值给它的fetch返回的userid，所以在js看来，这两个userid是完全不一样的东西

//如果此时我们用了obj的方式去写的话，那么这个地址的引用就会引用到这里去，即使js再创一个变量名去指向这个地址，那么这个地址保存着的还是
//我们写的这个usertoken的对象，因为在这个引用地址上，我们是可以用.user_id来更改里面的数据的

class Login extends Component {
    state = {
        email: 'i@bigfish.com',
        passowrd: 'Ab123456',
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
        localStorage.user_id=user_token.user_id         //讲道理我们不需要拿一个全局变量去接收了，直接在fetch里赋给全局变量就行了
        localStorage.userkey=user_token.key
        // getuserInfo(user_id,key);                    //这里我们就只是把它log出来看一下，这个用户信息到底包含了什么
        // console.log('以下是用户信息'+user_token.user_id);  //这里log出来是undefined，此时的id还没有被附上，看是不是锁帧的问题
        //这里不是锁帧的问题，是本身在这个函数中，success是执行在赋值之前的，所以此时打印的话，当然是undefined
        //另外如果在这里使用setstate的话，需要注意，必须是等所有的数据都获取完毕了，可以set，不然先跳转在set会有问题
        this.props.history.push('/MainPage')        //这里如果我们没有引入withRouter这个高阶组件的话，是没有办法使用的，因为这个组件中本身并没有history这个props
    }

    Login_fail = () => {
        this.props.loginErrorFunc('Email or password is wrong');            //利用父组件给子组件的方程，来改变父组件的state，从而让父组件的错误提示显示出来
        this.setState({
            checked: false
        })
        console.log('fail调用了');
    }

    Login_check = () => {
        let email = this.state.email
        let password = this.state.passowrd
        Login_Check( email, password, this.Login_success, this.Login_fail)
        this.setState({
            email: '',                          //通过如果是受控组件的话，我们的value就是在label里加value=state的
            passowrd: ''                        //再加上onchange的话，就可以形成联动combo
        })
    }

    render() {
        return (
            <div className='Login_Sign_container'>
                <Input type='text' value={this.state.email} ref={Input => this.emailbox = Input} className='email_container input' ph='Email' onChange={this.Login_email_Control} />
                <Input type='text' value={this.state.passowrd} ref={Input => this.passwordbox = Input} className='pssw_container input' ph='Password' onChange={this.Login_password_Control} />
                <button onClick={this.Login_check} className='Login_Sign_button'>Login</button>
                <footer className='Login_Sign_footer'>Don't have an account?<NavLink to='/signup'>SignUp</NavLink></footer>
            </div>

        );
    }
}

export default withRouter(Login);       //然后这里导出的话就需要用这个withRouter(Login)来套一层container


//*****************遗留问题********************* */
//这里还缺少一个路由守卫来判断是否需要跳转，在方程中加跳转已经无法实现了，不能传用户的数据过去
//同时这里有一个bug，就是如果点击跳转了之后，由于服务器需要时间去获取用户信息，在mainpage中就不能很快的拿到数据

//关于如何处理获得用户数据的延迟的，我们除了用await这种东西以外，还有一个简单的方法，就是在方程里面添加callback的函数中
//实现路由的跳转，但是光路由的话，是跳转不了的，所以有了需要用withRouter这个高阶组件来给我们的组件套一个history的props
//我们组件本身是没有任何关于history props的，如果想要添加，父类中我们并没有写，我们也不知道该怎么写
//所以在router中，写好了这么一个关于props的东西，我们需要做的，就是给我们的组件套一个伪父类，container，来使用他们写好的props来
//实现我们想要实现的内容

//然后关于路由守卫，现在目前不需要这个东西，在callback的方程中判断使用就行

//另外需要注意的是，在status中，response本身是一个对象，里面有很多内容，如果我们想要知道是否成功，.ok或者是.status来判断
//response本身里面会包含很多东西，所以判断的时候，不要就直接用response来判断

//********************遗留问题2***************************** */
//如何实现记住密码？local storage可以实现

