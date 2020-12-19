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
                <div className='afterheader_body_profile'>
                    <div>1111</div>
                </div>
            </div>
        )
    }
}

export default Profile