import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getSingleTemplate, shotAction, videoRenderAction} from "../../store/actions/templates";
import {BiEditAlt} from "react-icons/bi";
import {BsFillCheckCircleFill} from "react-icons/bs";
import Popover from '@mui/material/Popover';
import {Slider, Typography} from "@mui/material";
import {IoMdArrowDropdown} from "react-icons/io";
import {AiFillCloseCircle} from "react-icons/ai";
import {isEmpty, template} from "lodash";
import {MdOndemandVideo} from 'react-icons/md'
import EditGenerating from "../../components/generating/EditGenerating";
import EditTemplate from "../../components/editTemplate/EditTemplate";
import ReadYPreview from "../../components/readyPreview/ReadYPreview";
import TextModal from "../../components/modals/TextModal";
import AddImageModal from "../../components/modals/AddImageModal";

function Edit(props) {
    const template = useSelector((store) => store.templates.singleTemplate);
    const formFromStore = useSelector(store => store.storeImage.formData);
    const generatingStatus = useSelector((store) => store.templates.generatingStatus);
    const [textModal, setShowTextModal] = useState(false)
    const [showImgModal, setShowImgModal] = useState(false)
    const [endRange, setEndRange] = useState(0)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {id} = useParams()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({color: '#000000', font: 'arial'})

    const handleChange = (key, value) => {
        setFormData({...formData, [key]: value})
    }

    useEffect(() => {
        if(!isEmpty(formFromStore)) {
            setFormData({...formFromStore})
        }
    }, [formFromStore])

    useEffect(() => {
        dispatch(getSingleTemplate(id))
    }, [])

    useEffect(() => {
        if (!isEmpty(template)) {
            setEndRange(+template.duration)
        }
    }, [template])



    const handleRangeClose = () => {
        setAnchorEl(null);
    }

    const handleOpenRange = (ev) => {
        setAnchorEl(ev.currentTarget)
    }

    const handleClose = () => {
        setShowTextModal(false)
        setShowImgModal(false)
    }

    const handleShot = (ev) => {
        ev.preventDefault()
        formData.duration = endRange
        dispatch(videoRenderAction(formData))
    }

    return (
        <div>
            {!isEmpty(template) &&
                <>
                    <div className="content_edit">
                        <div className="template_title">
                            <div className="template_numbers"> Explainer Video Pack</div>
                        </div>
                        <div className="template_title_tablet">
                            <div className="template_text"> Zoom</div>
                            <div className="template_duration"> All Duration: 01:20 min</div>
                        </div>
                        <div className="edit_cards_row">
                            <div className="edit_card_left">
                                {generatingStatus === 'generate' ?
                                    <EditGenerating/> :
                                    generatingStatus === 'success' ? <ReadYPreview/> :
                                        <>
                                            <EditTemplate id={id} formData={formData} setFormData={setFormData}
                                                          handleChange={handleChange} openTextModal={setShowTextModal}
                                                          openImgModal={setShowImgModal}/>
                                            <div className="card_actions">
                                                <div className="actions_left">
                                                    <button onClick={handleShot} aria-describedby={'still_action'}
                                                            variant="contained">
                                                        <MdOndemandVideo/>
                                                        <span
                                                            className='edit_block_bottom_action_title'>Still Shot</span>
                                                    </button>
                                                    <div className='edit_page_duration_action'>
                                                        <button aria-describedby={'duration_action'} variant="contained"
                                                                onClick={handleOpenRange}>
                                                            <BiEditAlt size={20} color='#050038'/>
                                                            <span
                                                                className='edit_block_bottom_action_title'>Duration</span>
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
                                                                    <p>min: 5 sec</p>
                                                                    <div className='under_template_duration_range'>
                                                                        <Slider
                                                                            size="small"
                                                                            aria-label="Small"
                                                                            valueLabelDisplay="auto"
                                                                            min={5}
                                                                            step={1}
                                                                            value={endRange || +template.duration || 0}
                                                                            max={+template.duration || 0}
                                                                            onChange={(event, newValue) => {
                                                                                setEndRange(newValue)
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <p>max: {template.duration} sec</p>
                                                                    <div
                                                                        className='under_template_duration_range_buttons_div'>
                                                                        <p className='under_template_duration_range_buttons'
                                                                           onClick={ev => {
                                                                               setEndRange(+template.duration)
                                                                               setAnchorEl(null)
                                                                           }}>
                                                                            <AiFillCloseCircle
                                                                                size={28} color='#3F53D9'
                                                                                cursor={'pointer'}/>
                                                                        </p>
                                                                        <p className='under_template_duration_range_buttons'
                                                                           onClick={ev => setAnchorEl(null)}>
                                                                            <BsFillCheckCircleFill
                                                                                size={24} color='#9391AA'
                                                                                cursor={'pointer'}/>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </Typography>
                                                        </Popover>
                                                    </div>
                                                </div>
                                                <div className="actions_right"> Scene
                                                    duration: {endRange || template.duration} sec
                                                </div>
                                            </div>
                                            <TextModal setFormData={setFormData} formData={formData}
                                                       handleChange={handleChange} show={textModal}
                                                       handleClose={handleClose}/>
                                            <AddImageModal setFormData={setFormData} formData={formData}
                                                           handleChange={handleChange} show={showImgModal}
                                                           handleClose={handleClose}/>
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="images_slider">
                        <div className="title">All scenes duration: 01:05 min</div>
                        {/*{!isEmpty(template) &&*/}
                        {/*    <EditSlider templatesData={[{...template}]}/>*/}
                        {/*}*/}
                        <div className="add_action">
                            <a href="#"
                               className="zoom">ZOOM</a>
                            <a href="#"
                               className="add_button">
                                <img src="/images/Edit_files/add_button.png" alt=""/> Add scene </a>
                        </div>
                    </div>
                    <div className="bottom_action edit">
                        <div className="add_action">
                            <a href="#"
                               className="add_button">
                                <img src="/images/Edit_files/add_button.png" alt=""/> Add scene </a>
                        </div>
                        <div className="menu_list">
                            <a href="#"
                               className="list_item">
                                <svg width="22" height="23" viewBox="0 0 22 23" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7.55495 0H1.98042C0.886666 0 0 0.886666 0 1.98042V7.55495C0 8.64871 0.886666 9.53538 1.98042 9.53538H7.55495C8.64871 9.53538 9.53538 8.64871 9.53538 7.55495V1.98042C9.53538 0.886666 8.64871 0 7.55495 0Z"
                                        fill="#A8A6BA"/>
                                    <path
                                        d="M19.8338 0H14.2592C13.1655 0 12.2788 0.886666 12.2788 1.98042V7.55495C12.2788 8.64871 13.1655 9.53538 14.2592 9.53538H19.8338C20.9275 9.53538 21.8142 8.64871 21.8142 7.55495V1.98042C21.8142 0.886666 20.9275 0 19.8338 0Z"
                                        fill="#A8A6BA"/>
                                    <path
                                        d="M7.55495 12.6162H1.98042C0.886666 12.6162 0 13.5029 0 14.5966V20.1712C0 21.2649 0.886666 22.1516 1.98042 22.1516H7.55495C8.64871 22.1516 9.53538 21.2649 9.53538 20.1712V14.5966C9.53538 13.5029 8.64871 12.6162 7.55495 12.6162Z"
                                        fill="#A8A6BA"/>
                                    <path
                                        d="M19.8338 12.6162H14.2592C13.1655 12.6162 12.2788 13.5029 12.2788 14.5966V20.1712C12.2788 21.2649 13.1655 22.1516 14.2592 22.1516H19.8338C20.9275 22.1516 21.8142 21.2649 21.8142 20.1712V14.5966C21.8142 13.5029 20.9275 12.6162 19.8338 12.6162Z"
                                        fill="#A8A6BA"/>
                                </svg>
                                Add </a>
                            <a href="#"
                               className="list_item">
                                <svg width="31" height="30" viewBox="0 0 31 30" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M23.8252 0H6.91685C3.34225 0 0.444458 2.89779 0.444458 6.47239V23.3808C0.444458 26.9554 3.34225 29.8532 6.91685 29.8532H23.8252C27.3998 29.8532 30.2976 26.9554 30.2976 23.3808V6.47239C30.2976 2.89779 27.3998 0 23.8252 0Z"
                                        fill="#A8A6BA"/>
                                    <path
                                        d="M17.6499 7.34808L10.94 14.1322C10.8398 14.2216 10.7719 14.3417 10.747 14.4736L10.4501 16.1808C10.4361 16.2809 10.4451 16.3829 10.4762 16.4791C10.5074 16.5752 10.56 16.6631 10.63 16.736C10.7 16.8088 10.7857 16.8649 10.8805 16.8999C10.9754 16.9349 11.0769 16.9479 11.1775 16.9379L12.7659 16.7598C12.9108 16.7351 13.0452 16.6679 13.1519 16.5668L20.1142 9.85687C20.2366 9.732 20.3051 9.56411 20.3051 9.38926C20.3051 9.2144 20.2366 9.04653 20.1142 8.92166L18.6297 7.34808C18.5684 7.27858 18.493 7.22291 18.4085 7.18478C18.3241 7.14665 18.2324 7.12695 18.1398 7.12695C18.0471 7.12695 17.9555 7.14665 17.871 7.18478C17.7866 7.22291 17.7112 7.27858 17.6499 7.34808Z"
                                        fill="white"/>
                                    <path
                                        d="M22.2518 22.7131H8.44598C8.05227 22.7131 7.67468 22.5567 7.39628 22.2783C7.11789 21.9999 6.96149 21.6223 6.96149 21.2286C6.96149 20.8349 7.11789 20.4573 7.39628 20.1789C7.67468 19.9005 8.05227 19.7441 8.44598 19.7441H22.2518C22.6455 19.7441 23.0231 19.9005 23.3015 20.1789C23.5799 20.4573 23.7363 20.8349 23.7363 21.2286C23.7363 21.6223 23.5799 21.9999 23.3015 22.2783C23.0231 22.5567 22.6455 22.7131 22.2518 22.7131Z"
                                        fill="white"/>
                                </svg>
                                Edit </a>
                            <a href="#"
                               className="list_item">
                                <svg width="25" height="30" viewBox="0 0 25 30" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="1"
                                          d="M7.26727 3.88936V6.32393V21.3767C6.60963 20.9771 5.85458 20.7665 5.08506 20.768C4.26564 20.7648 3.46243 20.9963 2.77042 21.4351C2.0784 21.8739 1.52654 22.5017 1.18009 23.2443C0.833639 23.9869 0.707099 24.8132 0.815433 25.6254C0.923767 26.4376 1.26244 27.2018 1.79141 27.8277C2.32038 28.4535 3.0175 28.9147 3.80034 29.1568C4.58318 29.399 5.41897 29.4118 6.20889 29.1939C6.99881 28.976 7.70979 28.5364 8.25776 27.9271C8.80573 27.3179 9.16775 26.5645 9.30102 25.7559V8.23892L22.4239 4.58708V17.8139C21.7675 17.4098 21.0126 17.1941 20.2417 17.1904C19.4114 17.1837 18.597 17.4181 17.8972 17.8652C17.1975 18.3123 16.6426 18.9528 16.2997 19.7091C15.9569 20.4654 15.8409 21.3049 15.9658 22.1258C16.0907 22.9467 16.4511 23.7137 17.0034 24.3338C17.5556 24.9539 18.276 25.4004 19.077 25.6191C19.878 25.8379 20.7253 25.8194 21.5161 25.5661C22.3069 25.3127 23.0071 24.8354 23.5319 24.1919C24.0567 23.5483 24.3834 22.7664 24.4725 21.9408V0L7.26727 3.88936Z"
                                          fill="#A8A6BA"/>
                                </svg>
                                Music </a>
                            <a href="#"
                               className="list_item">
                                <svg width="31" height="30" viewBox="0 0 31 30" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M24.0555 0H6.46427C3.07824 0 0.333313 2.74492 0.333313 6.13096V23.7222C0.333313 27.1082 3.07824 29.8532 6.46427 29.8532H24.0555C27.4415 29.8532 30.1865 27.1082 30.1865 23.7222V6.13096C30.1865 2.74492 27.4415 0 24.0555 0Z"
                                        fill="#A8A6BA"/>
                                    <path
                                        d="M15.2524 17.4874C16.6708 17.4874 17.8206 16.3376 17.8206 14.9192C17.8206 13.5009 16.6708 12.3511 15.2524 12.3511C13.8341 12.3511 12.6843 13.5009 12.6843 14.9192C12.6843 16.3376 13.8341 17.4874 15.2524 17.4874Z"
                                        fill="white"/>
                                    <path
                                        d="M15.2672 23.1134C13.6459 23.1163 12.0601 22.6382 10.7106 21.7396C9.36112 20.841 8.30851 19.5622 7.68602 18.0652C7.06352 16.5681 6.89913 14.92 7.21363 13.3295C7.52814 11.7389 8.30741 10.2774 9.45282 9.12993C10.5982 7.98243 12.0583 7.20055 13.6483 6.88316C15.2382 6.56578 16.8866 6.72715 18.3848 7.34693C19.883 7.96671 21.1637 9.01701 22.0647 10.3649C22.9658 11.7128 23.4468 13.2977 23.4468 14.919C23.4429 17.0885 22.5803 19.1683 21.0476 20.7037C19.5149 22.2392 17.4367 23.1055 15.2672 23.1134ZM15.2672 9.01069C14.0928 9.01069 12.9448 9.35896 11.9683 10.0114C10.9918 10.6639 10.2307 11.5913 9.78126 12.6763C9.33183 13.7613 9.21424 14.9553 9.44336 16.1071C9.67248 17.259 10.238 18.317 11.0684 19.1474C11.8989 19.9779 12.9569 20.5434 14.1088 20.7726C15.2606 21.0017 16.4546 20.8841 17.5396 20.4346C18.6246 19.9852 19.552 19.2241 20.2045 18.2476C20.857 17.2711 21.2052 16.1231 21.2052 14.9487C21.2052 13.3738 20.5796 11.8635 19.466 10.7499C18.3524 9.63629 16.8421 9.01069 15.2672 9.01069Z"
                                        fill="white"/>
                                </svg>
                                Preview </a>
                            <a href="#"
                               className="list_item">
                                <svg width="31" height="30" viewBox="0 0 31 30" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="1"
                                          d="M23.8689 0H7.76212C3.96615 0 0.888916 3.07724 0.888916 6.8732V22.9799C0.888916 26.7759 3.96615 29.8532 7.76212 29.8532H23.8689C27.6648 29.8532 30.7421 26.7759 30.7421 22.9799V6.8732C30.7421 3.07724 27.6648 0 23.8689 0Z"
                                          fill="#A8A6BA"/>
                                    <path
                                        d="M14.368 20.041L19.9052 15.8547C20.0708 15.7504 20.2073 15.6058 20.3018 15.4345C20.3964 15.2632 20.446 15.0706 20.446 14.8749C20.446 14.6792 20.3964 14.4867 20.3018 14.3154C20.2073 14.144 20.0708 13.9994 19.9052 13.8951L14.368 9.75343C13.2101 8.89242 11.2061 9.50104 11.2061 10.748V19.0167C11.1912 20.3082 13.1953 20.9168 14.368 20.041Z"
                                        fill="white"/>
                                </svg>
                                Publish </a>
                        </div>
                        <a href="#"
                           className="hamburger_menu">
                            <svg width="31" height="20" viewBox="0 0 31 20" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 2H28.9231" stroke="#FF6575" strokeWidth="3" strokeLinecap="round"/>
                                <path d="M2 10H28.9231" stroke="#FF6575" strokeWidth="3" strokeLinecap="round"/>
                                <path d="M2 18H28.9231" stroke="#FF6575" strokeWidth="3" strokeLinecap="round"/>
                            </svg>
                        </a>
                    </div>
                </>
            }
        </div>
    );
}

export default Edit;