import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'

import ChangableBox from '../components/ChangableBox'

import './Profile.css'
import camera from '../assets/images/photo-camera.svg'


class Profile extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            userName:'Call me Maybe',                             //这里应该是需要用服务端接收的，至于刷新就会没有信息就需要用到localstorage，这里我们就先用名字代替
            description:'Lorem ipsum is a prseudo-Latin text used in web design,typogrash slijhl  lijga sliht lsningihjt kjninains, Lorem ipsum is a prseudo-Latin text used in web design, Lorem ipsum is a prseudo-Latin text used in web design, Lorem ipsum is a prseudo-Latin text used in web design, Lorem ipsum is a prseudo-Latin text used in web design,'
        }
    }

//现在我们需要一个方程，来给子类，可以改变父类的state状态，子类只需要传入一个字符串就可以改变父类的状态
    ChangedName=(text)=>{
        if (text!=='') {
            this.setState({
                userName:text
            })   
        }else{
            return
        }
    }

    ChangedDesc=(text)=>{
        if (text!=='') {
            this.setState({
                description:text
            })   
        }else{
            return
        }
    }


    render() {
        return (
            <div className='mainpage_core'>
                {/* 所有的css都只需要写一遍，不管你写在哪里，都是会生效的 */}
                <header className='mainHeader'>
                    <NavLink to='mainpage' className='BigFish'>BIG FISH</NavLink>
                {/* 把图片用作navlink，装饰背景 */}
                    <NavLink to='/profile' className='userpic' />
                </header>
                <div className='afterheader_body2'>
                    <div className='profile_container'>
                        {/* 这一这里的afterheader_body是row的 */}
                        <div className='user_change_pic'>
                            <img className='user_edit_camera' src={camera} alt='22' />
                            <div className='edit_content'>Edit your avatar</div>
                        </div>
                        <div className='Big_Edit_container'>
                            <ChangableBox className='profile_edit_container' changbletext={this.state.userName} changedtext={this.ChangedName} defvalue={this.state.userName} ph={this.state.userName}/>   
                            <div className='user_description'>
                                <div className='discription'>Short Description</div>
                                <ChangableBox defvalue={this.state.description} ph='Short Description' className='user_detial_description' changbletext={this.state.description} changedtext={this.ChangedDesc}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile