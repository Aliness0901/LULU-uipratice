import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'

import ChangableBox from '../components/ChangableBox'
import getUserInfo from '../components/getUserInfo'
import Logout from '../components/Logout'
import Header from '../components/Header'


import './Profile.css'


import logout from '../assets/images/icons/logout.svg'
import defaultUserPic from '../assets/images/avatar_default.jpg'

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
            descriptionPlaceHolder: '',
            userNamePlaceHolder: '',
            defalutDescriptionValue: '',
            defalutNameValue: '',
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
            defalutNameValue:userDataDetail.detail.name,
            defalutDescriptionValue: userDataDetail.detail.description
        }, () => {
            if (this.state.description === null || this.state.description === '') {
                this.setState({
                    description: 'to lazy to write ...',
                    descriptionPlaceHolder: 'to lazy to write ...',
                    defalutDescriptionValue: '',
                    descriptionColor:'silver'
                })
            }else{
                this.setState({
                    descriptionColor:'color: #424c50;'
                })
            }

            if (!this.state.userName) {
                this.setState({
                    userName:'神秘人',
                })
            }
        })
    }

    logoutSuccess = () => {
        this.props.history.push('/')
    }

    logoutClick = () => {
        Logout(this.logoutSuccess);
    }

    componentDidMount = () => {
        getUserInfo(localStorage.userID, localStorage.userKey, this.sucessGetUser);
    }

    saveClickGetInfo = () => {
        getUserInfo(localStorage.userID, localStorage.userKey, this.sucessGetUser);
    }


    render() {
        return (
            <div className='mainpage_core'>
                <Header />
                <div className='afterheader_body2'>
                    <div className='profile_container'>
                        {/* 这一这里的afterheader_body是row的 */}
                        <div className='user_change_pic' style={{ backgroundImage: `url(${this.state.userPic?this.state.userPic:defaultUserPic})` }}>
                            <ChangableBox className='edit_content' typebox='user_pic' ph='Edit your avatar' defvalue='' type='avatar_url' changedtext={this.changedURL} saveGetUserInfo={this.saveClickGetInfo} />
                        </div>
                        <div className='Big_Edit_container'>
                            <ChangableBox typebox='name' className='profile_edit_container' type='name' changbletext={this.state.userName} changedtext={this.changedName} defvalue={this.state.defalutNameValue} ph={this.state.userNamePlaceHolder} saveGetUserInfo={this.saveClickGetInfo} textColor={this.state.userName!=='神秘人'?'#424c50':'silver'} />
                            <div className='user_description'>
                                <div className='discription'>
                                    Short Description
                                    <div className='logout_box' style={{ cursor: 'pointer' }} onClick={this.logoutClick}><img className='logoutsign' src={logout} alt='logout' />Logout</div>
                                </div>
                                <ChangableBox ref={ChangableBox => this.conentBox = ChangableBox} typebox='description' ph={this.state.descriptionPlaceHolder} type='description' descriptionColor={this.state.descriptionColor} defvalue={this.state.defalutDescriptionValue} className='user_detial_description' changbletext={this.state.description} changedtext={this.changedDesDetail} saveGetUserInfo={this.saveClickGetInfo} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Profile) 