import React, {useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import {Button} from "react-bootstrap";
import ReactPlayer from "react-player";
import './templateModal.scss'
import {useSelector} from "react-redux";
import {isEmpty} from "lodash";
import {AiOutlineCloseCircle} from "react-icons/ai";
import {useNavigate} from 'react-router-dom';


function TemplateModal({show, setShow, templateId}) {
    const navigate = useNavigate()
    const template = useSelector((store) => store.templates.singleTemplate);

    return (
        <div className='modal-content'>
            {!isEmpty(template) &&
                <>
                    <Modal centered show={show} onHide={setShow} size='xl' className='custom-template-modal'>
                        <div className='modal-close-button' onClick={setShow}>
                            <AiOutlineCloseCircle size={35} color='#FFFFFF'/>
                        </div>
                        <div className='template-modal'>
                            <div className='modal-video'>
                                <ReactPlayer
                                    url={template.src}
                                    controls={true}
                                    style={{borderRadius: '20px', width: '100%', height: '100%'}}
                                />
                            </div>
                            <div className='about-modal-video'>
                                <div className='about-modal-video-content'>
                                    <h4>Whiteboard Animation Toolkit vol.01</h4>
                                    <div className='template-modal-sizes'>
                                        <div className='size-block-div'>
                                            <div className='_16:9 size-block'/>
                                            <span>16:9</span>
                                        </div>
                                        <div className='size-block-div'>
                                            <div className='_4:9 size-block'/>
                                            <span>4:9</span>
                                        </div>
                                        <div className='size-block-div'>
                                            <div className='_9:16 size-block'/>
                                            <span>9:16</span>
                                        </div>
                                        <div className='size-block-div'>
                                            <div className='_1:1 size-block'/>
                                            <span>1:1</span>
                                        </div>
                                    </div>
                                    <p>If you're running a real estate agency or if you're a freelance realtor, you need
                                        a good
                                        promotional video for sure! No need to panic, because this 3D animation
                                        promotional
                                        video is what you need. </p>
                                    <div className='template-modal-button-div'>
                                        <Button onClick={() => navigate(`/scenes/${templateId}`)}>
                                            Edit this template
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </>
            }
        </div>
    )
}

export default TemplateModal;