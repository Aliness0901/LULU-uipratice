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
                    this.input.defaultValue = this.state.value          
                })                              
        } else {
            this.setState({}, () => {
                this.input.defaultValue = this.state.defaultValue
            })
        }
    }
    handleBlur = () => {
        if (this.state.value === '') {
            this.setState({},
                () => {
                    this.input.defaultValue = this.state.defaultValue   
                })                 
        } else {
            this.setState({},
                () => {
                    this.input.defaultValue = this.state.value
                })
        }
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
                onChange={this.handleChange}>
                </input>
        );
    }
}

export default Inputerror;

