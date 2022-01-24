import React, {useEffect, useState} from 'react'
import Newscomponentitem from './Newscomponentitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const Newscomponent = (props)=> {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);


    const capitalize = (s)=>{
        return s && s[0].toUpperCase() + s.slice(1);
    }


    const updateNews = async ()=>{
        props.setProgress(20);
        let url = `https://newsapi.org/v2/top-headlines?category=${props.category}&country=${props.country}&language=en&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;        
        setLoading(true);
        let data = await fetch(url);

        props.setProgress(40);

        let parsedData = await data.json();

        props.setProgress(60);
        
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${capitalize(props.category)} - News Bird`;
        updateNews();
    }, [])


    const fetchMoreData = async () => {
        
        let url = `https://newsapi.org/v2/top-headlines?category=${props.category}&country=${props.country}&language=en&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;        
        setPage(parseInt(page)+1);
        let data = await fetch(url);
        let parsedData = await data.json();
        
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        
      };

    const handleDates = (e) => {
        let date = new Date();
        let today = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+(date.getDate());
        let todayminus3 = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+(date.getDate()-3);
        if(e==="today"){
            return today;
        }else if(e==="todayminus3"){
            return todayminus3;
        }
    }

    

    return (
        <>  
            <section className="bg-white dark:bg-slate-900">
                <div className="container flex flex-col pt-20 mx-auto dark:bg-slate-900">
                    <h1 className="text-3xl m-2 text-slate-900 dark:text-white">Top Headlines on {capitalize(props.category)} News</h1>
                    {loading && <Spinner />}
                    <span className="text-sm m-2 text-slate-900 dark:text-white">Total Results: {totalResults} | Todays Date: {handleDates("today")}</span>
                       
                    <InfiniteScroll
                        dataLength={articles.length}
                        next={fetchMoreData}
                        hasMore={articles.length !== totalResults}
                        loader={<Spinner />}
                        >
                        <div className="flex flex-row flex-wrap mt-8 mb-20 mx-auto items-center justify-between dark:bg-slate-900">
                        {articles.map(
                            (element)=>{
                                return <Newscomponentitem
                                key={element.url}
                                title={element.title?element.title.slice(0, 90): ""} 
                                description={element.description?element.description.slice(0, 80): ""} 
                                imgurl={!element.urlToTimage? element.urlToImage : "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"}
                                sourcename={element.source.name} 
                                newsurl={element.url}
                                publishedAt={element.publishedAt} ></Newscomponentitem>
                        })}
                        </div>
                    </InfiniteScroll>
                    
                    <div className="flex flex-row items-center justify-center">
                        <span className="text-gray-900 dark:text-gray-200">Results: {articles.length} of {totalResults}</span>
                    </div>
                    
                </div>
            </section>
        </>
    )
}

Newscomponent.defaultProps = {
    pageSize: '4',
    country: 'gb',
    category: 'general',
  }

  Newscomponent.propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
  }

export default Newscomponent


