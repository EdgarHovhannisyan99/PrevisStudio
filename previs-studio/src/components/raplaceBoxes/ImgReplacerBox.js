import React from 'react';
import {Typography} from "@mui/material";
import {FcUpload} from "react-icons/fc";
import {styled} from "@mui/system";
import Tooltip, {tooltipClasses} from "@mui/material/Tooltip";

function ImgReplacerBox({handleSelectFile}) {

    const HtmlTooltip = styled(({className, ...props}) => (
        <Tooltip {...props} classes={{popper: className}}/>
    ))(({theme}) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#ffffff',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 300,
            display: 'flex',
            border: '1px solid #dadde9',
            margin: 0
        },
    }));

    return (
        <div style={{display: 'flex'}}>
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
                                <label htmlFor='upload_img_form_edit' className='typography-div'
                                       style={{width: '100%', fontSize: '1em'}}>
                                    <div className='upload_img_form_edit_button'>
                                        <FcUpload color='black'/>
                                        <span>Upload</span>
                                    </div>
                                </label>
                                <input type="file" id='upload_img_form_edit' accept="image/*" style={{
                                    display: "none",
                                    visibility: 'hidden'
                                }} onChange={ev => {
                                    handleSelectFile('replace_img', ev.target.files[0])
                                }}/>
                            </Typography>
                        </div>
                    </React.Fragment>)
                }
            >
            </HtmlTooltip>
        </div>
    );
}

export default ImgReplacerBox;