import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import AskJumpButton from '../components/AskJumpButton'
import LoadingShow from '../components/LoadingShow'
import LikeTriButton from '../components/LikeTriButton'
import getQustion from '../components/getQuestions'
import Header from '../components/Header'

import './MainPage.css'


export let questionsdata = {
    data: []             
}          

class MainPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            postFinish:false,
            loadingShow:'none'
        }
    }

    successGet = () => {
        this.setState({
            loadingShow:'none'                    
        })
    }

    componentDidMount = () => {
        this.setState({
            loadingShow:'flex'
        })
        getQustion(this.successGet,this.successGet);            
    }

    postFinish=()=>{                   
        getQustion(this.successGet); 
    }



    loadingShow=()=>{
        this.setState({
            loadingShow:'flex'
        })
    }

    

    render() {
        return (
            <div className='mainpage_core'>
                <Header/>
                <AskJumpButton loadingShow={this.loadingShow}  type='question' postfinish={this.postFinish}/>
                <div className='afterheader_body2'>
                    <div className='Qustion_container'>
                        {
                            questionsdata.data.map((e,index) => {
                                if (index===questionsdata.data.length-1) {
                                    return (
                                        <div className='small_Qustion_container' key={e.id} style={{borderBottomColor:'white'}} >
                                            <NavLink className='Qustion_title' to={'/answers?'+e.id} onClick={this.GetAnswerClick} >{e.title}</NavLink>
                                            <div className='Qustion_detail'>
                                                {e.content}
                                                <LikeTriButton className='Like' type='questions' questionid={e.id} like={e.number_of_likes} liked={e.liked}/>
                                            </div>     
                                        </div>
                                    )
                                }else{
                                return (
                                    <div className='small_Qustion_container' key={e.id}>
                                        <NavLink className='Qustion_title' to={'/answers?'+e.id} onClick={this.GetAnswerClick} >{e.title}</NavLink>
                                        <div className='Qustion_detail'>
                                            {e.content}
                                            <LikeTriButton className='Like' type='questions' questionid={e.id} like={e.number_of_likes} liked={e.liked}/>
                                        </div>     
                                    </div>
                                )}
                            })
                        }
                    </div>
                </div>
                <LoadingShow style={{display:this.state.loadingShow}} />
            </div>
        )
    }
}

export default MainPage

