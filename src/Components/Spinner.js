import React, { Component } from 'react'
import spinner from "./spinner.gif"
import smallSpinner from "./small_loader.gif"

export default class Spinner extends Component {

    render() {
        return (
            <div className="spinner text-center" style={{ overflow: "hidden" }}>
                {this.props.small && <img className="spinnerSmall" src={smallSpinner} alt="spinner" />}
                {!this.props.small && <img className="spinnerLarge" src={spinner} alt="spinner" />}
            </div>
        )
    }
}
