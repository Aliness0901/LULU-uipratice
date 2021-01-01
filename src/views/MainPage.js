import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import AskJumpButton from '../components/AskJumpButton'
// import {user_token} from '../views/Login'
import LikeTriButton from '../components/LikeTriButton'
import GetQustion from '../components/GetQustions'
import Header from '../components/Header'

import './MainPage.css'


export let questionsdata = {
    data: []             
}          

class MainPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            questionsdataRev: false,
            postFinish:false
        }
    }

    successGet = () => {
        this.setState({
            questionsdataRev: true                      
        })
    }

    componentDidMount = () => {
        GetQustion(this.successGet,this.successGet);                    
    }

    postFinish=()=>{                   
        GetQustion(this.successGet);
    }

    newQuestionUpdate=()=>{
        // console.log('开始上传');
    }

    

    render() {
        return (
            <div className='mainpage_core'>
                <Header/>
                <AskJumpButton  type='question' refresh={this.newQuestionUpdate} postfinish={this.PostFinish}/>
                <div className='afterheader_body2'>
                    <div className='Qustion_container'>
                        {
                            questionsdata.data.map((e) => {
                                return (
                                    <div className='small_Qustion_container' key={e.id}>
                                        <NavLink className='Qustion_title' to={{pathname: '/answers', id: e.id, title: e.title, content: e.content}} onClick={this.GetAnswerClick}>{e.title}</NavLink>
                                        <div className='Qustion_detail'>
                                            {e.content}
                                            <LikeTriButton className='Like' type='questions' questionid={e.id} like={e.number_of_likes} liked={e.liked}/>
                                        </div>     
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default MainPage

