import React from 'react';
import {Typography} from "@mui/material";
import {FcRemoveImage, FcUpload} from "react-icons/fc";
import {styled} from "@mui/system";
import Tooltip, {tooltipClasses} from "@mui/material/Tooltip";
import {MdModeEditOutline} from "react-icons/md";
import {useNavigate} from "react-router-dom";

function ImgReplacerBox({handleSelectFile, formData, setFormData}) {
    const navigate = useNavigate()
    const HtmlTooltip = styled(({className, ...props}) => (
        <Tooltip {...props} classes={{popper: className}}/>
    ))(({theme}) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#ffffff',
            color: 'rgba(0, 0, 0, 0.87)',
            textAlign: 'center',
            maxWidth: 140,
            display: 'flex',
            border: '1px solid #dadde9',
            margin: 0
        },
    }));

    return (
        <>
            <img className='cropped_img_on_template' src={formData.cropped_img} alt='img' style={{display: 'flex'}}/>
            <div style={{display: "flex", position: 'absolute', width: '100%', height: '100%', zIndex: 999}}>
                <HtmlTooltip
                    className="loggerTooltip"
                    style={{
                        flexWrap: 'wrap',
                        backgroundColor: 'transparent',
                        width: '250px',
                        height: '108px',
                        margin: '0 !important'
                    }}
                    title={
                        (<React.Fragment>
                            <div
                                style={{
                                    overflowY: 'scroll',
                                }
                                }
                            >
                                <Typography>
                                    <div style={{display: "flex", flexDirection: 'column', justifyContent: "center"}}>
                                            <label htmlFor='upload_img_form_edit' className='typography-div'
                                                   style={{width: '100%', fontSize: '1em'}}>
                                                <div className='upload_img_form_edit_button'>
                                                    <FcUpload color='black d-flex align-items-centerm justify-content-center'/>
                                                    <span>Upload</span>
                                                </div>
                                            </label>
                                            <input type="file" id='upload_img_form_edit' accept="image/*" style={{
                                                display: "none",
                                                visibility: 'hidden'
                                            }} onChange={ev => {
                                                handleSelectFile('replace_img', ev.target.files[0])
                                            }}/>
                                            <label htmlFor='edit_img_form_edit' className='typography-div'
                                                   style={{width: '100%', fontSize: '1em'}}>
                                                <div className='upload_img_form_edit_button d-flex align-items-centerm justify-content-center'>
                                                    <MdModeEditOutline color='black'/>
                                                    <span>Edit</span>
                                                </div>
                                            </label>
                                            <input type="button" id='edit_img_form_edit' accept="image/*" style={{
                                                display: "none",
                                                visibility: 'hidden'
                                            }} onClick={ev => {
                                                navigate('/image_cropper')
                                            }}/>
                                        <label htmlFor='remove_img_form_edit' className='typography-div'
                                                   style={{width: '100%', fontSize: '1em'}}>
                                                <div className='upload_img_form_edit_button d-flex align-items-centerm justify-content-center'>
                                                    <FcRemoveImage color='black'/>
                                                    <span>Remove</span>
                                                </div>
                                            </label>
                                            <input type="button" id='remove_img_form_edit' accept="image/*" style={{
                                                display: "none",
                                                visibility: 'hidden'
                                            }} onClick={ev => {
                                                delete formData.cropped_img
                                                delete formData.crop_img
                                                setFormData({...formData})
                                            }}/>
                                    </div>
                                </Typography>
                            </div>
                        </React.Fragment>)
                    }
                >
                </HtmlTooltip>
            </div>
        </>
    );
}

export default ImgReplacerBox;