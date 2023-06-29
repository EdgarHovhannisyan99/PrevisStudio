import React from 'react';
import {useDispatch} from "react-redux";
import {setImgForCrop} from "../../store/actions/imgActions";
import {useNavigate} from "react-router-dom";
import ImgReplacerBox from "../raplaceBoxes/ImgReplacerBox";
import CroppedImgReplacerBox from "../raplaceBoxes/CroppedImgReplacerBox";

function EditTemplate({setFormData, formData, id, openTextModal}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleSelectFile = (key, file) => {
        setFormData({...formData, [key]: file, crop_img: URL.createObjectURL(file), id})
        formData[key] = file
        formData['id'] = id
        formData['crop_img'] = URL.createObjectURL(file)
        dispatch(setImgForCrop(formData))
        navigate('/image_cropper')
    }

    return (
        <div className='edit_template_div'>
            <img className='edit_template_img' src="http://localhost:5000/freamImages/main_frame.png" alt="img"/>
            <div className='text_replacer_div' onClick={() => openTextModal(true)}/>
            {formData.cropped_img ?
                <div
                    id='video_popover'
                    className='template_img_uploader_div cropped_img'>
                    <CroppedImgReplacerBox setFormData={setFormData} formData={formData} handleSelectFile={handleSelectFile}/>
                </div>
                :
                <div
                    id='video_popover'
                    className='template_img_uploader_div'>
                    <ImgReplacerBox handleSelectFile={handleSelectFile}/>
                </div>
            }
        </div>
    );
}

export default EditTemplate;
