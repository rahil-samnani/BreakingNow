import React, { Component } from 'react'
export default class NewsItem extends Component {

    render() {
        let imgsrc = this.props.imgUrl
        if(this.props.imgUrl === null){
            imgsrc = "https://placehold.co/286x200?text=No+Image"
        }
        
        return (
            <div className="card my-4" style={{ width: "18rem" }}>
                <img src={imgsrc} className="card-img-top" alt="Failed to load" />
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}...</h5>
                    <p className="card-text" style={{height : "88px"}}>{this.props.desc}...</p>
                    <a href={this.props.url} rel="noreferrer" target='_blank' className="btn btn-sm btn-primary">Read more</a>
                </div>
            </div>
        )
    }
}
