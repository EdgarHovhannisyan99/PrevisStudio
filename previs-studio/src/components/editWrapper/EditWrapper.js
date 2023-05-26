import React from 'react';
import { Outlet } from 'react-router-dom';
import EditLeftMenu from "../leftMenu/EditLeftMenu";
import EditHeader from "../header/EditHeader";


function EditWrapper(props) {
    return (
        <div className='main'>
            <EditLeftMenu/>
            <EditHeader/>
            <Outlet />
        </div>
    );
}

export default EditWrapper;