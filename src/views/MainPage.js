import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'

import AskJumpButton from '../components/AskJumpButton'
// import {user_token} from '../views/Login'
import LikeTriButton from '../components/LikeTriButton'
import GetQustion from '../components/GetQustions'
import GetAnswer from '../components/GetAnswer'

import './MainPage.css'


export let questionsdata = {
    data: []             //这个data是一定要的，全局变量是questionsdata中data的部分，而questionsdata本身不是全局变量
}           //如果你不写data这个属性的话，js就会随便给你开一个变量，有了这个data才能去使用，也就是说questionsdata相当于一个文件夹名字而已

export let answers={
    answer:[]
}


class MainPage extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            questionsdataRev: false,
            answerdataHas:false
        }
    }

    SuccessGet = () => {
        this.setState({
            questionsdataRev: true                       //尝试利用state来判断接收到数据后刷新页面
        })
    }

    componentDidMount = () => {
        GetQustion(this.SuccessGet);                    //此处应该还有一个没有拿到内容的函数fail
    }

    SuccessAnswer=()=>{                         //利用组件来监控answer是否有内容，如果有则开启开关，没有就关闭开关，执行另一套方案
        this.setState({
            answerdataHas:true
        })
    }

    FailAnswer=()=>{
        this.setState({
            answerdataHas:false
        })
    }

    GetAnswerClick=(e)=>{
        GetAnswer(e.target.id, this.SuccessAnswer,this.FailAnswer)
    }

    render() {
        // console.log(user_token);                    //这里依旧有一个问题，就是只要页面刷新了，user_token就又空了
        //这个刷新不是只react本身的刷新，而是用户点击浏览器的刷新，会丢失这个全局变量的内容
        return (
            <div className='mainpage_core'>
                <AskJumpButton />
                <header className='mainHeader'>
                    BIG FISH
                    {/* 把图片用作navlink，装饰背景 */}
                    <NavLink to='/profile' className='userpic' />
                </header>
                <div className='afterheader_body'>
                    <div className='Qustion_container'>
                    {
                        questionsdata.data.map((e)=> {
                            return (
                                <div className='small_Qustion_container' key={e.id}>
                                    <h4 className='Qustion_title'>{e.title}</h4>
                                    {/* 在这里，由于我们无法直接给getanswerclick传我们想要的参数，只能用event.target来做参数的时候 */}
                                    {/* 我们就需要创建一个属性或者利用react自身dom的属性来存储当前返回的e.id */}
                                    <div className='Qustion_detail' id={e.id} onClick={this.GetAnswerClick}>
                                        {e.content}
                                        {/* {console.log(e.id)} */}
                                        <LikeTriButton like={e.number_of_likes} liked={e.liked} />
                                    </div>
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