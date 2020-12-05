import React, { Component } from 'react';
import { Route,Switch} from 'react-router-dom'

import Login from '../views/Login'
import Signup from '../views/Signup'
// import Input from'../components/Input'

import './LgandSu.css'

class LgandSu extends Component {
    

    render() {
        return (
            <div className='container'>
                <div className='login'>
                    <header className='login_header'>BIG FISH</header>
                    <Switch>
                        <Route path='/signup' component={Signup}/>
                        <Route path='/' component={Login}/>
                    </Switch>
                    {/* <Input placeholder='xxx'/> */}
                    </div>
            </div>
        );
    }
}

export default LgandSu;