import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form} from "react-bootstrap";
import Select from 'react-select'
import {hexToRgb} from "@mui/system";
import {AiFillCloseCircle} from "react-icons/ai";
import {BsFillCheckCircleFill} from "react-icons/bs";

const fonts = [
    {id: 1, value: "Arial"},
    {id: 2, value: "Italic"},
    {id: 3, value: "Helvetica"},
    {id: 4, value: "Times New Roman"},
    {id: 5, value: "Roboto"},
    {id: 6, value: "Courier New"},
    {id: 7, value: "Verdana"},
    {id: 8, value: "Impact"},
    {id: 9, value: "Georgia"},
    {id: 10, value: "Trebuchet MS"},
    {id: 11, value: "Comic Sans MS"},
]

function TextModal({handleClose, show, formData, handleChange, setFormData}) {

    return (
        <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
               centered>
            <Modal.Body className='custom-styles-for-modal-body'>
                <div className='edit-page-text-modal-div'>
                    <div className='edit-page-text-modal-configs'>
                        <Form>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label><span
                                    className='text_modal_label'>{formData.text ? formData.text.length : 0}/90 characters</span></Form.Label>
                                <div className='text_modal_input_div'>
                                    <span>Text</span>
                                    <Form.Control maxLength={90} onChange={ev => handleChange('text', ev.target.value)}
                                                  style={{color: formData.color, fontFamily: formData.font}}
                                                  type='text'
                                                  value={formData.text || ''}
                                    />
                                </div>
                            </Form.Group>
                        </Form>
                        <div className='text_modal_footer'>
                            <p className='text_modal_footer_title text_modal_size'>
                                <span> Size:</span>
                                <Form.Control onChange={ev => handleChange('size', ev.target.value)}
                                              type='number'
                                              value={formData.size || ''}
                                              style={{
                                                  width: '80px',
                                                  height: '30px',
                                                  fontSize: '13px'
                                              }}
                                              max={100}
                                />
                            </p>
                            <div className='text_modal_footer_color'>
                                <p className='text_modal_footer_title'>
                                    Color:
                                </p>
                                <p><Form>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Control value={formData.color || ''} className='text-color' type='color'
                                                      onChange={ev => {
                                                          setFormData({
                                                              ...formData,
                                                              color: ev.target.value,
                                                              rgb: hexToRgb(ev.target.value)
                                                          })
                                                      }}
                                        />
                                    </Form.Group>
                                </Form></p>
                                <p style={{color: formData.color, marginLeft: '20px'}}>{formData.color}</p>
                            </div>
                            <div className='text_modal_footer_color'>
                                <p className='text_modal_footer_title'>
                                    Font:
                                </p>
                                <p>
                                    <Select
                                        className='text-aria-select'
                                        defaultValue={fonts[0]}
                                        getOptionLabel={i => i.value}
                                        value={formData.font ? fonts.find(f => f.value === formData.font) : {}}
                                        onChange={ev => {
                                            handleChange('font', ev.value)
                                        }}
                                        options={fonts}
                                    />
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='edit-page-text-modal-buttons'>
                        <p>
                            <AiFillCloseCircle
                                size={28} color='#3F53D9' cursor={'pointer'} onClick={handleClose}/>
                        </p>
                        <p>
                            <BsFillCheckCircleFill onClick={handleClose}
                                                   size={24} color='#9391AA' cursor={'pointer'}/>
                        </p>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default TextModal;