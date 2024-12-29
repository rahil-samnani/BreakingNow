import React, { Component } from 'react'
import NewsItem from './NewsItem'
import loading from "./spinner.gif"

export default class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalPages: undefined
        }
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=aea85cba00cf4c1bab854b83e51ea692&page=${this.state.page}&pageSize=20`
        this.setState({ loading: true })
        let data = await fetch(url)
        let processed_data = await data.json()
        this.setState({ loading: false, articles: processed_data.articles, totalPages: Math.ceil(processed_data.totalResults / 20) })
    }


    handleNextClick = async () => {
        if (this.state.page < this.state.totalPages) {
            let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=aea85cba00cf4c1bab854b83e51ea692&page=${this.state.page + 1}&pageSize=20`
            this.setState({ loading: true })
            let data = await fetch(url)
            let processed_data = await data.json()
            this.setState({ loading: false, page: this.state.page + 1, articles: processed_data.articles })
        }
    }

    handlePreviousClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=aea85cba00cf4c1bab854b83e51ea692&page=${this.state.page - 1}&pageSize=20`;
        this.setState({ loading: true })
        let data = await fetch(url)
        let processed_data = await data.json()
        this.setState({ articles: processed_data.articles, page: this.state.page - 1, loading: false })
    }

    render() {
        return (
            <div className='container my-5'>
                <h2 className='my-5' style={{ textAlign: "center" }}>Breaking Now- News Headlines</h2>
                { this.state.loading && <div className="spinner text-center">
                    <img src={loading} alt="Loading"/>
                </div>}
                <div className="row row-cols-4">
                    {!this.state.loading && this.state.articles.map((element) => {
                        const uniqueKey = `${element.url}-${element.publishedAt}`;
                        return (
                            <div className="col" key={uniqueKey}>
                                <NewsItem title={element.title == null ? "No Title" : element.title.slice(0, 40)}
                                    desc={element.description == null ? "No Description" : element.description.slice(0, 88)}
                                    imgUrl={element.urlToImage} url={element.url} />
                            </div>
                        )
                    })}
                </div>
                {!this.state.loading && <div className="d-flex justify-content-between my-5">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-primary" onClick={this.handlePreviousClick}>&larr; Previous</button>
                    <button disabled={this.state.page === this.state.totalPages} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>}
                
            </div>
        )
    }
}
