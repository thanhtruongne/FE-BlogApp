import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
const VideoComponent = ({url}) => {
    const videoNode = useRef(null);

    useEffect(() => {

        const player = videojs(videoNode.current, {
            autoplay: false,   
            controls: true,
            preload: 'auto', 
            techOrder: ["html5"],
            sources: [
              {
                src: url,
                type: 'video/mp4',
              },
            ],
        });
    
    
       
        return () => {
          if (player) {
            player.dispose();
          }
        };
      }, [url]); 

    return (
          <video
            ref={videoNode} 
            className="video-js"
        />
    )
}


export default VideoComponent 