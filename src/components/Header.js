import { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'

import getUserInfo from './getUserInfo'
import {userDataDetail} from '../pages/Profile'

import patchUserInfo from './patchUserInfo'
import defaultUserPic from '../assets/images/avatar_default.jpg'

class Header extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            userPic:''
        }
    }

    sucessGetUser=()=>{
        this.setState({
            userPic:userDataDetail.detail.avatar_url
        },()=>{
            if(!this.state.userPic){
                this.setState({
                    userPic:defaultUserPic
                },()=>{
                    patchUserInfo({ avatar_url: this.state.userPic })                  //相对只在用户界面放默认头像的话，不如直接传给后台
                })
            }
        })
        
    }


    componentDidMount = () => {
        getUserInfo(localStorage.userID,localStorage.userKey,this.sucessGetUser);
    }

    render() {
        return (
            <header className='mainHeader'>
                    <NavLink to='/mainpage' style={{color:'#ED5736'}}>BIG FISH</NavLink>
                    {/* 把图片用作navlink，装饰背景 */}
                    <NavLink to={{pathname:'/profile', type:'mainuser'}} className='userpic' style={{backgroundImage:`url(${this.state.userPic})`}} />
            </header>
        )
    }
}

export default Header