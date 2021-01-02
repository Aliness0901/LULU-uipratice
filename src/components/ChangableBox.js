import React, { PureComponent } from 'react'

import Input from '../components/Input'
import Patchuserinfo from './patchUserInfo'

import pencil from '../assets/images/icons/pencil-edit-button.svg'
import camera from '../assets/images/photo-camera.svg'
import './ChangableBox.css'

class ChangableBox extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            show: 'hidden',
            // user_changable_text: this.props.ChangbleText,            //能改变state的就只有setstate，所以这里就算父类更改了，子类如果下面引用的是this.state的话，也不会更改
            editShow: 'flex',
            inputShow: 'none',
            changingText: ''                 //这里的输入的文字有必要保存，如果不保存的话，后面的save就无法上传到后台
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

    editShowDisp = () => {
        this.setState({
            editShow: 'none',
            inputShow: 'block'
        })
    }

    inputChanging = (e) => {
        this.setState({
            changingText: e.target.value
        })
    }

    saveButton = () => {
        this.props.changedtext(this.state.changingText);
        this.setState({
            inputShow: 'none',
            editShow: 'flex'
        })                  //记住这个传键值对的方式，键值对包装成对象，然后传进参数中
        Patchuserinfo({ [this.props.type]: this.state.changingText },this.props.saveGetUserInfo)           //利用父类传过来的type的名字当成键值对，然后传给fetch，在fetch中直接调用这个键值对
    }

    cancleButton = () => {
        this.setState({
            inputShow: 'none',
            editShow: 'flex'
        })
    }

    render() {
        if (this.props.typebox === 'context') {
            return (
                <div>
                    <div className='Edit_show_container' onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} onClick={this.editShowDisp} style={{ display: this.state.editShow }}>
                        <div className={this.props.className}>{this.props.changbletext}</div>       {/*这里讲道理有点问题，就是没必要写在属性里面，可以写在两个label之间，用this.props.value来做*/}
                        <img className='Edit_icon_pencil' src={pencil} style={{ visibility: this.state.show }} alt='33' />
                    </div>
                    <div className='ChangeandSave' style={{ display: this.state.inputShow }}>
                        <Input defaultValue={this.props.defvalue} ph={this.props.ph} onChange={this.inputChanging} />
                        <button onClick={this.saveButton} className='Profilebutton current'>Save</button><button className='Profilebutton' onClick={this.cancleButton}>Cancel</button>
                    </div>
                </div>
            )
        }
        else if (this.props.typebox === 'user_pic') {
            return (
                <div className='pic_bigbox'>
                    <div className='Pic_show_container' onClick={this.editShowDisp} style={{ display: this.state.editShow }}>
                        <img className='user_edit_camera' src={camera} alt='camera' />
                    </div>
                    <div className='pic_ChangeandSave' style={{ display: this.state.inputShow }}>
                        <Input defaultValue={this.props.defvalue} ph={this.props.ph} onChange={this.inputChanging} botline={'600px'} />
                        <div className='btn'>
                            <button onClick={this.saveButton} className='Profilebutton current'>Save</button><button className='Profilebutton' onClick={this.cancleButton}>Cancel</button>
                        </div>
                    </div>
                </div>
            )
        }
        else if(this.props.typebox === 'content'){
            return (
                <div>
                    <div className='Edit_show_container' onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} onClick={this.editShowDisp} style={{ display: this.state.editShow }}>
                        <div className={this.props.className}>{this.props.changbletext}</div>       {/*这里讲道理有点问题，就是没必要写在属性里面，可以写在两个label之间，用this.props.value来做*/}
                        <img className='Edit_icon_pencil' src={pencil} style={{ visibility: this.state.show }} alt='33' />
                    </div>
                    <div className='ChangeandSave' style={{ display: this.state.inputShow }}>
                        <textarea className={this.props.className} defaultValue={this.props.defvalue} placeholder={this.props.ph} onChange={this.inputChanging} />
                        <button onClick={this.saveButton} className='Profilebutton current save_profile_description'>Save</button><button className='Profilebutton cancle_button' onClick={this.cancleButton}>Cancel</button>
                    </div>
                </div>
            )
        }
    }
}

export default ChangableBox

/*
*****接收参数
**ChangedText用来接收父类中对input框中改变的文字后调用的回调函数，这个函数将会接收已改变的text内容，用来监控用户输入的是否有敏感词汇，可以在父类中书写规则并且存储在父类的state中
**支持divclassname，无需解构
**支持defaultvalue以及ph
*/