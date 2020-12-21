import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'

import ChangableBox from '../components/ChangableBox'

import './Profile.css'
import camera from '../assets/images/photo-camera.svg'


class Profile extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            userName:'Call me Maybee'                             //这里应该是需要用服务端接收的，至于刷新就会没有信息就需要用到localstorage，这里我们就先用名字代替
        }
    }

//现在我们需要一个方程，来给子类，可以改变父类的state状态，子类只需要传入一个字符串就可以改变父类的状态
    ChangedText=(text)=>{
        if (text==='') {
            this.setState({
                userName:text
            })   
        }else{
            return
        }
    }


    render() {
        console.log(this.state.userName);
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
                        {/* 这一这里的afterheader_body是row的 */}
                        <div className='user_change_pic'>
                            <img className='user_edit_camera' src={camera} alt='22' />
                            <div className='edit_content'>Edit your avatar</div>
                        </div>
                        <div className='Big_Edit_container'>
                            <ChangableBox className='profile_edit_container' changbletext={this.state.userName} changedtext={this.ChangedText}/>   
                            <div className='user_description'>
                                <div className='discription'>Short Description</div>
                                <div className='user_detial_description'>1321 3213 321 33131   21313  2121  321  213215365   32 2233</div>
                            </div>
                            <ChangableBox/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile