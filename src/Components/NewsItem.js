import React, { Component } from 'react'

export default class NewsItem extends Component {

    render() {
        return (
            <div className="card" style={{width: "18rem"}}>
                <img src={this.props.imgUrl} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.title}</h5>
                        <p className="card-text">{this.props.desc}</p>
                        <a href={this.props.url} target='_blank' className="btn btn-sm btn-primary">Go somewhere</a>
                    </div>
            </div>
        )
    }
}
