import React, { Component } from 'react'
import PostQuestion from '../components/PostQuestion'

import Input from './Input'

import './AskJumpButton.css'

class Ask_jump_button extends Component {
    constructor(props) {
        super(props)

        this.state = {
            askcover_display: 'none',
            title:'',
            content:'',
            askquestionSuccess:''
        }
    }

    askCoverJump = () => {
        this.setState({
            askcover_display: 'flex',
        })
    }

    askCoverClose = () => {
        this.setState({
            askcover_display: 'none'
        })
    }

    stopPropagation = (e) => {
        e.stopPropagation();            //这里的阻止冒泡的方法和js中一样
    }

    AskquestionSuccess=()=>{
        this.setState({
            askquestionSuccess:true
        })
        this.props.postfinish();
    }

    Questionask = () => {
        PostQuestion(this.state.title,this.state.content,this.AskquestionSuccess);
        this.setState({
            askcover_display: 'none',
            title:'',
            content:'',
        })
        this.props.refresh();
    }

    titleOnChanging=(e)=>{
        this.setState({
            title:e.target.value
        })
    }

    contentOnChanging=(e)=>{
        this.setState({
            content:e.target.value
        })
    }

    render() {
        return (
            <div className='ask_big_container'>
                <button className='ask_button' onClick={this.askCoverJump}>+</button>
                {/* 非常需要注意的是，如果我们想要停止冒泡的话，需要在子类中添加这个onclick的事件来阻止里面所有的子类向上冒泡 */}
                {/* 但是本身并不影响里面的子类的任何点击，如果和点击有冲突的话，我们可以用一个大的盒子包起来，来控制冒泡 */}
                <div className='ask_cover' onClick={this.askCoverClose} style={{ display: this.state.askcover_display }}>
                    <div className='ask_small_container' onClick={this.stopPropagation}>
                        <Input ph='Title' botline='700px' inputwidth='700px' onChange={this.titleOnChanging} />
                        {/* <Input ph='Content' botline='700px' inputwidth='700px' onChange={this.contentOnChanging} /> */}
                        <textarea className='user_can_questiontextarea' onChange={this.contentOnChanging} placeholder='Text your answer here'/>
                        <button className='askjump_ask' onClick={this.Questionask}>Ask</button>
                    </div>
                </div>

            </div>
        )
    }
}

export default Ask_jump_button

//这里的ask还需要有一个提交的方法，监控就写在两个input里