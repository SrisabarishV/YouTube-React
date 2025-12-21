import React, { useEffect } from 'react'
import './Recommended.css'
import { useState} from 'react'
import { API_KEY } from '../../data'
import { valueconverter } from '../../data'
import { Link } from 'react-router-dom'




const Recommended = ({categoryId}) => {

    const [apiData,setApiData]=useState([]);

    const fetchData= async() =>{
        //fetch recommended video data based on categoryId
        const videolist_url= `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=IN&videoCategoryId=${categoryId}&key=${API_KEY}`;
        await fetch(videolist_url).then(response => response.json()).then(data => setApiData(data.items))
    }


    useEffect(() =>{ 
            fetchData();
    }, [])


     
  return (
    <div className='recommended'>
        {apiData.map((item,index) => {
                return(
                     <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
                        <img src={item.snippet.thumbnails.medium.url} alt="thumbnail1" />
                        <div className="vid-info">
                            <h4>{item.snippet.title}</h4>
                            <p>{item.snippet.channelTitle}</p>
                            <p>{valueconverter(item.statistics.viewCount)} views</p>
                        </div>
                      </Link>
                )
        })}
       
    </div>
  )
}

export default Recommended