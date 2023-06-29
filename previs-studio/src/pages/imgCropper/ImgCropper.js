import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {isEmpty} from 'lodash';
import {useNavigate} from 'react-router-dom';
import AvatarEditor from 'react-avatar-editor'
import {IoMdArrowDropdown} from "react-icons/io";
import Popover from "@mui/material/Popover";
import {Slider, Typography} from "@mui/material";
import {AiFillCloseCircle} from "react-icons/ai";
import {BsFillCheckCircleFill} from "react-icons/bs";
import {TbZoomCode} from "react-icons/tb";
import {FiRotateCcw} from "react-icons/fi";
import {Button} from "react-bootstrap";
import {setImgForCrop} from "../../store/actions/imgActions";

function ImgCropper() {
    const formFromStore = useSelector(store => store.storeImage.formData);
    const editorRef = useRef();
    const [croppedImage, setCroppedImage] = useState(null);
    const [formData, setFormData] = useState({});
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [rotateAnchorEl, setRotateAnchorEl] = React.useState(null);
    const [scale, setScale] = useState(1)
    const [rotate, setRotate] = useState(0)
    const [crop, setCrop] = useState({
        unit: '%',
        width: 50,
        height: 50,
        x: 25,
        y: 25,
        aspect: 600 / 600,
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isEmpty(formFromStore)) {
            setFormData({...formFromStore});
            getImageSize(formFromStore.crop_img)
        } else {
            navigate(-1);
        }
    }, [formFromStore]);

    const handleCropChange = newCrop => {
        setCrop(prevCrop => ({...prevCrop, ...newCrop}));
    };

    const handleCropComplete = ev => {
        ev.preventDefault()
    };

    const getImageSize = (imageUrl) => {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            setScale(img.naturalWidth / img.naturalHeight)
        };
    };

    const handleCrop = (ev) => {
        ev.preventDefault()
        const canvas = editorRef.current.getImageScaledToCanvas();
        formData.cropped_img = canvas.toDataURL()
        dispatch(setImgForCrop(formData))
        navigate(`/scenes/${formData.id}`)
    };

    const handleRangeClose = () => {
        setAnchorEl(null);
        setRotateAnchorEl(null);
    }

    const handleCancelCrop = (ev) => {
        ev.preventDefault()
        delete formFromStore.replace_img
        delete formFromStore.crop_img
        dispatch(setImgForCrop(formData))
        navigate(`/scenes/${formFromStore.id}`)
    }

    return (
        <>
            <div className="content_edit">
                <div className="template_title">
                    <div className="template_numbers"> Explainer Video Pack</div>
                </div>
                <div className="edit_cards_row">
                    <div className="edit_card_left crop_page">
                        <div className="edit_template_div">
                            {formData.crop_img && (
                                <AvatarEditor
                                    ref={editorRef}
                                    image={formData.crop_img}
                                    width={500}
                                    height={350}
                                    border={60}
                                    color={[0, 0, 0, 0.6]} // RGBA
                                    scale={scale}
                                    rotate={rotate}
                                />
                            )}
                        </div>
                        <div className="card_actions">
                            <div className="actions_left crop_img_actions">
                                <div className='edit_page_cropper_action'>
                                    <button aria-describedby={'rotate_action'}
                                            onClick={ev => setRotateAnchorEl(ev.currentTarget)} variant="contained">
                                        <FiRotateCcw/>
                                        <span className='edit_block_bottom_action_title'>Rotate</span>
                                        <IoMdArrowDropdown/>
                                    </button>
                                    <Popover
                                        id={'rotate_action'}
                                        open={Boolean(rotateAnchorEl)}
                                        anchorEl={rotateAnchorEl}
                                        onClose={handleRangeClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        sx={{
                                            '& .MuiPopover-paper': {
                                                width: 460,
                                                border: '1px solid #D2D2DB',
                                                overflow: 'visible',
                                                py: -1,
                                                px: 0
                                            },
                                        }}
                                    >
                                        <Typography sx={{p: 1}}>
                                            <div className='edit_page_duration_range'>
                                                <div className='under_template_duration_range'>
                                                    <Slider
                                                        size="small"
                                                        aria-label="Small"
                                                        valueLabelDisplay="auto"
                                                        min={-180}
                                                        step={0.1}
                                                        value={rotate}
                                                        max={180}
                                                        onChange={(event, newValue) => {
                                                            setRotate(newValue)
                                                        }}
                                                    />
                                                </div>
                                                <div className='under_template_duration_range_buttons_div'>
                                                    <p className='under_template_duration_range_buttons'
                                                       onClick={ev => {
                                                           setAnchorEl(null)
                                                       }}>
                                                        <AiFillCloseCircle
                                                            size={28} color='#3F53D9' cursor={'pointer'}/>
                                                    </p>
                                                    <p className='under_template_duration_range_buttons'
                                                       onClick={ev => setRotateAnchorEl(null)}>
                                                        <BsFillCheckCircleFill
                                                            size={24} color='#9391AA' cursor={'pointer'}/>
                                                    </p>
                                                </div>
                                            </div>
                                        </Typography>
                                    </Popover>
                                    <button aria-describedby={'duration_action'} variant="contained"
                                            onClick={ev => setAnchorEl(ev.currentTarget)}
                                    >
                                        <TbZoomCode size={20} color='#050038'/>
                                        <span className='edit_block_bottom_action_title'>Zoom</span>
                                        <IoMdArrowDropdown/>
                                    </button>
                                    <Popover
                                        id={'duration_action'}
                                        open={Boolean(anchorEl)}
                                        anchorEl={anchorEl}
                                        onClose={handleRangeClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        sx={{
                                            '& .MuiPopover-paper': {
                                                width: 460,
                                                border: '1px solid #D2D2DB',
                                                overflow: 'visible',
                                                py: -1,
                                                px: 0
                                            },
                                        }}
                                    >
                                        <Typography sx={{p: 1}}>
                                            <div className='edit_page_duration_range'>
                                                <div className='under_template_duration_range'>
                                                    <Slider
                                                        size="small"
                                                        aria-label="Small"
                                                        valueLabelDisplay="auto"
                                                        min={0}
                                                        step={0.1}
                                                        value={scale}
                                                        max={5}
                                                        onChange={(event, newValue) => {
                                                            setScale(newValue)
                                                        }}
                                                    />
                                                </div>
                                                <div className='under_template_duration_range_buttons_div'>
                                                    <p className='under_template_duration_range_buttons'
                                                       onClick={ev => {
                                                           setAnchorEl(null)
                                                       }}>
                                                        <AiFillCloseCircle
                                                            size={28} color='#3F53D9' cursor={'pointer'}/>
                                                    </p>
                                                    <p className='under_template_duration_range_buttons'
                                                       onClick={ev => setAnchorEl(null)}>
                                                        <BsFillCheckCircleFill
                                                            size={24} color='#9391AA' cursor={'pointer'}/>
                                                    </p>
                                                </div>
                                            </div>
                                        </Typography>
                                    </Popover>
                                </div>
                                <div className='crop_img_buttons_div'>
                                    <Button className='crop_img_button' onClick={handleCancelCrop} variant="secondary">
                                        Cancel
                                    </Button>
                                    <Button className='crop_img_button' onClick={handleCrop} variant="secondary">
                                        Done
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ImgCropper;
