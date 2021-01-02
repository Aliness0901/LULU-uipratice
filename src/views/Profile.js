import React, { PureComponent } from 'react'
import {withRouter } from 'react-router-dom'

import ChangableBox from '../components/ChangableBox'
import getUserInfo from '../components/getUserInfo'
import Logout  from '../components/Logout'
import Header from '../components/Header'


import './Profile.css'
import logout from '../assets/images/icons/logout.svg'

export let userDataDetail = {
    detail: {}
}

class Profile extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            getUser: false,
            userName: '',                             //这里应该是需要用服务端接收的，至于刷新就会没有信息就需要用到localstorage，这里我们就先用名字代替
            description: '',
            userPic: '',
        }
    }

    //现在我们需要一个方程，来给子类，可以改变父类的state状态，子类只需要传入一个字符串就可以改变父类的状态
    changedName = (text) => {
        if (text !== '') {                    //因为名字不能是空的，所以这里加了判断
            this.setState({
                userName: text
            })
        } else {
            return
        }
        console.log(text);
    }

    changedDesDetail = (text) => {
        this.setState({
            description: text
        })
    }

    changedURL = (text) => {
        if (text !== '') {                    //因为名字不能是空的，所以这里加了判断,但是其实还是会传给后面的fetch，之后可以加个判断，来阻止跳转fetch
            this.setState({
                userPic: text
            })
        } else {
            return
        }
    }

    sucessGetUser = () => {
        this.setState({
            getuser: true,
            userName: userDataDetail.detail.name,
            description: userDataDetail.detail.description,
            userPic: userDataDetail.detail.avatar_url,
        })
        if(this.state.userPic===null){
            this.setState({
                userPic:"http://www.hw2jp.com/wp-content/uploads/2019/03/%E6%B5%B7%E8%B4%BC%E7%8E%8B.jpg"
            })
        }
    }

    logoutSuccess=()=>{
        this.props.history.push('/')
    }

    logoutClick=()=>{
        Logout(this.logoutSuccess);
    }

    componentDidMount = () => {
        getUserInfo(localStorage.userID, localStorage.userKey, this.sucessGetUser,);
    }


    render() {
        return (
            <div className='mainpage_core'>
                <Header/>
                <div className='afterheader_body2'>
                    <div className='profile_container'>
                        {/* 这一这里的afterheader_body是row的 */}
                        <div className='user_change_pic' style={{ backgroundImage: `url(${this.state.userPic})` }}>    
                            <ChangableBox className='edit_content' typebox='user_pic' ph='Edit your avatar' defvalue='Edit your avatar' type='avatar_url' changedtext={this.changedURL} />
                        </div>
                        <div className='Big_Edit_container'>
                            <ChangableBox typebox='context' className='profile_edit_container' type='name' changbletext={this.state.userName} changedtext={this.changedName} defvalue={this.state.userName} ph={this.state.userName} />
                            <div className='user_description'>
                                <div className='discription'>Short Description</div>
                                <ChangableBox typebox='context' type='description' defvalue={this.state.description} ph='Short Description' className='user_detial_description' changbletext={this.state.description} changedtext={this.changedDesDetail} />
                            </div>
                            <div className='logout_box' style={{cursor:'pointer'}} onClick={this.logoutClick}><img className='logoutsign' src={logout} alt='logout'/>Logout</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Profile) 