import React, { Component } from 'react'

export default class About extends Component {
    render() {
        return (
            <div className='About'>
                <div class="Aboutcontainer">
                    <div class="contentLeft">
                        <div class="row">
                            <div class="imgWrapper">
                                <img src="https://images.unsplash.com/photo-1687579521048-217e24217d53?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODg5ODcxNzl8&ixlib=rb-4.0.3&q=85" alt=""/>
                            </div>
                            <div class="imgWrapper">
                                <img src="https://images.unsplash.com/photo-1686580546412-80e80519abd7?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODg5ODcyMDN8&ixlib=rb-4.0.3&q=85" alt=""/>
                            </div>
                            <div class="imgWrapper">
                                <img src="https://images.unsplash.com/photo-1688133338995-a394ce7314e4?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODg5ODcyMDN8&ixlib=rb-4.0.3&q=85" alt=""/>
                            </div>
                            <div class="imgWrapper">
                                <img src="https://images.unsplash.com/photo-1686354715732-7e4685269a25?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODg5ODcyNzN8&ixlib=rb-4.0.3&q=85" alt=""/>
                            </div>
                        </div>
                    </div>
                    <div class="contentRight">
                        <div class="content">
                            <h4>Welcome To</h4>
                            <h2 className={`text-${this.props.mode==="light"?"dark":"light"}`}>Breaking Now</h2>
                            <p className={`text-${this.props.mode==="light"?"dark":"light"}`}>
                            At Breaking Now, we provide the latest headlines from diverse categories like Sports, Entertainment, Politics, and more. Enjoy a seamless reading experience with clickable articles that open in new tabs. Featuring a Dark Mode for comfort, we keep you informed with ease and convenience, no matter the time.</p>
                            <a href="/">Read More...</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
