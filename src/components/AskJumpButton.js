import React, { PureComponent } from 'react'
import './AskJumpButton.css'

class Ask_jump_button extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            askcover_display: 'none',
        }
    }

    askCoverJump=()=>{
        this.setState({
            askcover_display:'block',
        })
    }

    askCoverClose=()=>{
        this.setState({
            askcover_display:'none'
        })
    }


    render() {
        return (
            <div className='ask_big_container'>
                 <button className='ask_button' style={{backgroundColor:this.state.ask_button_color}} onClick={this.askCoverJump}>Ask</button>
                <div className='ask_cover' style={{display:this.state.askcover_display}}>
                    <button className='askjump_close' onClick={this.askCoverClose}>close</button>
                </div>
            </div>
        )
    }
}

export default Ask_jump_button