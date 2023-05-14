import React from 'react';
import Header from "../header/Header";
import LeftMenu from "../leftMenu/LeftMenu";
import { Outlet } from 'react-router-dom';


function Wrapper(props) {
    return (
        <div className='main'>
            <LeftMenu/>
            <Header/>
            <Outlet />
        </div>
    );
}

export default Wrapper;