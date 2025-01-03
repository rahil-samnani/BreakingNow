import React, { Component } from 'react'
import Spinner from './Spinner'
import NewsItem from './NewsItem'
import InfiniteScroll from 'react-infinite-scroll-component'

export default class SerchResults extends Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            totalResults: 0,
            loading: false,
            page: 1,
            pageSize: 20,
            noResults: undefined,
            totalPages: undefined,
            searchSortBy: "publishedAt"
        }
    }

    async updateNews(pageno, pagesize) {
        this.props.setProgress(8)
        let processed_data
        let apiKey = ["aadd759d4af848a1bd79258c2e819fb5", "9d0e16b6b8d243f884e999d9ee8774e3", "cbcb90dc14064d8c8390fb4058c9bd26", "aea85cba00cf4c1bab854b83e51ea692", "0b58fb00b057436b8e24e281f5434a0f", "3b2fd31935e04d7ba856496a6eaf2e02"]
        this.setState({ loading: true })
        this.props.setProgress(25)
        for (let i = 0; i < apiKey.length; i++) {
            this.props.setProgress(50 + i * 5)
            let url = `https://newsapi.org/v2/everything?q=${this.props.query}&sortBy=${this.state.searchSortBy}&language=en&apiKey=${apiKey[i]}&page=${this.state.page}&pageSize=${this.state.pageSize}`
            let data = await fetch(url)
            processed_data = await data.json()
            if (processed_data.status === "ok")
                break;
        }
        console.log(this.state.searchSortBy)
        this.props.setProgress(85)
        if (processed_data.status === "error" || processed_data.totalResults === 0) {
            this.setState({ noResults: true })
            this.props.setProgress(100)
            return
        }
        this.setState({
            page: this.state.page + 1,
            articles: processed_data.articles,
            totalResults: processed_data.totalResults,
            loading: false,
            totalPages: Math.ceil(processed_data.totalResults / this.state.pageSize)
        })
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

    handlesearchSortByChange = async (event) => {
        let value = event.target.value;
        this.setState({ searchSortBy: value })
        this.updateNews(this.state.page, value)
    }

    fetchMoreData = async () => {
        let processed_data
        let apiKey = ["aadd759d4af848a1bd79258c2e819fb5", "9d0e16b6b8d243f884e999d9ee8774e3", "cbcb90dc14064d8c8390fb4058c9bd26", "aea85cba00cf4c1bab854b83e51ea692", "fdb9ec4618ed4689abd38fb84bd9491e"]
        for (let i = 0; i < apiKey.length; i++) {
            let url = `https://newsapi.org/v2/everything?q=${this.props.query}&apiKey=${apiKey[i]}&page=${this.state.page + 1}&pageSize=${this.state.pageSize}`
            let data = await fetch(url)
            processed_data = await data.json()
            if (processed_data.status === "ok")
                break;
        }
        this.setState({
            page: this.state.page + 1,
            articles: this.state.articles.concat(processed_data.articles),
            totalResults: processed_data.totalResults
        })
    };

    render() {
        return (
            <>
                <h2 className={`mgtop mb-4 text-center text-${this.props.mode === "light" ? "dark" : "light"}`}>Breaking Now - Results for <i>"{this.props.query}"</i></h2>
                {this.props.pagination && !this.state.noResults && <div className='container my-5'>
                    {!this.state.loading && <div className='d-flex flex-column'>
                        <div className="d-flex flex-row-reverse my-2 flex-wrap" style={{ justifyContent: "space-between" }}>
                            <div className='d-flex flex-row-reverse flex-wrap'>
                                <select value={this.state.pageSize} className={`form-select text-${this.props.mode === "light" ? "dark" : "light"} bg-${this.props.mode}`} id='pageSizeSelect' aria-label="Default select example" onChange={this.handlePageSizeChange} style={{ height: "40px", width: "100px", marginRight: "20px" }}>
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={15}>15</option>
                                    <option defaultValue={20}>20</option>
                                </select>
                                <p className={`text-${this.props.mode === "light" ? "dark" : "light"}`} style={{ margin: "7px 12px" }}>no. of results per page</p>
                            </div>
                            <div className='d-flex flex-row-reverse flex-wrap my-2'>
                                <select value={this.state.searchSortBy} className={`form-select text-${this.props.mode === "light" ? "dark" : "light"} bg-${this.props.mode}`} id='pageSizeSelect' aria-label="Default select example" onChange={this.handlesearchSortByChange} style={{ height: "40px", width: "130px", marginRight: "20px" }}>
                                    <option value="popularity">Popularity</option>
                                    <option value="relevancy">Relevancy</option>
                                    <option defaultValue="publishedAt">Published At</option>
                                </select>
                                <p className={`text-${this.props.mode === "light" ? "dark" : "light"}`} style={{ margin: "7px 12px" }}>Sort by</p>
                            </div>
                        </div>
                    </div>}
                    {this.state.loading && <Spinner />}
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

                {!this.props.pagination && !this.state.noResults && <div className='container my-5'>
                    {this.state.loading && <Spinner />}
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<Spinner small={true} />}
                    >
                        <div className="container" style={{ overflowX: "hidden" }}>
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
                        </div>
                    </InfiniteScroll>
                </div>}

                {this.state.noResults && <div class=" container my-5">
                    <div class="content">
                        <div class="browser-bar">
                            <span class="close button"></span>
                            <span class="min button"></span>
                            <span class="max button"></span>
                        </div>
                        <div class="text-light">404 Not Found</div>
                    </div>
                </div>}
            </>
        )
    }
}
