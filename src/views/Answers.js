import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'

import GetAnswer from '../components/GetAnswer'

export let answers = {
    answer: []
}

class Answers extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            answerdataRev: '',                      //判断当前是否提取成功，并且刷新页面
        }
    }

    SuccessAnswer = () => {                         //利用组件来监控answer是否有内容，如果有则开启开关，没有就关闭开关，执行另一套方案
        this.setState({
            answerdataRev: true                     //确认已经异步完成了之后，页面再次刷新
        })
    }

    FailAnswer = () => {
        this.setState({
            answerdataRev: false
        })
    }

    componentDidMount = () => {
        GetAnswer(this.props.location.id, this.SuccessAnswer, this.FailAnswer)           //利用上一个页面跳转过来的问题，提取answer
    }

    render() {
        return (
            <div className='mainpage_core'>
                <header className='mainHeader'>
                    <NavLink to='mainpage' className='BigFish'>BIG FISH</NavLink>
                    <NavLink to='/profile' className='userpic' />
                </header>
                <div className='afterheader_body2'>
                    <div className='repeat_title'>
                        <h3>{this.props.location.title}</h3>
                        <div>{this.props.location.content}</div>
                    </div>
                    <div className='answers_body'>
                        {answers.answer.map((e) => {
                            return (
                                <div key={e.id}>
                                    <div className='difuser_title'>                     
                                    {/*这里的父盒子display是row，竖着*/}
                                        <div>img</div>
                                        <div className='user_detail'>                   
                                        {/*这里的盒子display是column，横着*/}
                                            <div>name</div>
                                            <div>{e.created_at}</div>
                                        </div>
                                    </div>
                                    <div className='answer_detail'>{this.props.location.content}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default Answers



 