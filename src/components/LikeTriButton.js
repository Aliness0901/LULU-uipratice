import React, { PureComponent } from 'react'
import LikeApi from '../components/LikeApi'


import triangleorange from '../assets/images/icons/triangleorange.svg'

import './LikeTriButton.css'

class Like_tri_button extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            Likenum:this.props.like,                          //这里的数字是从后台拿来的，通过questionapi已经返回了like的num数
            checked:this.props.liked,                        //questions会返回一个liked，初始默认值是false
            clickable: true
        }
    }
//liked true的话表示点过了，false的话表示还没点过,但是目前来看，好像并不能返回true，就是刷新过后，返回的还是false，所以是再次登录之后无论怎么样得到的都是可以点击的false
//但是后端缺可以正确的返回已经点击过了，所以只能调用fail callback
//然后目前后端也没有关系回答的like，所以明天问一下
//因为如果能正确返回的话，就不会进入到if，而是直接进入到else，所以不会有fail的问题，fail回调也可以不写，但是不排除有问题

CanLikeQuestion=()=>{

}

CantLikeQustion=()=>{
    this.setState({Likenum:this.props.like})
}

    handleClick=(e)=>{
//由于这里收到的数据是后端返回的，后端返回没点之前是false，以为还没点，所以这里用!
        if (this.props.type==='questions'&&!this.state.checked) {           //这里增加了type来判断是不是question页面的，从而来调用question的fetch
            const num=this.state.Likenum            //因为回答的api好像还没有，所以后面就先不写
        this.setState({
            Likenum:num+1,
            clickable:false                                        //这里的clickabel到时候要去掉
        })
            LikeApi(this.props.questionid,this.CanLikeQuestion,this.CantLikeQustion);              //这里增加如果后端返回的已经点过了，就用这个fail的回调函数
            console.log(this.state.checked);
            e.target.style.cursor='default'
        }
       else{
           this.setState({
               Likenum:this.state.Likenum
           })
           e.target.style.cursor='default'
       }
    }

    render() {
        if (this.state.clickable) {              //这里就先用clickable来代替返回的true或者false，等改了就替换掉
            return (
                <div className='Like_container' onClick={this.handleClick}>
                    <img src={triangleorange} alt=''/>
                    Agree
                    <span>{this.state.Likenum}</span>
                </div>
            )
        }else{              //这里就先用clickable来代替返回的true或者false，等改了就替换掉
            return (
                <div className='Liked_container' onClick={this.handleClick}>
                    <img src={triangleorange} alt=''/>
                    Agree
                    <span>{this.state.Likenum}</span>
                </div>
            )
        }
    }
}

export default Like_tri_button