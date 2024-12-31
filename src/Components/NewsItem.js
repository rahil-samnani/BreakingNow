import React, { Component } from 'react'
export default class NewsItem extends Component {

    render() {
        let imgsrc = this.props.imgUrl
        if (this.props.imgUrl === null) {
            imgsrc = "https://placehold.co/286x191?text=No+Image"
        }

        return (
            <div className={`card my-4 bg-${this.props.mode} text-${this.props.mode==="light"?"dark":"light"}`} style={{ width: "18rem" }}>
                <div><span className="badge rounded-pill bg-danger badge">{this.props.source}</span></div>
                <img src={imgsrc} className="card-img-top" alt="Failed to load" />
                <div className="card-body">
                    <h5 className="card-title" style={{ height: "48px" }}>{this.props.title}...</h5>
                    <p className="card-text" style={{ height: "88px" }}>{this.props.desc}...</p>
                    <p className="card-text" style={{ height: "48px" }}><small className="text-body-secondary">By {!this.props.author?"Unkown":this.props.author} at {new Date(this.props.dateTime).toUTCString()}</small></p>
                    <a href={this.props.url} rel="noreferrer" target='_blank' className={`btn btn-sm btn-${this.props.mode==="light"?"primary":"secondary"}`}>Read more</a>
                </div>
            </div>
        )
    }
}
