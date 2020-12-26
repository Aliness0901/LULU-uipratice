import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import GetAnswer from '../components/GetAnswer'
import getuserInfo from '../components/GetUserInfo'
import LikeTriButton from '../components/LikeTriButton'

import { userdatadetail } from '../views/Profile'

import './Answers.css'

export let answers = {
    answer: [],
    userinfo: {}
}

class Answers extends Component {                       //这里有purecomponent和component的对比，如果在purecomponent中，state在即将刷新时没有发生变化，页面是不会再次render的
    constructor(props) {    //但是如果component的话，即使state发生了同样的变化，是同一个值的时候，页面也是会发生变化的
        super(props)

        this.state = {
            answerdataRev: '',                      //判断当前是否提取成功，并且刷新页面
            user_pic: '',
            answers_user: '',
            answersAndUsersMatch: ''
        }
    }

    SuccessAnswer = () => {                         //利用组件来监控answer是否有内容，如果有则开启开关，没有就关闭开关，执行另一套方案
        this.setState({
            answerdataRev: true                     //确认已经异步完成了之后，页面再次刷新
        })
        answers.userinfo = {}         //这里如果不刷新的话，后面拿取的时候就会对不上if，一定要刷新
    }

    FailAnswer = () => {
        this.setState({
            answerdataRev: false
        })
    }

    GetAnswerUserInfo = () => {
        console.log('刷新');
        this.setState({
            answers_user: true
        })
    }

    SucessgetUser = () => {
        this.setState({
            user_pic: userdatadetail.detail.avatar_url
        })
        if (this.state.user_pic !== null) {                       //设置默认头像，在判断赋值过后是否为空之后，赋值我们自己的默认图片
            return
        } else {
            this.setState({
                user_pic: "http://www.hw2jp.com/wp-content/uploads/2019/03/%E6%B5%B7%E8%B4%BC%E7%8E%8B.jpg"
            })
        }
    }


    componentDidMount = () => {
        GetAnswer(this.props.location.id, this.SuccessAnswer, this.FailAnswer, this.GetAnswerUserInfo)           //利用上一个页面跳转过来的问题，提取answer
        getuserInfo(localStorage.user_id, localStorage.userkey, this.SucessgetUser);
    }

    render() {
        return (
            <div className='mainpage_core'>
                <header className='mainHeader'>
                    <NavLink to='mainpage' className='BigFish'>BIG FISH</NavLink>
                    <NavLink to='/profile' className='userpic' style={{ backgroundImage: `url(${this.state.user_pic})` }} />
                </header>
                <div className='afterheader_body2'>
                    <div className='repeat_title'>
                        <h3 className='Rquestion_title'>{this.props.location.title}</h3>
                        <div className='Rquestion_content'>{this.props.location.content}</div>
                    </div>
                    {/* 早知道就所有的头部都写一个组件了，这样就省得再这里一遍又一遍重复了 */}


                    <div className='answers_body'>
                        {                   //这里是立即执行函数
                            (
                                () => {
                                    var userinfoLength = Object.keys(answers.userinfo).length;
                                    var answersLength = Object.keys(answers.answer).length;
                                    if (userinfoLength === answersLength && userinfoLength !== 0) {               //这里的e就是answer拿出来的东西，所以404的时候answer里面是空，所以e就是空
                                        return (
                                            answers.answer.map((e) => {
                                                return (
                                                    console.log('进入渲染if'),
                                                    <div className='each_answer' key={e.id}>
                                                        <div className='difuser_title'>
                                                            {/*这里的父盒子display是row，竖着*/}
                                                            <div className='user_pic_ans' style={{ backgroundImage: `url(${answers.userinfo[e.user_id].avatar_url})` }}></div>
                                                            <div className='user_detail'>
                                                                {/*这里的盒子display是column，横着*/}
                                                                <div>{answers.userinfo[e.user_id].name}</div>
                                                                <div>{answers.userinfo[e.user_id].created_at}</div>
                                                            </div>
                                                        </div>
                                                        <div className='answer_detail'>{this.props.location.content}</div>
                                                        <LikeTriButton like={e.number_of_likes} />
                                                    </div>
                                                )
                                            })
                                        )
                                    } else if (userinfoLength === 0) {
                                        return (
                                            <div key='none'>啊哦，还没有人答题哦</div>
                                        )
                                    }
                                    else {
                                        console.log(userinfoLength);
                                        //这边可以做一个loading的图片
                                        return null                     //这里如果网页崩溃了，就在这里写else的情况
                                    }
                                }
                            )()
                        }
                        {/* ****************************************** */}

                        {/* ******************************************* */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Answers

// {answers.answer.map((e) => {
//     //这里有一个问题就是当我们试图拿取的时候，有可能还没有返回这个数据，所以一定要考虑异步，如果没有拿取的话，这里的东西就是undefined
//     //由于我们每次在fetch里调用success函数的时候，都会再次写入setstate，所以在不是purecomponent的情况下，会帮我们每拿取一次就刷新一次
//     //所以在拿完全部的时候，如果不考虑下面的那个bug的话，就可以在拿取完成后，满足条件之后就再次刷新页面进去if
//     //所以再次证明了fetch中回调函数的重要性，可以帮助我们刷新页面
//     //目前来说，我们的主要刷新页面的手段就是setstate
//         console.log(Object.keys(answers.userinfo).length);
//         console.log(Object.keys(answers.answer).length);
//         //输出结果是0 0 1 ， 也就是说到第三次刷新的时候才接收到



//     //这里其实还是有bug的，就是如果一个人回答了两次，有两个答案都是一个人的，就会出现不匹配的问题，但是这个先放着
//         if (userinfoLength===answersLength&&userinfoLength!==0) {               //这里的e就是answer拿出来的东西，所以404的时候answer里面是空，所以e就是空
//             return (
//                 console.log('进入渲染if'),
//                 <div className='each_answer' key={e.id}>
//                     <div className='difuser_title'>
//                         {/*这里的父盒子display是row，竖着*/}
//                         <div className='user_pic_ans' style={{backgroundImage:`url(${answers.userinfo[e.user_id].avatar_url})`}}></div>
//                         <div className='user_detail'>
//                             {/*这里的盒子display是column，横着*/}
//                             <div>{answers.userinfo[e.user_id].name}</div>
//                             <div>{answers.userinfo[e.user_id].created_at}</div>
//                         </div>
//                     </div>
//                     <div className='answer_detail'>{this.props.location.content}</div>
//                     <LikeTriButton like={e.number_of_likes} />
//                 </div>
//             )
//         }else if (e===[]){
//                 return(
//                     <div key='none'>啊哦，还没有人答题哦</div>
//                 )
//         }
//         else {
//             return null                     //这里如果网页崩溃了，就在这里写else的情况
//         }
//     })}

