import React, { PureComponent } from 'react'

class AnswerButton extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <button {...this.props} className='ask_button'>+</button>
        )
    }
}

export default AnswerButton