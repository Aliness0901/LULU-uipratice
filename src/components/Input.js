import React, { Component } from 'react';
import '../components/Input.css'

class Input extends Component {
    state = {
        placeholder: this.props.placeholder
    }
    handleClick = () => {
        this.setState({
            placeholder: ''      //这里的是state里面的，相当于会变的
        })
    }
    handleBlur = () => {
        this.setState({
            placeholder: this.props.placeholder              //这里的placeholder是props中的，相当于不会变的那个
        })
    }
    render() {
        return (
            <div className='input_container'>
                    <input
                        onClick={this.handleClick}
                        onBlur={this.handleBlur}
                        placeholder={this.state.placeholder}
                        className='input'
                    />
                </div>
        );
    }
}

export default Input;

//也就是说这里placeholder看起来是一个，但是其实是有两个，一个是state里可变的，一个是不可变的
//写两个是因为需要满足我们的一个需求，就是在鼠标点击之后就消失，而不是像传统的placeholder一样，输入了之后才消失