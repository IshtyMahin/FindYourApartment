
import { Outlet } from 'react-router-dom';

import MenuBar from '../../Components/MenuBar/MenuBar';


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
