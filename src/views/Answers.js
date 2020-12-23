import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'


import { questionsdata } from '../views/MainPage'

class Answers extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        // console.log(questionsdata.data);
        let id = localStorage.questionid
        console.log(id);                //成功接收到
        return (
            <div className='mainpage_core'>
                <header className='mainHeader'>
                    <NavLink to='mainpage' className='BigFish'>BIG FISH</NavLink>
                    <NavLink to='/profile' className='userpic' />
                </header>
                <div className='afterheader_body2'>
                    
                </div>
            </div>
        )
    }
}

export default Answers