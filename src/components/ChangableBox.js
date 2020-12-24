import React, { PureComponent } from 'react'

import Input from '../components/Input'
import pencil from '../assets/images/icons/pencil-edit-button.svg'

import './ChangableBox.css'

class ChangableBox extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            show: 'hidden',
            // user_changable_text: this.props.ChangbleText,            //能改变state的就只有setstate，所以这里就算父类更改了，子类如果下面引用的是this.state的话，也不会更改
            editshow: 'flex',
            inputshow: 'none',
            Changingtext:''                 //这里的输入的文字有必要保存，如果不保存的话，后面的save就无法上传到后台
        }
    }

    handleMouseEnter = () => {
        this.setState({
            show: 'visible'
        })
    }
    handleMouseLeave = () => {
        this.setState({
            show: 'hidden'
        })
    }

    EditShowDisp = () => {
        this.setState({
            editshow: 'none',
            inputshow: 'block'
        })
    }

    InputChanging=(e)=>{
        this.setState({
            Changingtext:e.target.value
        })
    }

    SaveButton=()=>{
        this.props.changedtext(this.state.Changingtext);
        this.setState({
            inputshow:'none',
            editshow:'flex'
        })
    }

    CancleButton=()=>{
        this.setState({
            inputshow:'none',
            editshow:'flex'
        })
    }

    render() {
        return (
            <div>
                <div className='Edit_show_container' onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} onClick={this.EditShowDisp} style={{ display: this.state.editshow }}>
                    <div className={this.props.className}>{this.props.changbletext}</div>       {/*这里讲道理有点问题，就是没必要写在属性里面，可以写在两个label之间，用this.props.value来做*/}
                    <img className='Edit_icon_pencil' src={pencil} style={{visibility:this.state.show}} alt='33' />
                </div>
                <div className='ChangeandSave' style={{ display: this.state.inputshow }}>
                    <Input defaultValue={this.props.defvalue} ph={this.props.ph} onChange={this.InputChanging} />
                    <button onClick={this.SaveButton} className='Profilebutton current'>Save</button><button className='Profilebutton' onClick={this.CancleButton}>Cancel</button>
                </div>
            </div>
        )
    }
}

export default ChangableBox

/*
*****接收参数
**ChangedText用来接收父类中对input框中改变的文字后调用的回调函数，这个函数将会接收已改变的text内容，用来监控用户输入的是否有敏感词汇，可以在父类中书写规则
**支持divclassname，无需解构
**支持defaultvalue以及ph
*/ 