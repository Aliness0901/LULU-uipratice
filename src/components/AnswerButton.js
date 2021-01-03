import React, { PureComponent } from 'react'

class AnswerButton extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <button {...this.props} className='ask_button'><a style={{color:'white'}} href="javascript:scrollTo(0,0)">+</a></button>
        )
    }
}

export default AnswerButton