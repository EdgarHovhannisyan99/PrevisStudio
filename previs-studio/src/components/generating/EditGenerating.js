import React from 'react';
import ReactPlayer from "react-player";

function EditGenerating(props) {
    return (
        <div>
            <div className="card_image">
                <div className="video_wrapper">
                    <ReactPlayer
                        url='/videos/preloader.mp4'
                        playing={true}
                        loop={true}
                        controls={false}
                    />
                </div>
                <div className='cancel_generate_div'>
                    Cancel Rendering
                </div>
            </div>
        </div>
    );
}

export default EditGenerating;