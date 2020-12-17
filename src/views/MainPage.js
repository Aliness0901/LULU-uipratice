import React, { PureComponent } from 'react'
import {NavLink} from 'react-router-dom'

import AskJumpButton from '../components/AskJumpButton'
// import {user_token} from '../views/Login'
import LikeTriButton from '../components/LikeTriButton'
import GetQustion from '../components/GetQustions'

import './MainPage.css'


class MainPage extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        // console.log(user_token);                //这里有一个bug，如果页面加载完成了，但是数据没有获取到
        let Question =GetQustion();
        console.log(Question);
        //这里不清楚是不是跨域的问题，这里接收不到user_token
        return (
            <div>
                <AskJumpButton/>
                <header className='mainHeader'>
                    BIG FISH
                    {/* 把图片用作navlink，装饰背景 */}
                    <NavLink to='/profile' className='userpic'/>           
                </header>
                <body className='afterheader_body'>
                </body>
                <LikeTriButton/>
            </div>
        )
    }
}

export default MainPage

//全局变量的跳转依旧在这里有问题