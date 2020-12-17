import React, { PureComponent } from 'react'

import triangleorange from '../assets/images/icons/triangleorange.svg'

import './LikeTriButton.css'

class Like_tri_button extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            Likenum:0,                   //这里的数字应该是从后台拿来的
            checkable:true 
        }
    }

    handleClick=(e)=>{
       if (this.state.checkable) {
        const num=this.state.Likenum
        this.setState({
            Likenum:num+1,
            checkable:false
        })
        e.target.style.cursor='default'
       }else{
           this.setState({
               Likenum:this.state.Likenum
           })
       }
    }

    render() {
        return (
            <div className='Like_container' onClick={this.handleClick}>
                <img src={triangleorange} alt=''/>
                Agree
                <span>{this.state.Likenum}</span>
            </div>
        )
    }
}

export default Like_tri_button