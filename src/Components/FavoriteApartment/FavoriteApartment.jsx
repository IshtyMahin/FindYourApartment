
import DetailCard from '../DetailCard/DetailCard';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../../UseContext/UserProvider';

const FavoriteApartments = () => {
    const { user, allApartment, setAllApartment } = useContext(AuthContext);
    
    const [favoriteApartments, setFavoriteApartments] = useState([]);
    useEffect(() => {
        const fetchFavoriteApartments = async () => {
            try {
                const favoriteResponse = await axios.get(`https://findyourapartmentbackend.onrender.com/api/apartment/favorites/?user=${user.id}`);
                const favoriteApartmentIds = favoriteResponse.data.map(favorite => favorite.apartment);

                const apartmentDetailsPromises = favoriteApartmentIds.map(async apartmentId => {
                    const response = await axios.get(`https://findyourapartmentbackend.onrender.com/api/apartment/list/${apartmentId}`);
                    return response.data;
                });

                const favoriteApartmentsDetails = await Promise.all(apartmentDetailsPromises);
                setFavoriteApartments(favoriteApartmentsDetails);
            } catch (error) {
                console.error('error', error);
            }
        };

        fetchFavoriteApartments();
    }, [user.id, allApartment]);

    console.log(favoriteApartments);
    return (
        <div className='my-16'>

            {favoriteApartments.length > 0 ? (
                <>
                    <h1 className='bg-slate-300 md:p-8 sm:p-6 border-slate-800 md:mx-16 text-2xl md:text-3xl lg:text-4xl my-6 text-center rounded-xl  font-bold'>
                        My Favorite Apartment
                    </h1>
                    <div className='grid md:grid-cols-2 gap-6'>
                        {favoriteApartments.map(apartment => (
                            <DetailCard key={apartment.id} apartment={apartment} />
                        ))}
                    </div>
                </>
            ) : (

                (<h1 className='bg-slate-300 md:p-8 sm:p-6 border-slate-800 md:mx-16 text-2xl md:text-3xl lg:text-4xl my-6 text-center rounded-xl  font-bold'>
                    No Apartment Found
                </h1>)

            )}
        </div>
    );
};

export default FavoriteApartments;
