import React, {useRef, useState} from 'react';
import ReactPlayer from "react-player";

function Scenes(props) {
    const playerRef = useRef(null);
    const playerRef2 = useRef(null);
    const [play, setPlay] = useState(false)
    const [play2, setPlay2] = useState(false)

    const handlePlay = () => {
        if(!play){
            setPlay(true)
        }
    }

    const handleStop = () => {
        if(play){
            setPlay(false)
            playerRef.current.seekTo(0)
        }
    }

    return (
        <>
            <div className="content">
                <div className="template_title">
                    <div className="user_name"> Hello UserName</div>
                    <div className="template_numbers"> 1 unique template scenes</div>
                </div>
                <div className="service_cards">
                    <div className="card_item">
                        <div className="item_image video-player" onMouseEnter={handlePlay} onMouseLeave={handleStop}>
                            <ReactPlayer
                                ref={playerRef}
                                url="/videos/video1.mp4"
                                playing={play}
                                controls={false}
                                volume={0}
                                width="640px"
                                height="220px"
                                style={{borderRadius: '20px'}}
                            />
                        </div>
                        <div className="item_texts">
                            <div className="item_title">Animation 1</div>
                            <div className="item_duration"> Duration: 0:52 min.</div>
                        </div>
                    </div>
                    <div className="card_item">
                        <div className="item_image video-player" onMouseEnter={() => {setPlay2(true)}} onMouseLeave={ev => {
                            setPlay2(false)
                            playerRef2.current.seekTo(0)
                        }}>
                            <ReactPlayer
                                ref={playerRef2}
                                url="/videos/video2.mp4"
                                playing={play2}
                                controls={false}
                                volume={0}
                                width="640px"
                                height="220px"
                                style={{borderRadius: '20px'}}
                            />
                        </div>
                        <div className="item_texts">
                            <div className="item_title">Animation 2</div>
                            <div className="item_duration"> Duration: 0:52 min.</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Scenes;