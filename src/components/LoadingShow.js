import React, { PureComponent } from 'react'

import loadingImage from '../assets/images/loading.gif'

import './LoadingShow.css'

class LoadingShow extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <div {...this.props} className='loading_cover'>
                <img className='loading_img' src={loadingImage} alt='loadingImage'/>
            </div>
        )
    }
}

export default LoadingShow