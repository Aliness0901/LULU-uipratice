import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'

import AskJumpButton from '../components/AskJumpButton'
// import {user_token} from '../views/Login'
import LikeTriButton from '../components/LikeTriButton'
import GetQustion from '../components/GetQustions'

import './MainPage.css'


export let questionsdata = {
    data: []             //这个data是一定要的，全局变量是questionsdata中data的部分，而questionsdata本身不是全局变量
}           //如果你不写data这个属性的话，js就会随便给你开一个变量，有了这个data才能去使用，也就是说questionsdata相当于一个文件夹名字而已




class MainPage extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            questionsdataRev: false
        }
    }

    SuccessGet = () => {
        this.setState({
            questionsdataRev: true                       //尝试利用state来判断接收到数据后刷新页面
        })
    }

    componentDidMount = () => {
        GetQustion(this.SuccessGet);
    }

    render() {
        // console.log(user_token);                    //这里依旧有一个问题，就是只要页面刷新了，user_token就又空了
        //这个刷新不是只react本身的刷新，而是用户点击浏览器的刷新，会丢失这个全局变量的内容
        return (
            <div>
                <AskJumpButton />
                <header className='mainHeader'>
                    BIG FISH
                    {/* 把图片用作navlink，装饰背景 */}
                    <NavLink to='/profile' className='userpic' />
                </header>
                <div className='afterheader_body'>
                    <div className='Qustion_container'>
                    {
                        questionsdata.data.map(function (e) {
                            return (
                                <div className='small_Qustion_container' key={e.id}>
                                    <h4 className='Qustion_title'>{e.title}</h4>
                                    <div className='Qustion_detail'>{e.content}
                                    <LikeTriButton like={e.number_of_likes} liked={e.liked} /></div>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
        )
    }
}

export default MainPage

//全局变量的跳转依旧在这里有问题