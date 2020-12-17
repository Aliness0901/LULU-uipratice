import React, { PureComponent } from 'react'

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

    render() {
        console.log(user_token);                //这里有一个bug，如果页面加载完成了，但是数据没有获取到
        GetQustion();
        //这里不清楚是不是跨域的问题，这里接收不到user_token
        return (
            <div>
                <header className='mainHeader'>
                    BIG FISH
                    <span className='userpic'/>
                </header>
                <AskJumpButton/>
                <LikeTriButton/>
            </div>
        )
    }
}

export default MainPage

//全局变量的跳转依旧在这里有问题