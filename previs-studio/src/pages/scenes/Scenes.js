import React, {useEffect, useRef, useState} from 'react';
import ReactPlayer from "react-player";
import {useDispatch, useSelector} from "react-redux";
import {getAllTemplates} from "../../store/actions/templates";

function Scenes(props) {
    const playerRef = useRef(null);
    const [play, setPlay] = useState(false)
    const templates = useSelector(store => store.templates.templatesList)

    console.log(templates)
    const dispatch  = useDispatch()
    useEffect(() => {
        dispatch(getAllTemplates())
    }, [])

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
                    {templates && templates.map(template => (
                    <div className="card_item">
                        <div className="item_image video-player" onMouseEnter={handlePlay} onMouseLeave={handleStop}>
                            <ReactPlayer
                                ref={playerRef}
                                url={template.name}
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
                    ))}
                </div>
            </div>
        </>
    );
}

export default Scenes;