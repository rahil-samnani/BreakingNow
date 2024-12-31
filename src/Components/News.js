import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            spinner: false,
            page: 1,
            totalPages: undefined,
            pageSize: 20,
            totalResults: 0
        }
    }

    capitalize(str) {
        if (str.length === 0) return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }


    async updateNews(pageno, pagesize) {
        this.props.setProgress(8)
        let processed_data
        let apiKey = ["aadd759d4af848a1bd79258c2e819fb5", "9d0e16b6b8d243f884e999d9ee8774e3", "cbcb90dc14064d8c8390fb4058c9bd26", "aea85cba00cf4c1bab854b83e51ea692"]
        this.setState({ loading: true })
        this.props.setProgress(25)
        for (let i = 0; i < apiKey.length; i++) {
            this.props.setProgress(50 + i * 7)
            let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${apiKey[0]}&page=${pageno}&pageSize=${pagesize}`
            let data = await fetch(url)
            processed_data = await data.json()
            if (processed_data.status === "ok")
                break;
        }
        this.props.setProgress(85)
        this.setState({ totalResults: processed_data.totalResults, loading: false, articles: processed_data.articles, totalPages: Math.ceil(processed_data.totalResults / this.state.pageSize) })
        this.props.setProgress(100)
    }

    async componentDidMount() {
        this.updateNews()
        document.title = `Breaking Now - ${this.props.category}`
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
        this.updateNews(pageno - 1, this.state.pageSize)
    }

    handlePageSizeChange = async (event) => {
        let value = event.target.value;
        this.setState({ pageSize: value })
        this.updateNews(this.state.page, value)
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        let processed_data
        let apiKey = ["aadd759d4af848a1bd79258c2e819fb5", "9d0e16b6b8d243f884e999d9ee8774e3", "cbcb90dc14064d8c8390fb4058c9bd26", "aea85cba00cf4c1bab854b83e51ea692"]
        for (let i = 0; i < apiKey.length; i++) {
            let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${apiKey[0]}&page=${this.state.page+1}&pageSize=${this.state.pageSize}`
            let data = await fetch(url)
            processed_data = await data.json()
            if (processed_data.status === "ok")
                break;
        }
        this.setState({
            articles: this.state.articles.concat(processed_data.articles),
            totalResults: processed_data.totalResults
        })
    };

    render() {
        return (
            <>
                {this.props.pagination && <div className='container my-5'>
                    <h2 className={`mgtop text-center text-${this.props.mode === "light" ? "dark" : "light"}`}>Breaking Now - Top {this.capitalize(this.props.category)} Headlines</h2>
                    {!this.state.loading && <div className="d-flex flex-row-reverse my-2">
                        <select value={20} className={`form-select text-${this.props.mode === "light" ? "dark" : "light"} bg-${this.props.mode}`} id='pageSizeSelect' aria-label="Default select example" onChange={this.handlePageSizeChange} style={{ width: "100px", marginRight: "20px" }}>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option defaultValue={20}>20</option>
                        </select>
                        <p className={`mx-3 mb-0 mt-1 text-${this.props.mode === "light" ? "dark" : "light"}`}>No. of results per page</p>
                    </div>}
                    {this.state.loading && <Spinner/>}
                    <div className="row">
                        {!this.state.loading && this.state.articles.map((element) => {
                            const uniqueKey = `${element.url}-${element.publishedAt}`;
                            return (
                                <div className="col" key={uniqueKey}>
                                    <NewsItem title={element.title == null ? "No Title" : element.title.slice(0, 40)}
                                        desc={element.description == null ? "No Description" : element.description.slice(0, 88)}
                                        imgUrl={element.urlToImage} url={element.url} source={element.source.name}
                                        author={element.author} dateTime={element.publishedAt} mode={this.props.mode} />
                                </div>
                            )
                        })}
                    </div>
                    {!this.state.loading && <div className="d-flex justify-content-between my-5">
                        <button disabled={this.state.page <= 1} type="button" className={`btn btn-${this.props.mode === "light" ? "primary" : "dark"}`} onClick={this.handlePreviousClick}>&larr; Previous</button>
                        <button disabled={this.state.page === this.state.totalPages} type="button" className={`btn btn-${this.props.mode === "light" ? "primary" : "dark"}`} onClick={this.handleNextClick}>Next &rarr;</button>
                    </div>}
                </div>}

                {!this.props.pagination && <div className='container my-5'>
                    <h2 className={`mgtop text-center text-${this.props.mode === "light" ? "dark" : "light"}`}>Breaking Now - Top {this.capitalize(this.props.category)} Headlines</h2>
                    {this.state.loading && <Spinner />}
                    <div className="container">
                        <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<Spinner small={true} />}
                    >
                        <div className="container" style={{overflowX : "hidden"}}>
                            <div className="row">
                                {this.state.articles.map((element) => {
                                    const uniqueKey = `${element.title}-${element.description}-${element.url}-${element.publishedAt}`;
                                    return (
                                        <div className="col" key={uniqueKey}>
                                            <NewsItem title={element.title == null ? "No Title" : element.title.slice(0, 40)}
                                                desc={element.description == null ? "No Description" : element.description.slice(0, 88)}
                                                imgUrl={element.urlToImage} url={element.url} source={element.source.name}
                                                author={element.author} dateTime={element.publishedAt} mode={this.props.mode} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </InfiniteScroll>
                    </div>
                </div>}


            </>
        )
    }
}
