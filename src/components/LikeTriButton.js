import React, { PureComponent } from 'react'

import triangleorange from '../assets/images/icons/triangleorange.svg'

import './LikeTriButton.css'

class Like_tri_button extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            Likenum:this.props.like,                          //这里的数字是从后台拿来的
            checked:this.props.liked                   //questions会返回一个liked，初始默认值是false
        }
    }

    handleClick=(e)=>{
       if (!this.state.checked) {                   //由于这里收到的数据是后端返回的，后端返回没点之前是false，以为还没点，所以这里用!
        const num=this.state.Likenum
        console.log(num);
        this.setState({
            Likenum:num+1,
            checked:true
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