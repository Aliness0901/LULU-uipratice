import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import GetAnswer from '../components/GetAnswer'
import getuserInfo from '../components/GetUserInfo'
import PostAnswer from '../components/PostAnswer'
import LikeTriButton from '../components/LikeTriButton'
import AnswerButton from '../components/AnswerButton'

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
            answersAndUsersMatch: false,
            useranswer_box: 'none',
            useranswerContent: '',
            answerBtnAva: true,
            PostSuccess: false,
            answerBtnStyle: {
                cursor: 'not-allowed',
                backgroundColor: 'silver',
                color: 'white'
            },
            Array1: [],
            returnArray: [],
            liked:''
        }
    }

    SuccessAnswer = (e) => {                         //利用组件来监控answer是否有内容，如果有则开启开关，没有就关闭开关，执行另一套方案
        this.setState({
            answerdataRev: true,                     //确认已经异步完成了之后，页面再次刷新
            Array1: [...this.state.Array1, e]
        })
        //answers.userinfo = {}         //这里如果不刷新的话，后面拿取的时候就会对不上if，一定要刷新
        //可以不要在页面渲染的时候清空，在fetch阶段清空更简单
    }

    FailAnswer = () => {
        this.setState({
            answerdataRev: false
        })
    }

    GetAnswerUserInfo = (e) => {
        this.setState({
            answers_user: true,
            returnArray: [...this.state.returnArray, e]                     //把所有的id都拿到state中
        })
        let egarry = this.state.returnArray;
        let returnArray = [];
        for (let index = 0; index < egarry.length; index++) {               //在每拿一次用户id的时候就去查询排序一次
            returnArray.push(this.state.Array1.indexOf(egarry[index]))      
            returnArray.sort((a, b) => (a > b))
            if (returnArray[0] >= 0 && index===this.state.Array1.length-1) {    //每次排序结束之后，确认是不是已经拿完全部数据了，fetch后端还有没有没有返回的        
                this.setState({                             //这里必须放到for里面，拿出来的话就不知道组件中的for是否跟fetch中的for循环次数一样了
                    answersAndUsersMatch:true
                })
            }
        }

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

    UserAnswerboxShow = () => {
        if (this.state.useranswer_box === 'none') {
            this.setState({
                useranswer_box: 'block'
            })
        } else {
            this.setState({
                useranswer_box: 'none'
            })
        }

    }

    UserAnswerContent = (e) => {
        if (e.target.value !== '') {                          //这边还可以加一个判断输入字符多少的判断，以免出现后端错误
            this.setState({
                useranswerContent: e.target.value,
                answerBtnAva: false,
                answerBtnStyle: {
                    backgroundColor: '#ED5736',
                    cursor: 'pointer',
                    color: 'black'
                }
            });                                 //就算这里加了callback来log，发现还是是上一帧的东西,如果想要拿这一帧的东西，必须是箭头函数才行           
        } else {
            this.setState({
                answerBtnAva: true,
                answerBtnStyle: {
                    backgroundColor: 'silver',
                    cursor: 'not-allowed',
                    color: 'white'
                }
            })
        }
    }

    PostSuccess = () => {
        this.setState({
            PostSuccess: true
        })
        GetAnswer(this.props.location.id, this.SuccessAnswer, this.FailAnswer, this.GetAnswerUserInfo)
    }

    UserPostNewAnswer = () => {
        console.log(this.state.useranswerContent);           //准确
        PostAnswer(this.props.location.id, this.state.useranswerContent, this.PostSuccess);
        this.setState({
            useranswer_box: 'none'
        })
    }

    UserInfoMatch = () => {
        this.setState({
            answersAndUsersMatch: true
        })
    }

    componentDidMount = () => {
        GetAnswer(this.props.location.id, this.SuccessAnswer, this.FailAnswer, this.GetAnswerUserInfo, this.UserInfoMatch)           //利用上一个页面跳转过来的问题，提取answer
        getuserInfo(localStorage.user_id, localStorage.userkey, this.SucessgetUser, 'mainuser');
        //这里有一个问题，就是只要我删掉了fetch里面的id这些参数，就给我报错，说sucess不是一个函数
    }

    render() {
        return (
            <div className='mainpage_core'>
                <AnswerButton onClick={this.UserAnswerboxShow} />
                <header className='mainHeader'>
                    <NavLink to='mainpage' className='BigFish'>BIG FISH</NavLink>
                    <NavLink to={{ pathname: '/profile', type: 'mainuser' }} className='userpic' style={{ backgroundImage: `url(${this.state.user_pic})` }} />
                </header>
                <div className='afterheader_body2'>
                    <div className='repeat_title'>
                        <h3 className='Rquestion_title'>{this.props.location.title}</h3>
                        <div className='Rquestion_content'>{this.props.location.content}</div>
                    </div>
                    {/* 早知道就所有的头部都写一个组件了，这样就省得再这里一遍又一遍重复了 */}
                    <div className='user_can_answerbox_container' style={{ display: this.state.useranswer_box }}>
                        <textarea className='user_can_answertextarea' onChange={this.UserAnswerContent} />
                        <button className='answer_button' onClick={this.UserPostNewAnswer} style={this.state.answerBtnStyle}>Answer</button>
                    </div>

                    <div className='answers_body'>
                        {                   //这里是立即执行函数
                            (
                                () => {
                                    var userinfoLength = Object.keys(answers.userinfo).length;
                                    if (this.state.answersAndUsersMatch && userinfoLength !== 0) {               //这里的e就是answer拿出来的东西，所以404的时候answer里面是空，所以e就是空
                                        return (
                                            answers.answer.map((e) => {
                                                return (
                                                    <div className='each_answer' key={e.id}>
                                                        <div className='difuser_title'>
                                                            {/*这里的父盒子display是row，竖着*/}
                                                            <NavLink to={{                  //利用更加清楚的方式传递属性
                                                                pathname: '/otheruseInfo',
                                                                type: 'otherusers',
                                                                answerUserID: e.user_id
                                                            }} className='user_pic_ans' style={{ backgroundImage: `url(${answers.userinfo[e.user_id].avatar_url})` }}></NavLink>
                                                            <div className='user_detail'>
                                                                {/*这里的盒子display是column，横着*/}
                                                                <NavLink to={{
                                                                    pathname: '/otheruseInfo',
                                                                    type: 'otherusers',
                                                                    answerUserID: e.user_id
                                                                }}>{answers.userinfo[e.user_id].name}</NavLink>
                                                                <div>{answers.userinfo[e.user_id].created_at}</div>
                                                            </div>
                                                        </div>
                                                        <div className='answer_detail'>{e.content}</div>
                                                        <LikeTriButton type='answers' answerid={e.id} like={e.number_of_likes} liked={e.liked} />
                                                        {console.log(e)}
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
                                        // console.log(userinfoLength);
                                        //这边可以做一个loading的图片，把这里和state中的状态更改成loading为主就行，然后拿回了就更改
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



// console.log(answers.userinfo[data.user.id].id);
//                             let point = answers.userinfo[data.user.id].id;
//                             returnArray.push(Array1.indexOf(point))
//                             // console.log(Array1.indexOf(point));
//                             returnArray.sort((a,b)=>(a-b))
//                             console.log(returnArray);
//                             if (n===Array1.length-1&&returnArray[0]>=0) {
//                                 console.log('调用');
//                                 console.log('此时n'+n);
//                                 console.log('此时数组'+Array1);
//                                 console.log('此时数组2'+returnArray);
//                                 UserInfoMatch();
//                             }

// for (let index = 0; index < answers.answer.length; index++) {
//     Array1.push(answers.answer[index].user_id);
//     console.log(Array1);
// }

