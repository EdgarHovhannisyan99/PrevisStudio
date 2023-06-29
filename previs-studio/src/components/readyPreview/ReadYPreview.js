import React from 'react';
import ReactPlayer from "react-player";
import {useDispatch} from "react-redux";
import {returnToEdit} from "../../store/actions/templates";
const {REACT_APP_API_URL} = process.env
function ReadYPreview(props) {
    const dispatch = useDispatch()

    return (
        <div>
            <div className="card_image">
                <div className='ready_preview_template'>
                    <ReactPlayer
                        url={`${REACT_APP_API_URL}/templates/test-preview.mp4`}
                        controls={true}
                    />
                </div>
                <div onClick={ev => dispatch(returnToEdit())} className='cancel_generate_div'>
                    Return to edit
                </div>
            </div>
        </div>
    );
}

export default ReadYPreview;