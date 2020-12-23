import React, { PureComponent } from 'react'
import { NavLink ,withRouter} from 'react-router-dom'

import AskJumpButton from '../components/AskJumpButton'
// import {user_token} from '../views/Login'
import LikeTriButton from '../components/LikeTriButton'
import GetQustion from '../components/GetQustions'
import GetAnswer from '../components/GetAnswer'

import './MainPage.css'


export let questionsdata = {
    data: []             //这个data是一定要的，全局变量是questionsdata中data的部分，而questionsdata本身不是全局变量
}           //如果你不写data这个属性的话，js就会随便给你开一个变量，有了这个data才能去使用，也就是说questionsdata相当于一个文件夹名字而已

export let answers = {
    answer: []
}


class MainPage extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            questionsdataRev: false,
            answerdataRev: '',
        }
    }

    SuccessGet = () => {
        this.setState({
            questionsdataRev: true                       //尝试利用state来判断接收到数据后刷新页面
        })
    }

    componentDidMount = () => {
        GetQustion(this.SuccessGet,this.SuccessAnswer,this.FailAnswer);                    //此处应该还有一个没有拿到内容的函数fail
    }

    SuccessAnswer = () => {                         //利用组件来监控answer是否有内容，如果有则开启开关，没有就关闭开关，执行另一套方案
        this.setState({
            answerdataRev: true
        })
        this.props.history.push('/answers')         //因为这里需要异步操作，在用户点击完成之后等待获取完成，所以需要判断一下，不能直接navlink
    }

    FailAnswer = () => {
        this.setState({
            answerdataRev: false
        })
    }

    GetAnswerClick = (e) => {
        GetAnswer(e.target.id,this.SuccessAnswer,this.FailAnswer)
        localStorage.questionid=e.target.id;
    }

    render() {
        //console.log(user_token);                    //这里依旧有一个问题，就是只要页面刷新了，user_token就又空了
        //这个刷新不是只react本身的刷新，而是用户点击浏览器的刷新，会丢失这个全局变量的内容
        //console.log(answers.answer);                //截止到目前，已经全部获取到answer内容了
        //在这里获取全部的answer是不可能的，现在数据小，如果数据大的话，岂不是上来就卡死了？所以应该在用户点击的时候才会获取
        //用户点击刷新之后又或者是页面整个刷新之后，这里的全部变量就空了。涉及到了localstorage的内容，从这里开始补学localstorage
        // console.log('这是local'+localStorage.answers);
        //我们不需要把所有的回答都放到local里面，要放的只是用户点击了哪个id而已
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
                            questionsdata.data.map((e) => {
                                return (
                                    <div className='small_Qustion_container' key={e.id}>
                                        <div className='Qustion_title' id={e.id} onClick={this.GetAnswerClick}>{e.title}</div>
                                        {/* 在这里，由于我们无法直接给getanswerclick传我们想要的参数，只能用event.target来做参数的时候 */}
                                        {/* 我们就需要创建一个属性或者利用react自身dom的属性来存储当前返回的e.id */}
                                        <div className='Qustion_detail'>
                                            {e.content}
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

export default withRouter(MainPage)

//全局变量的跳转依旧在这里有问题