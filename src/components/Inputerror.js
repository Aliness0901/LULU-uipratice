import React, { Component } from 'react';

class Inputerror extends Component {
    state = {
        value: '',                           //onchange改变的内容
        defaultValue: "这是默认内容",
        num: 0,
        // placeholder:'aaa'
    }
    handleFocus = () => {
        if (this.state.value === '') {
            this.setState({},
                () => {
                    this.input.defaultValue = this.state.value           //由于锁帧的问题，所以这里只能在这里更改
                })                              //如果在下面使用this.state来赋值的话，赋的是上一个的
        } else {
            this.setState({}, () => {
                this.input.defaultValue = this.state.defaultValue
            })
        }
        // this.setState({
        //     placeholder:''
        // })
    }
    handleBlur = () => {
        if (this.state.value === '') {
            console.log('目前是空');
            console.log(this.state.defaultValue);   //这里是的default也显示没有变
            this.setState({},
                () => {
                    this.input.defaultValue = this.state.defaultValue   //不知道为什么，这里赋不上值
                })                  //赋不上值是因为在react中defaultValue本身就是不能更改的。。。
        } else {
            this.setState({},
                () => {
                    this.input.defaultValue = this.state.value
                })
        }
        // this.setState({
        //     placeholder:'aaa'
        // })
    }
    handleChange = () => {
            this.setState({
                value: this.input.value
            })
    }
    render() {
        return (
            <input ref={input => this.input = input}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onChange={this.handleChange} 
                // placeholder={this.state.placeholder}
                >
                    {/* <div /> */}
                </input>
        );
    }
}

export default Inputerror;


// 这是一个失败的input，但是依旧有战略意义，正确的做法应该是用placeholder来做