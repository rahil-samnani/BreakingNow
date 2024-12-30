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
            totalPages: undefined,
            pageSize: 20,
        }
    }

    async updateNews(pageno, pagesize) {
        this.setState({ loading: true })
        console.log(this.state.page)
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=aea85cba00cf4c1bab854b83e51ea692&page=${pageno}&pageSize=${pagesize}`
        let data = await fetch(url)
        let processed_data = await data.json()
        this.setState({ loading: false, articles: processed_data.articles, totalPages: Math.ceil(processed_data.totalResults / this.state.pageSize) })
    }

    async componentDidMount() {
        this.updateNews()
    }


    handleNextClick = async () => {
        if (this.state.page < this.state.totalPages) {
            let pageno = this.state.page;
            this.setState({ page: this.state.page + 1 })
            this.updateNews(pageno + 1, this.state.pageSize)
        }
    }

    handlePreviousClick = async () => {
        let pageno = this.state.page;
        this.setState({ page: this.state.page - 1 })
        this.updateNews(pageno - 1 , this.state.pageSize)
    }

    handlePageSizeChange = async (event) => {
        let value = event.target.value;
        this.setState({ pageSize: value })
        this.updateNews(this.state.page,value)
    }

    render() {
        return (
            <div className='container my-5'>
                <h2 className='my-5 text-center'>Breaking Now - News Headlines</h2>
                <div className="d-flex flex-row-reverse my-2">
                    <select className="form-select" id='pageSizeSelect' aria-label="Default select example" onChange={this.handlePageSizeChange} style={{ width: "100px", marginRight: "20px" }}>
                        <option value='5'>5</option>
                        <option value='10'>10</option>
                        <option value='15'>15</option>
                        <option selected value='20'>20</option>
                    </select>
                    <p className='mx-3 mb-0 mt-1'>No. of results per page</p>
                </div>
                {this.state.loading && <div className="spinner text-center">
                    <img src={loading} alt="Loading" />
                </div>}
                <div className="row row-cols-4">
                    {!this.state.loading && this.state.articles.map((element) => {
                        const uniqueKey = `${element.url}-${element.publishedAt}`;
                        return (
                            <div className="col" key={uniqueKey}>
                                <NewsItem title={element.title == null ? "No Title" : element.title.slice(0, 40)}
                                    desc={element.description == null ? "No Description" : element.description.slice(0, 88)}
                                    imgUrl={element.urlToImage} url={element.url} source={element.source.name}
                                    author={element.author} dateTime={element.publishedAt} />
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
