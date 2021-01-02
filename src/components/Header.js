import { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'

import getUserInfo from './getUserInfo'
import {userDataDetail} from '../views/Profile'

import Patchuserinfo from './patchUserInfo'

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
        })
        if(this.state.userPic===null){
            this.setState({
                userPic:"http://www.hw2jp.com/wp-content/uploads/2019/03/%E6%B5%B7%E8%B4%BC%E7%8E%8B.jpg"
            })
            Patchuserinfo({ avatar_url: this.state.userPic })                  //相对只在用户界面放默认头像的话，不如直接传给后台
        }
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