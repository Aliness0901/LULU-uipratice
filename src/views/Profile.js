import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'


import './Profile.css'
import camera from '../assets/images/photo-camera.svg'

class Profile extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div className='mainpage_core'>
                {/* 所有的css都只需要写一遍，不管你写在哪里，都是会生效的 */}
                <header className='mainHeader'>
                    BIG FISH
                {/* 把图片用作navlink，装饰背景 */}
                    <NavLink to='/profile' className='userpic' />
                </header>
                <div className='afterheader_body'>
                    <div className='profile_container'>
                        <div className='user_change_pic'>
                            <img className='user_edit_camera' src={camera} alt='22' />
                            <div className='edit_content'>Edit your avatar</div>
                        </div>
                        <div className='Big_Edit_container'>
                            <div className='profile_edit_container'>
                                Call Me Maybe
                            </div>
                            <div className='user_description'>
                                <div className='discription'>Short Description</div>
                                {/* <div className='user_detial_description'>12233</div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile