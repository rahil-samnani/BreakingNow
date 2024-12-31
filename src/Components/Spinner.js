import React, { Component } from 'react'
import spinner from "./spinner.gif"
import smallSpinner from "./small_loader.gif"

export default class Spinner extends Component {

    render() {
        return (
           <>
                {!this.props.small && <div className="spinner text-center" style={{ overflow: "hidden" }}>
                        <img className="spinnerLarge" src={spinner} alt="spinner" />
                </div>}
                {this.props.small && <div className="text-center" style={{ overflow: "hidden" }}>
                    <img className="spinnerSmall" src={smallSpinner} alt="spinner" />
                </div>}
            </>
        )
    }
}
