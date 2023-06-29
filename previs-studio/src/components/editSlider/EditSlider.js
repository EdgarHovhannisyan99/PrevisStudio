import React, {useRef, useState} from 'react';
import {BiDotsHorizontalRounded} from "react-icons/bi";
import ReactPlayer from "react-player";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


function EditSlider({templatesData}) {
    const playerRefs = useRef([]);
    const [playId, setPlayId] = useState(0)
    const [templates, setTemplates] = useState([...templatesData])

    const handlePlay = (ev) => {
        setPlayId(+ev.currentTarget.id)
    }

    const handleDragOver = e => {
        e.preventDefault();
    };

    const handleDragEnd = result => {
        if (!result.destination) return;

        const { source, destination } = result;
        const updatedBoxes = Array.from(boxes);
        const [movedBox] = updatedBoxes.splice(source.index, 1);
        updatedBoxes.splice(destination.index, 0, movedBox);

        setTemplates(updatedBoxes);
    };

    const handleStop = (index) => {
        playerRefs.current[index].seekTo(0)
        setPlayId(0)
    }



    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    return (
        <div className="images_row">
            {Array.isArray(templates) &&
                templates.map((template, index) => (
                   <>
                       <div className="actions_item">
                           <div className='edit_page_bottom_slider_dots'>
                               <BiDotsHorizontalRounded size={28}/>
                           </div>

                           <div className="action_image" id={template.id} onMouseEnter={handlePlay}
                                onMouseLeave={ev => handleStop(ev.currentTarget.id)}>
                               <ReactPlayer
                                   ref={(player) => (playerRefs.current[template.id] = player)}
                                   url={template.src}
                                   playing={playId === template.id}
                                   controls={false}
                                   volume={0}
                                   width="220px"
                                   height='140px'
                                   playbackRate={1.0}
                                   style={{borderRadius: '10px'}}
                               />
                           </div>
                       </div>
                       <div className="actions_item">
                           <div className='edit_page_bottom_slider_dots'>
                               <BiDotsHorizontalRounded size={28}/>
                           </div>

                           <div className="action_image" id={template.id} onMouseEnter={handlePlay}
                                onMouseLeave={ev => handleStop(ev.currentTarget.id)}>
                               <ReactPlayer
                                   ref={(player) => (playerRefs.current[template.id] = player)}
                                   url={template.src}
                                   playing={playId === template.id}
                                   controls={false}
                                   volume={0}
                                   width="220px"
                                   height='140px'
                                   playbackRate={1.0}
                                   style={{borderRadius: '10px'}}
                               />
                           </div>
                       </div>
                   </>
                ))
            }
        </div>
    );
}

export default EditSlider;