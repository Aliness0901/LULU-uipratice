import React, { PureComponent } from 'react'

import Input from './Input'

import './AskJumpButton.css'

class Ask_jump_button extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            askcover_display: 'none',
        }
    }

    askCoverJump = () => {
        this.setState({
            askcover_display: 'flex',
        })
    }

    askCoverClose = (e) => {
        this.setState({
            askcover_display: 'none'
        })
    }

    stopPropagation=(e)=>{
        e.stopPropagation();            //这里的阻止冒泡的方法和js中一样
    }

    render() {
        return (
            <div className='ask_big_container'>
                <button className='ask_button' style={{ backgroundColor: this.state.ask_button_color }} onClick={this.askCoverJump}>+</button>
                <div className='ask_cover' onClick={this.askCoverClose} style={{ display: this.state.askcover_display }}>
                    {/* 非常需要注意的是，如果我们想要停止冒泡的话，需要在子类中添加这个onclick的事件来阻止里面所有的子类向上冒泡 */}
                    {/* 但是本身并不影响里面的子类的任何点击，如果和点击有冲突的话，我们可以用一个大的盒子包起来，来控制冒泡 */}
                    <div className='ask_small_container' onClick={this.stopPropagation}>
                        <Input ph='Title' botline='700px'/>
                        <Input ph='Content' botline='700px'/>
                        <button className='askjump_ask'>Ask</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Ask_jump_button

//这里的ask还需要有一个提交的方法，监控就写在两个input里