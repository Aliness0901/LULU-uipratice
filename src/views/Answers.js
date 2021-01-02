import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Moment from 'moment'

import getAnswer from '../components/getAnswer'
import PostAnswer from '../components/PostAnswer'
import LikeTriButton from '../components/LikeTriButton'
import AnswerButton from '../components/AnswerButton'
import Header from '../components/Header'



import './Answers.css'

export let answers = {
    answer: [],
    userInfo: {}
}

class Answers extends Component {                       
    constructor(props) {    
        super(props)

        this.state = {
            answerDataRev: '',                     
            userPic: '',
            answersUser: '',
            answersAndUsersMatch: false,
            userAnswerBox: 'none',
            userAnswerContent: '',
            answerBtnAva: false,
            postSuccess: false,
            answerBtnStyle: {
                cursor: 'not-allowed',
                backgroundColor: 'silver',
                color: 'white'
            },
            questionUserID: [],
            answerUserIndexArray: [],                    
            liked: ''
        }
    }

    successAnswer = (e) => {                        
        this.setState({
            answerDataRev: true,                    
            questionUserID: [...this.state.questionUserID, e]
        })
    }

    failAnswer = () => {
        this.setState({
            answerDataRev: false
        })
    }

    GetAnswerUserInfo = (e) => {
        this.setState({
            answersUser: true,
            answerUserIndexArray: [...this.state.answerUserIndexArray, e]                    
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
                    color: 'black'
                }
            });                                
        } else {
            this.setState({
                answerBtnAva: false,
                answerBtnStyle: {
                    backgroundColor: 'silver',
                    cursor: 'not-allowed',
                    color: 'white'
                }
            })
        }
    }

    postSuccess = () => {
        this.setState({
            postSuccess: true
        })
        getAnswer(this.props.location.id, this.successAnswer, this.failAnswer, this.GetAnswerUserInfo)
    }

    userPostNewAnswer = () => {
        if (this.state.answerBtnAva) {
            PostAnswer(this.props.location.id, this.state.userAnswerContent, this.postSuccess);
            this.setState({
                userAnswerBox: 'none'
            })
        }else {
            return                    
        }

    }


    componentDidMount = () => {
        getAnswer(this.props.location.id, this.successAnswer, this.failAnswer, this.GetAnswerUserInfo)           //利用上一个页面跳转过来的问题，提取answer
    }

    render() {
        return (
            <div className='mainpage_core'>
                <AnswerButton onClick={this.userAnswerBoxShow} />
                <Header />
                <div className='afterheader_body2'>
                    <div className='repeat_title'>
                        <h3 className='Rquestion_title'>{this.props.location.title}</h3>
                        <div className='Rquestion_content'>{this.props.location.content}</div>
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
                                            answers.answer.map((e) => {
                                                return (
                                                    <div className='each_answer' key={e.id}>
                                                        <div className='difuser_title'>
                                                            {/*这里的父盒子display是row，竖着*/}
                                                            <NavLink to={{                 
                                                                pathname: '/otheruseinfo',
                                                                type: 'otherusers',
                                                                answerUserID: e.user_id
                                                            }} className='user_pic_ans' style={{ backgroundImage: `url(${answers.userInfo[e.user_id].avatar_url})` }}></NavLink>
                                                            <div className='user_detail'>
                                                                {/*这里的盒子display是column，横着*/}
                                                                <NavLink className='user_name_ans' to={{
                                                                    pathname: '/otheruseinfo',
                                                                    type: 'otherusers',
                                                                    answerUserID: e.user_id
                                                                }}>{answers.userInfo[e.user_id].name}</NavLink>
                                                                <div className='date_ans'>Answered {Moment(e.created_at).format('D MMM YYYY')}</div>
                                                            </div>
                                                        </div>
                                                        <div className='answer_detail'>{e.content}</div>
                                                        <LikeTriButton type='answers' answerid={e.id} like={e.number_of_likes} liked={e.liked} />
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
                                        return null                     
                                    }
                                }
                            )()
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Answers




