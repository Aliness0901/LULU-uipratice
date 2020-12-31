import React, { Component } from 'react';
import '../components/Input.css'

class Input extends Component {
    state = {
        pH: this.props.ph,
        // checked:this.props.checked           在这里赋值是不会受到父组件变动而更改的，state本身就是子组件的属性
    }                   //一旦被赋值完，就是一次性赋值，渲染的时候不会再去渲染这个赋值的过程
    handleClick = () => {
        this.setState({
            pH: ''      //这里的是state里面的，相当于会变的
        })
    }
    handleBlur = () => {
        this.setState({
            pH: this.props.ph              //这里的placeholder是props中的，相当于不会变的那个
        })
    }
    render() {
// 关于此组件，可以接受4个属性，一个是是否显示'visibility'，一个是底框的颜色buttomcolor，一个是placeholder定义名叫ph，还有一个错误信息errortext
        return (
            <div className='big_input_container'>
                <div className='input_container' style={{borderBottomColor:this.props.buttomcolor, width:this.props.botline}}>
                    <input
                        onClick={this.handleClick}
                        onBlur={this.handleBlur}
                        placeholder={this.state.pH}
                        className='input'
                        style={{width:this.props.inputwidth}}
                        {...this.props}
                    />
                </div>
                <div className='login_error_box' style={{visibility:this.props.checked}} >{this.props.errortext}</div>
            </div>
        );
    }
}

export default Input;

//也就是说这里placeholder看起来是一个，但是其实是有两个，一个是state里可变的，一个是不可变的
//写两个是因为需要满足我们的一个需求，就是在鼠标点击之后就消失，而不是像传统的placeholder一样，输入了之后才消失

//此组件可以传入自定义的placeholder以外，还可以传入自定义的横线长度