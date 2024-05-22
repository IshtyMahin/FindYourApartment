import React, { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import MenuBar from '../../Components/MenuBar/MenuBar';
import AuthContext from '../../UseContext/UserProvider';

const OwnerPage = () => {
    
    

    return (
        <div className='md:mx-6'>

            <MenuBar />
            <div className='p-6'>
                <Outlet />
            </div>
        </div>
    );
};

export default OwnerPage;
