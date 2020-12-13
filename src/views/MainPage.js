import React, { PureComponent } from 'react'

import AskJumpButton from '../components/AskJumpButton'
import {user_token} from '../views/Login'

class MainPage extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        console.log(user_token);
        //这里不清楚是不是跨域的问题，这里接收不到user_token
        return (
            <div>
                <AskJumpButton/>
                1111afafafaf
            </div>
        )
    }
}

export default MainPage