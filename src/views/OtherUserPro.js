import React, { Component } from 'react'

import getOtherUserInfo from '../components/getOtherUser'
import Header from '../components/Header'


import './Profile.css'

export let otherUserDataDetail = {
    detail: {}
}

class OtherUserPro extends Component {
    constructor(props) {
        super(props)

        this.state = {
            otherUser:'',
        }
    }

    
    successGetOther=()=>{
        this.setState({
            otherUser:true,
        })
    }

    componentDidMount(){                 
        getOtherUserInfo(this.props.location.answerUserID,this.successGetOther)
    }

    render() {
        console.log(this.props.location.type);
        return (
            <div className='mainpage_core'>
                <Header/>
                <div className='afterheader_body2'>
                    <div className='profile_container'>
                        {/* 这一这里的afterheader_body是row的 */}
                        <div className='user_change_pic' style={{ backgroundImage: `url(${otherUserDataDetail.detail.avatar_url})`,cursor:'default' }}/>
                        <div className='Big_Edit_container'>
                            <div className='profile_edit_container' type='name'>{otherUserDataDetail.detail.name}</div>
                            <div className='user_description'>
                                <div className='discription'>Short Description</div>
                                <div type='description'>{otherUserDataDetail.detail.description}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OtherUserPro