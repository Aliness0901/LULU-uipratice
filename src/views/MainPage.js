import React, { PureComponent } from 'react'
import {NavLink} from 'react-router-dom'

import AskJumpButton from '../components/AskJumpButton'
import {user_token} from '../views/Login'
import LikeTriButton from '../components/LikeTriButton'
import GetQustion from '../components/GetQustions'

import './MainPage.css'


class MainPage extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    SuccessGet=()=>{
    
    }

    componentDidMount=()=>{
        GetQustion();
    }

    render() {
        console.log(user_token);                    //这里依旧有一个问题，就是只要页面刷新了，user_token就又空了
        //这个刷新不是只react本身的刷新，而是用户点击浏览器的刷新，会丢失这个全局变量的内容
        return (
            <div>
                <AskJumpButton/>
                <header className='mainHeader'>
                    BIG FISH
                    {/* 把图片用作navlink，装饰背景 */}
                    <NavLink to='/profile' className='userpic'/>           
                </header>
                <div className='afterheader_body'>
                </div>
                <LikeTriButton/>
            </div>
        )
    }
}

export default MainPage

//全局变量的跳转依旧在这里有问题