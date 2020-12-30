import { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'

import getuserInfo from '../components/GetUserInfo'
import {userdatadetail} from '../views/Profile'

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
        if (this.state.user_pic!=='') {                       //设置默认头像，在判断赋值过后是否为空之后，赋值我们自己的默认图片
            return 
        }else if(this.state.user_pic===''){
            this.setState({
                user_pic:"http://www.hw2jp.com/wp-content/uploads/2019/03/%E6%B5%B7%E8%B4%BC%E7%8E%8B.jpg"
            })
        }
    }


    componentDidMount = () => {
        getuserInfo(localStorage.user_id,localStorage.userkey,this.SucessgetUser,'mainuser');
    }

    render() {
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