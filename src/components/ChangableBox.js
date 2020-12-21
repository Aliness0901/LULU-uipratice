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
            editshow: 'block',
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
        },
        this.props.changedtext(this.state.Changingtext)
        )
    }

    render() {
        return (
            <div {...this.props}>
                <div className='Edit_show_container' onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} onClick={this.EditShowDisp} style={{ display: this.state.editshow }}>
                    {this.props.changbletext}
                    <img className='Edit_icon_pencil' src={pencil} style={{ visibility: this.state.show }} alt='33' />
                </div>
                <div className='ChangeandSave' style={{ display: this.state.inputshow }}>
                    <Input ph={this.props.changbletext} onChange={this.InputChanging} />
                    <button className='Profilebutton current'>Save</button><button className='Profilebutton'>Cancel</button>
                </div>
            </div>
        )
    }
}

export default ChangableBox

/*
*****接收参数
**ChangbleText用来显示可更改方框中的默认文字
**ChangedText用来接收父类中对input框中改变的文字后调用的回调函数
*/ 