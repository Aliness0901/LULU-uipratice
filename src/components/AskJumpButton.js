import React, { Component } from 'react'
import PostQuestion from './postQuestion'

import Input from './Input'

import './AskJumpButton.css'

class Ask_jump_button extends Component {
    constructor(props) {
        super(props)

        this.state = {
            askCoverDisplay: 'none',
            title: '',
            content: '',
            canClick: false,
            answerBtnStyle: {
                cursor: 'not-allowed',
                backgroundColor: 'silver',
                color: 'white'
            },
        }
    }

    askCoverJump = () => {
        this.setState({
            askCoverDisplay: 'flex',
        })
    }

    askCoverClose = () => {
        this.setState({
            askCoverDisplay: 'none'
        })
    }

    stopPropagation = (e) => {
        e.stopPropagation();            //这里的阻止冒泡的方法和js中一样
    }

    askQuestionSuccess = () => {
        this.props.postfinish();
    }

    questionAsk = () => {
        if (this.state.canClick) {
            this.setState({
                askCoverDisplay: 'none',
                title: '',
                content: '',
            })
            this.props.loadingShow();
            PostQuestion(this.state.title, this.state.content, this.askQuestionSuccess);
            console.log('提交');
        }else{
            return                          //这里可以加一个左右晃动的错误提示效果
        }
    }

    titleOnChanging = (e) => {
        this.setState({
            title: e.target.value
        })
        if (e.target.value !== '' && this.state.content !== '') {                          //这边还可以加一个判断输入字符多少的判断，以免出现后端错误
            this.setState({
                canClick: true,
                answerBtnStyle: {
                    backgroundColor: '#ED5736',
                    cursor: 'pointer',
                }
            });                                 //就算这里加了callback来log，发现还是是上一帧的东西,如果想要拿这一帧的东西，必须是箭头函数才行           
        } else {
            this.setState({
                canClick: false,
                answerBtnStyle: {
                    backgroundColor: 'silver',
                    cursor: 'not-allowed',
                }
            })
        }
    }

    contentOnChanging = (e) => {
        this.setState({
            content: e.target.value
        })
        if (e.target.value !== '' && this.state.title !== '') {                          //这边还可以加一个判断输入字符多少的判断，以免出现后端错误
            this.setState({
                canClick: true,
                answerBtnStyle: {
                    backgroundColor: '#ED5736',
                    cursor: 'pointer',
                }
            });                                 //就算这里加了callback来log，发现还是是上一帧的东西,如果想要拿这一帧的东西，必须是箭头函数才行           
        } else {
            this.setState({
                canClick: false,
                answerBtnStyle: {
                    backgroundColor: 'silver',
                    cursor: 'not-allowed',
                }
            })
        }
    }




    render() {
        return (
            <div className='ask_big_container'>
                <button className='ask_button' onClick={this.askCoverJump}>+</button>
                <div className='ask_cover' onClick={this.askCoverClose} style={{ display: this.state.askCoverDisplay }}>
                    <div className='ask_small_container' onClick={this.stopPropagation}>
                        <Input ph='Title' botline='700px' inputwidth='700px' onChange={this.titleOnChanging} />
                        <textarea className='user_can_questiontextarea' onChange={this.contentOnChanging} placeholder='Text your answer here' />
                        <button className='askjump_ask' onClick={this.questionAsk} style={this.state.answerBtnStyle} >Ask</button>
                    </div>
                </div>

            </div>
        )
    }
}

export default Ask_jump_button
