import { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'

import getuserInfo from '../components/GetUserInfo'
import {userdatadetail} from '../views/Profile'

import Patchuserinfo from '../components/Patchuserinfo'

class Header extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            user_pic:''
        }
    }

    SucessgetUser=()=>{
        this.setState({
            user_pic:userdatadetail.detail.avatar_url
        })
        if(this.state.user_pic===null){
            this.setState({
                user_pic:"http://www.hw2jp.com/wp-content/uploads/2019/03/%E6%B5%B7%E8%B4%BC%E7%8E%8B.jpg"
            })
            Patchuserinfo({ avatar_url: this.state.user_pic })                  //相对只在用户界面放默认头像的话，不如直接传给后台
        }
    }


    componentDidMount = () => {
        getuserInfo(localStorage.user_id,localStorage.userkey,this.SucessgetUser);
    }

    render() {
        console.log(this.state.user_pic);
        return (
            <header className='mainHeader'>
                    <NavLink to='/mainpage' style={{color:'#ED5736'}}>BIG FISH</NavLink>
                    {/* 把图片用作navlink，装饰背景 */}
                    <NavLink to={{pathname:'/profile', type:'mainuser'}} className='userpic' style={{backgroundImage:`url(${this.state.user_pic})`}} />
            </header>
        )
    }
}

export default Header