import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
    articles = [
        {
            "source": {
                "id": "the-wall-street-journal",
                "name": "The Wall Street Journal"
            },
            "author": "Bertrand Benoit, David Luhnow, Vipal Monga",
            "title": "The Progressive Moment in Global Politics Is Over",
            "description": "Weak economic growth and record immigration are driving gains by the right, especially populists",
            "url": "https://www.wsj.com/world/global-politics-conservative-right-shift-ea0e8d05?mod=hp_lead_pos1",
            "urlToImage": "https://images.wsj.net/im-35583617/social",
            "publishedAt": "2024-12-28T02:00:00Z",
            "content": null
        },
        {
            "source": {
                "id": "politico",
                "name": "Politico"
            },
            "author": null,
            "title": "The nation’s cartoonists on the week in politics",
            "description": "Every week political cartoonists throughout the country and across the political spectrum apply their ink-stained skills to capture the foibles, memes, hypocrisies and other head-slapping events in the world of politics. The fruits of these labors are hundred…",
            "url": "https://www.politico.com/gallery/2024/12/27/the-nations-cartoonists-on-the-week-in-politics-00196052",
            "urlToImage": "https://static.politico.com/bc/22/12474e5c4e8d808aa2404ad3f973/0-teaser.jpg",
            "publishedAt": "2024-12-27T10:00:00+00:00",
            "content": "Cartoon Carousel \r\nEvery week political cartoonists throughout the country and across the political spectrum apply their ink-stained skills to capture the foibles, memes, hypocrisies and other head-s… [+259 chars]"
        },
        {
            "source": {
                "id": "the-american-conservative",
                "name": "The American Conservative"
            },
            "author": null,
            "title": "Politics Archives - The American Conservative",
            "description": null,
            "url": "https://www.theamericanconservative.com/category/politics/",
            "urlToImage": null,
            "publishedAt": "2022-07-07T21:37:27.3936289Z",
            "content": null
        },
        {
            "source": {
                "id": "politico",
                "name": "Politico"
            },
            "author": null,
            "title": "The nation’s cartoonists on the week in politics",
            "description": "Every week political cartoonists throughout the country and across the political spectrum apply their ink-stained skills to capture the foibles, memes, hypocrisies and other head-slapping events in the world of politics. The fruits of these labors are hundred…",
            "url": "https://www.politico.com/gallery/2024/12/20/the-nations-cartoonists-on-the-week-in-politics-00195449",
            "urlToImage": "https://static.politico.com/5f/a5/3227ba3b434c8d13903646992934/0-teaser.jpg",
            "publishedAt": "2024-12-20T10:00:00+00:00",
            "content": "Cartoon Carousel \r\nEvery week political cartoonists throughout the country and across the political spectrum apply their ink-stained skills to capture the foibles, memes, hypocrisies and other head-s… [+261 chars]"
        },
        {
            "source": {
                "id": "cnn",
                "name": "CNN"
            },
            "author": "Dawn Handley",
            "title": "CNN Headlines | CNN",
            "description": "CNN Headlines is a curated channel covering major news events across politics, international, business, and entertainment, and showcasing the most impactful stories of the day.",
            "url": "https://www.cnn.com/videos/fast/cnn-headlines",
            "urlToImage": "https://media.cnn.com/api/v1/images/stellar/prod/cnn-headlines-placeholder-1920x1080.png?c=16x9&q=w_800,c_fill",
            "publishedAt": "2024-09-03T19:55:38.781Z",
            "content": "CNN Headlines is a curated channel covering major news events across politics, international, business, and entertainment, and showcasing the most impactful stories of the day."
        },
        {
            "source": {
                "id": "the-jerusalem-post",
                "name": "The Jerusalem Post"
            },
            "author": null,
            "title": "Congresswoman Nita Lowey: I am proud to stand with Israel",
            "description": "Gantz: Security of Israel is above politics; PA: This is a crime.",
            "url": "https://www.jpost.com/Arab-Israeli-Conflict/Gantz-Security-of-Israel-is-above-politics-Palestinians-This-is-a-crime-607595",
            "urlToImage": "https://images.jpost.com/image/upload/f_auto,fl_lossy/t_Article2016_ControlFaceDetect/448812",
            "publishedAt": "2019-11-13T04:41:00Z",
            "content": "US Ambassador David M. Friedman said the US stands “with our friend and ally Israel at this critical moment” on social media on Tuesday after roughly 170 rockets were fired on Israel from the Gaza St… [+6160 chars]"
        }
    ]

    constructor() {
        super();
        this.state = {
            articles: this.articles,
            loading : false
        }
    }

    async componentDidMount() {
        let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=aea85cba00cf4c1bab854b83e51ea692"
        let data = await fetch(url)
        let processed_data = await data.json()
        this.setState({articles: processed_data.articles})
    }

    render() {
        return (
            <div className='container my-5'>
                <h2 className='my-5' style={{ textAlign: "center" }}>Breaking Now- News Headlines</h2>
                <div className="row row-cols-4">

                    {this.state.articles.map((element) => {
                        return (
                            <div className="col" key={element.url}>
                                <NewsItem title={element.title==null ? "No Title": element.title.slice(0,45)} 
                                desc={element.description==null ? "No Description": element.description.slice(0,88)} 
                                imgUrl={element.urlToImage} url={element.url} />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
