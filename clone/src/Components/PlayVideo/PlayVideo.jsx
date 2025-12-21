import React, {  useEffect } from 'react'
import './PlayVideo.css'
import video from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import { useState} from 'react'
import { API_KEY } from '../../data'
import { valueconverter } from '../../data'
import moment from 'moment'

const PlayVideo = ({videoId, categoryId}) => {

    const [apiData,setApiData]=useState(null);
    const [channelData,setChannelData]=useState(null);
    const [commentData,setCommentData]=useState([]);

    //fetch video data
    const fetchVideoData= async() =>{
        const videoDetails_url= `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
        await fetch(videoDetails_url).then(response => response.json()).then(data => setApiData(data.items[0]))
   }

    //fetch channel data
    const fetchOtherData= async() =>{
    const ChannelData_url= `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
    await fetch(ChannelData_url).then(response => response.json()).then(data => setChannelData(data.items[0]))

    const commentData_url= `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
        await fetch(commentData_url).then(response => response.json()).then(data => setCommentData(data.items))
    }

    //fetch comment data
    

    useEffect(() =>{ 
            fetchVideoData();
    }, [])

    useEffect(() =>{ 
        fetchOtherData();
    }, [apiData])


  return ( 
    <div className='play-video'>
        {/* <video src={video} controls autoPlay muted></video>
         */}

         <iframe  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <h3>{apiData?apiData.snippet.title:"Title here"}</h3>
        <div className="play-video-info">
            <p>{apiData?valueconverter(apiData.statistics.viewCount):"16k"} views &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow():""} </p>
            <div>
            <span><img src={like} alt="like" />{apiData?valueconverter(apiData.statistics.likeCount):"125"}</span>
            <span><img src={dislike} alt="dislike" />{apiData?valueconverter(apiData.statistics.dislikeCount):"125"}</span>
            <span><img src={share} alt="share" />{apiData?valueconverter(apiData.statistics.viewCount):"16k"}</span>
            <span><img src={save} alt="save" />Save</span>
            </div>
        </div>
        <hr />
        
        <div className="publisher">
            <img src={channelData?channelData.snippet.thumbnails.default.url:""} alt="" />
            <div>
                <p>{apiData?apiData.snippet.channelTitle:""}</p>
                <span>{channelData?valueconverter(channelData.statistics.subscriberCount):"1.2M"} subscribers</span>
            </div>
            <button>Subscribe</button>
        </div>
        <div className="vid-Description">
            <p>{apiData?apiData.snippet.description.slice(0,250):"Description"}</p>
            <p>Subscribe GreatStack to Watch More Tutorials on web development</p>
            <hr />
            <h4>{apiData?valueconverter(apiData.statistics.commentCount):"101"} Comments</h4>
<br />
            {commentData.map((item,index) => {
                return(
                     <div key={index} className="comment">
                        <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="user" />
                        <div>
                            <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>{moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span></h3>
                            <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                            <div className="comment-action">
                                <img src={like} alt="" />
                                <span>{valueconverter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                                <img src={dislike} alt="" />
                            </div>
                        </div>
                    </div>
                )
            })}
           
            
        </div>
    </div>
  )
}
export default PlayVideo