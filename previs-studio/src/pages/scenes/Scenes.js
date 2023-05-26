import React, {useEffect, useRef, useState} from 'react';
import ReactPlayer from "react-player";
import {useDispatch, useSelector} from "react-redux";
import {clearSingleTemplate, getAllTemplates, getSingleTemplate} from "../../store/actions/templates";
import TemplateModal from "../../components/modals/TemplateModal";
import moment from "moment";

function Scenes(props) {
    const playerRefs = useRef([]);
    const [playId, setPlayId] = useState(0)
    const [currentId, setCurrentId] = useState(null)
    const [showTemplateModal, setShowTemplate] = useState(false)
    let templates = useSelector(store => store.templates.templatesList)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllTemplates())
    }, [])

    const handlePlay = (ev) => {
        setPlayId(+ev.currentTarget.id)
    }

    const handleStop = (index) => {
        playerRefs.current[index].seekTo(0)
        setPlayId(0)
    }

    const handleOpen = (ev) => {
        setCurrentId(ev.currentTarget.id)
        dispatch(getSingleTemplate(ev.currentTarget.id));
        setShowTemplate(true)
    }

    const handleClose = () => {
        setShowTemplate(false)
        dispatch(clearSingleTemplate())
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
                            <div id={template.id} onClick={handleOpen} className="item_image video-player"
                                 onMouseEnter={handlePlay} onMouseLeave={ev => handleStop(ev.currentTarget.id)}>
                                <ReactPlayer
                                    ref={(player) => (playerRefs.current[template.id] = player)}
                                    url={template.name}
                                    playing={playId === template.id}
                                    controls={false}
                                    volume={0}
                                    width="640px"
                                    height="220px"
                                    playbackRate={1.0}
                                    style={{borderRadius: '20px'}}
                                />
                            </div>

                            <div className="item_texts">
                                <div className="item_title">{template.title}</div>
                                <div
                                    className="item_duration"> Duration: {template.duration ? (moment.utc(template.duration * 1000).format('mm:ss')) : ''} sec.
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <TemplateModal setId={setCurrentId} templateId={currentId} show={showTemplateModal}
                               setShow={handleClose}/>

            </div>

        </>
    );
}

export default Scenes;