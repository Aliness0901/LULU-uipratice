import React, { Component } from 'react'

import getotheruserInfo from '../components/GetOtheruser'
import Header from '../components/Header'


import './Profile.css'

export let otheruserdatadetail = {
    detail: {}
}

class OtherUserPro extends Component {
    constructor(props) {
        super(props)

        this.state = {
            otherUser:'',
        }
    }

    
    SuccessGetOther=()=>{
        this.setState({
            otherUser:true,
        })
    }

    componentDidMount(){                 
        getotheruserInfo(this.props.location.answerUserID,this.SuccessGetOther)
    }

    render() {
        console.log(this.props.location.type);
        return (
            <div className='mainpage_core'>
                <Header/>
                <div className='afterheader_body2'>
                    <div className='profile_container'>
                        {/* 这一这里的afterheader_body是row的 */}
                        <div className='user_change_pic' style={{ backgroundImage: `url(${otheruserdatadetail.detail.avatar_url})`,cursor:'default' }}/>
                        <div className='Big_Edit_container'>
                            <div className='profile_edit_container' type='name'>{otheruserdatadetail.detail.name}</div>
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