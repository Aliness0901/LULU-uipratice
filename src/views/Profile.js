import React, { PureComponent } from 'react'
import { NavLink,withRouter } from 'react-router-dom'

import ChangableBox from '../components/ChangableBox'
import getuserInfo from '../components/GetUserInfo'
import Logout  from '../components/Logout'


import './Profile.css'
import camera from '../assets/images/photo-camera.svg'
import logout from '../assets/images/icons/logout.svg'

export let userdatadetail = {
    detail: {}
}

class Profile extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            getuser: false,
            userName: '',                             //这里应该是需要用服务端接收的，至于刷新就会没有信息就需要用到localstorage，这里我们就先用名字代替
            description: '',
            user_pic: '',
            email: '',
            password: ''
        }
    }

    //现在我们需要一个方程，来给子类，可以改变父类的state状态，子类只需要传入一个字符串就可以改变父类的状态
    ChangedName = (text) => {
        if (text !== '') {                    //因为名字不能是空的，所以这里加了判断
            this.setState({
                userName: text
            })
        } else {
            return
        }
        console.log(text);
    }

    ChangedDesDetail = (text) => {
        this.setState({
            description: text
        })
    }

    changedURL = (text) => {
        if (text !== '') {                    //因为名字不能是空的，所以这里加了判断,但是其实还是会传给后面的fetch，之后可以加个判断，来阻止跳转fetch
            this.setState({
                user_pic: text
            })
        } else {
            return
        }
    }

    SucessgetUser = () => {
        this.setState({
            getuser: true,
            userName: userdatadetail.detail.name,
            description: userdatadetail.detail.description,
            user_pic: userdatadetail.detail.avatar_url,
            email: userdatadetail.detail.email,
            password: ''
        })
        if (this.state.user_pic !== null) {                       //设置默认头像
            return
        } else {
            this.setState({
                user_pic: "http://www.hw2jp.com/wp-content/uploads/2019/03/%E6%B5%B7%E8%B4%BC%E7%8E%8B.jpg"
            })
        }
    }

    componp

    LogoutSuccess=()=>{
        this.props.history.push('/')
    }

    LogoutClick=()=>{
        Logout(this.LogoutSuccess);
    }

    componentDidMount = () => {
        getuserInfo(localStorage.user_id, localStorage.userkey, this.SucessgetUser, 'mainuser');
    }


    render() {
        console.log(this.state.userName);       //这里是确实更改过state的了，问题出在传的上面，传过去的时候不是更改过的state
        return (
            <div className='mainpage_core'>
                {/* 所有的css都只需要写一遍，不管你写在哪里，都是会生效的 */}
                <header className='mainHeader'>
                    <NavLink to='mainpage' className='BigFish'>BIG FISH</NavLink>
                    {/* 把图片用作navlink，装饰背景 */}
                    <NavLink to='/profile' className='userpic' style={{ backgroundImage: `url(${this.state.user_pic})` }} />
                </header>
                <div className='afterheader_body2'>
                    <div className='profile_container'>
                        {/* 这一这里的afterheader_body是row的 */}
                        <div className='user_change_pic' style={{ backgroundImage: `url(${this.state.user_pic})` }}>
                            <img className='user_edit_camera' src={camera} alt='camera' />
                            <ChangableBox className='edit_content' ph='Edit your avatar' defvalue='Edit your avatar' type='avatar_url' changedtext={this.changedURL} />
                        </div>
                        <div className='Big_Edit_container'>
                            <ChangableBox className='profile_edit_container' type='name' changbletext={this.state.userName} changedtext={this.ChangedName} defvalue={this.state.userName} ph={this.state.userName} />
                            <div className='user_description'>
                                <div className='discription'>Short Description</div>
                                <ChangableBox type='description' defvalue={this.state.description} ph='Short Description' className='user_detial_description' changbletext={this.state.description} changedtext={this.ChangedDesDetail} />
                            </div>
                            <div className='logout_box' style={{cursor:'pointer'}} onClick={this.LogoutClick}><img className='logoutsign' src={logout} alt='logout'/>Logout</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Profile) 