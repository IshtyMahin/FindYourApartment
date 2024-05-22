import { useContext, useState } from 'react';

import AuthContext from '../../UseContext/UserProvider';
import FavoriteApartments from '../FavoriteApartment/FavoriteApartment';
import UpdateProfile from '../UpdateProfile/UpdateProfile';

const ProfileCard = () => {
    
    const { user } = useContext(AuthContext);
    const [showFavoriteApartments, setShowFavoriteApartments] = useState(false);
    const [showUpdateForm, setshowUpdateForm] = useState(false);

    const handleUpdateClick = () => {
        setShowFavoriteApartments(false);
        setshowUpdateForm(true)
    };

    const handleShowFavoriteClick = () => {
        setShowFavoriteApartments(true);
        setshowUpdateForm(false)

    };

    if (!user) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    return (
        <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
            <div className="bg-white shadow-md rounded-lg w-full max-w-lg p-6">
                <div className="grid grid-cols-1 gap-4 mb-4">
                    <div className='border-2 p-2 rounded-xl'>
                        <h2 className="text-2xl font-bold">Username:</h2>
                        <p className="text-gray-600">{user.username}</p>
                    </div>
                    <div className='border-2 p-2 rounded-xl'>
                        <h2 className="text-2xl font-bold">Email:</h2>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                    <div className='border-2 p-2 rounded-xl'>
                        <h2 className="text-2xl font-bold">User Type:</h2>
                        <p className="text-gray-600">{user.user_type}</p>
                    </div>
                    <div className='border-2 p-2 rounded-xl'>
                        <h2 className="text-2xl font-bold">Mobile Number:</h2>
                        <p className="text-gray-600">{user.mobile_number}</p>
                    </div>
                </div>

                <div className="flex justify-between">
                    <button
                        onClick={handleUpdateClick}
                        className="btn btn-primary w-5/12"
                    >
                        Update Profile
                    </button>
                    <button onClick={handleShowFavoriteClick} className="btn btn-secondary w-5/12">
                        Favourite Apartments
                    </button>
                </div>
            </div>
            {showFavoriteApartments && <FavoriteApartments />}
            {showUpdateForm && <UpdateProfile/>}

        </div>

    );
};

export default ProfileCard;
