import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Moment from 'moment'

import getAnswer from '../components/getAnswer'
import postAnswer from '../components/postAnswer'
import getOneQuestion from '../components/getOneQuestion'
import LikeTriButton from '../components/LikeTriButton'
import AnswerButton from '../components/AnswerButton'
import Header from '../components/Header'
import LoadingShow from '../components/LoadingShow'
import defaultUserPic from '../assets/images/avatar_default.jpg'



import './Answers.css'

export let answers = {
    answer: [],
    userInfo: {}
}

class Answers extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userPic: '',
            answersAndUsersMatch: false,
            userAnswerBox: 'none',
            userAnswerContent: '',
            answerBtnAva: false,
            questionUserID: [],
            answerUserIndexArray: [],
            liked: '',
            title: '',
            content: '',
            componentRecvProps: this.props.location.search,
            answerBtnStyle: {
                cursor: 'not-allowed',
                backgroundColor: 'silver',
                color: 'white'
            },
            loadingShow: 'none',
            questionID:''
        }
    }

    successAnswer = (e) => {
        this.setState({
            questionUserID: [...this.state.questionUserID, e],
        })
    }

    failAnswer = () => {
    }

    GetAnswerUserInfo = (e) => {
        this.setState({
            answerUserIndexArray: [...this.state.answerUserIndexArray, e],
        })
        let findUserIDIndex = this.state.answerUserIndexArray;
        let answerUserIndexArray = [];
        for (let index = 0; index < findUserIDIndex.length; index++) {
            answerUserIndexArray.push(this.state.questionUserID.indexOf(findUserIDIndex[index]))
            answerUserIndexArray.sort((a, b) => (a > b))
            if (answerUserIndexArray[0] >= 0 && index === this.state.questionUserID.length - 1) {
                this.setState({
                    answersAndUsersMatch: true
                })
            }
        }

    }

    userAnswerBoxShow = () => {
        if (this.state.userAnswerBox === 'none') {
            this.setState({
                userAnswerBox: 'block'
            })
        } else {
            this.setState({
                userAnswerBox: 'none'
            })
        }

    }

    userAnswerContent = (e) => {
        if (e.target.value !== '') {
            this.setState({
                userAnswerContent: e.target.value,
                answerBtnAva: true,
                answerBtnStyle: {
                    backgroundColor: '#ED5736',
                    cursor: 'pointer',
                }
            });
        } else {
            this.setState({
                answerBtnAva: false,
                answerBtnStyle: {
                    backgroundColor: 'silver',
                    cursor: 'not-allowed',
                }
            })
        }
    }

    postSuccess = () => {
        getAnswer(this.state.questionID, this.successAnswer, this.failAnswer, this.GetAnswerUserInfo)
    }

    userPostNewAnswer = () => {
        if (this.state.answerBtnAva) {
            postAnswer(this.state.questionID, this.state.userAnswerContent, this.postSuccess);
            this.setState({
                userAnswerBox: 'none'
            })
        } else {
            return
        }

    }

    getOneQuestionSuccess = (e) => {
        this.setState({
            title: e.title,
            content: e.content,
            loadingShow: 'none'
        })
    }

    componentDidMount = () => {
        let urlParams = this.props.location.search
        let urlArrayParams = urlParams.split('');
        urlArrayParams.shift()
        let params = urlArrayParams.join('')
        this.setState({
            loadingShow: 'flex',
            questionID:params
        })
        getOneQuestion(params, this.getOneQuestionSuccess)
        getAnswer(params, this.successAnswer, this.failAnswer, this.GetAnswerUserInfo)           //利用上一个页面跳转过来的问题，提取answer
    }

    render() {
        return (
            <div className='mainpage_core'>
                <AnswerButton onClick={this.userAnswerBoxShow} />
                <Header />
                <div className='afterheader_body2'>
                    <div className='repeat_title'>
                        <h3 className='Rquestion_title'>{this.state.title}</h3>
                        <div className='Rquestion_content'>{this.state.content}</div>
                    </div>
                    <div className='user_can_answerbox_container' style={{ display: this.state.userAnswerBox }}>
                        <textarea className='user_can_answertextarea' onChange={this.userAnswerContent} placeholder='Text your answer here' />
                        <button className='answer_button' onClick={this.userPostNewAnswer} style={this.state.answerBtnStyle}>Answer</button>
                    </div>

                    <div className='answers_body'>
                        {
                            (
                                () => {
                                    var userinfoLength = Object.keys(answers.userInfo).length;
                                    if (this.state.answersAndUsersMatch && userinfoLength !== 0) {
                                        return (
                                            answers.answer.map((e, index) => {
                                                if (index !== answers.answer.length - 1) {
                                                    return (
                                                        <div className='each_answer' key={e.id}>
                                                            <div className='difuser_title'>
                                                                {/*这里的父盒子display是row，竖着*/}
                                                                <NavLink to={'/otheruseinfo?' + e.user_id} className='user_pic_ans' style={{ backgroundImage: `url(${answers?.userInfo[e.user_id]?.avatar_url?answers.userInfo[e.user_id].avatar_url:defaultUserPic})` }}></NavLink>
                                                                <div className='user_detail'>
                                                                    {/*这里的盒子display是column，横着*/}
                                                                    <NavLink to={'/otheruseinfo?' + e.user_id} className='user_name_ans'>{answers?.userInfo[e.user_id]?.name}</NavLink>
                                                                    <div className='date_ans'>Answered {Moment(e.created_at).format('D MMM YYYY')}</div>
                                                                </div>
                                                            </div>
                                                            <div className='answer_detail'>{e.content}</div>
                                                            <LikeTriButton type='answers' answerid={e.id} like={e.number_of_likes} liked={e.liked} />
                                                        </div>
                                                    )
                                                }else {
                                                    return (
                                                        <div className='each_answer' key={e.id} style={{borderBottomColor:'white'}}>
                                                            <div className='difuser_title'>
                                                                {/*这里的父盒子display是row，竖着*/}
                                                                <NavLink to={'/otheruseinfo?' + e.user_id} className='user_pic_ans' style={{ backgroundImage: `url(${answers?.userInfo[e.user_id]?.avatar_url?answers.userInfo[e.user_id].avatar_url:defaultUserPic})` }}></NavLink>
                                                                <div className='user_detail'>
                                                                    {/*这里的盒子display是column，横着*/}
                                                                    <NavLink to={'/otheruseinfo?' + e.user_id} className='user_name_ans'>{answers?.userInfo[e.user_id]?.name}</NavLink>
                                                                    <div className='date_ans'>Answered {Moment(e.created_at).format('D MMM YYYY')}</div>
                                                                </div>
                                                            </div>
                                                            <div className='answer_detail'>{e.content}</div>
                                                            <LikeTriButton type='answers' answerid={e.id} like={e.number_of_likes} liked={e.liked} />
                                                        </div>
                                                    )
                                                }
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
                                        return null
                                    }
                                }
                            )()
                        }
                    </div>
                </div>
                <LoadingShow style={{ display: this.state.loadingShow }} />
            </div>
        )
    }
}

export default Answers




