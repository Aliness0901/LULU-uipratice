import { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'

import getUserInfo from './getUserInfo'
import {userDataDetail} from '../pages/Profile'

import defaultUserPic from '../assets/images/avatar_default.jpg'

import './Header.css'

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
        
    }


    componentDidMount = () => {
        getUserInfo(localStorage.userID,localStorage.userKey,this.sucessGetUser);
    }

    render() {
        return (
            <header className='mainHeader'>
                    <NavLink to='/mainpage' className='header_bigfish'>BIG FISH</NavLink>
                    {/* 把图片用作navlink，装饰背景 */}
                    <NavLink to={{pathname:'/profile', type:'mainuser'}} className='userpic' style={{backgroundImage:`url(${this.state.userPic?this.state.userPic:defaultUserPic})`}} />
            </header>
        )
    }
}

export default Header