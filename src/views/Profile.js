import React, { PureComponent } from 'react'
import {NavLink} from 'react-router-dom'


import './Profile.css'

class Profile extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div>
                {/* 所有的css都只需要写一遍，不管你写在哪里，都是会生效的 */}
                <header className='mainHeader'>
                    BIG FISH
                {/* 把图片用作navlink，装饰背景 */}
                    <NavLink to='/profile' className='userpic' />
                </header>
                <body className='afterheader_body'>
                    
                </body>
            </div>
        )
    }
}

export default Profile