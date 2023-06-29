import React, {useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import {Button} from "react-bootstrap";
import ReactPlayer from "react-player";
import './templateModal.scss'
import {useSelector} from "react-redux";
import {isEmpty} from "lodash";
import {AiOutlineCloseCircle} from "react-icons/ai";
import {useNavigate} from 'react-router-dom';
import {IoIosAddCircle} from "react-icons/io";


function AddImageModal({show, handleClose, setFormData, handleChange}) {

    return (
        <Modal centered show={show} size={'lg'} onHide={handleClose} className='custom-template-modal'>
            <Modal.Header closeButton>
                <Modal.Title>My Images</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='add_image_modal_body'>
                    <div className='add_image_modal_image_block'>
                        <label className='add_image_modal_image_label' htmlFor="add_new_img">
                            <IoIosAddCircle color='#4262FF' size={50}/>
                            <p>Add Image</p>
                        </label>
                        <input type="file" accept="image/*" style={{display: 'none'}} id='add_new_img'
                               onChange={ev => {
                                   handleChange('img', ev.target.files[0])
                               }}
                        />
                    </div>

                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AddImageModal;