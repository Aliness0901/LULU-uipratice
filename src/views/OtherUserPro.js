import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import getuserInfo from '../components/GetUserInfo'
import {userdatadetail} from '../views/Profile'


import './Profile.css'

export let otheruserdatadetail = {
    detail: {}
}

class OtherUserPro extends Component {
    constructor(props) {
        super(props)

        this.state = {
            mainuser:'',
            otheruser:'',
        }
    }

    SuccessGetmain=()=>{
        this.setState({
            mainuser:true,
        })
    }

    SuccessGetOther=()=>{
        this.setState({
            otheruser:true,
        })
        console.log(this.state.other_pic);
    }

    componentDidMount(){   
        console.log('传过来的'+this.props.location.answerUserID);              
        getuserInfo(localStorage.user_id, localStorage.userkey,this.SuccessGetmain,'otherusers',this.SuccessGetOther,this.props.location.answerUserID)
    }

    render() {
        console.log(this.props.location.type);
        return (
            <div className='mainpage_core'>
                <header className='mainHeader'>
                    <NavLink to='mainpage' className='BigFish'>BIG FISH</NavLink>
                    <NavLink to='/profile' className='userpic' style={{ backgroundImage: `url(${userdatadetail.detail.avatar_url}` }} />
                </header>


                <div className='afterheader_body2'>
                    <div className='profile_container'>
                        {/* 这一这里的afterheader_body是row的 */}
                        <div className='user_change_pic' style={{ backgroundImage: `url(${otheruserdatadetail.detail.avatar_url})`,cursor:'default' }}/>
                        <div className='Big_Edit_container'>
                            <div className='profile_edit_container' type='name'/>
                            <div className='user_description'>
                                <div className='discription'>Short Description</div>
                                <div type='description'>{otheruserdatadetail.detail.description}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OtherUserPro