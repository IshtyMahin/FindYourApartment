import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../../UseContext/UserProvider';
import axios from 'axios';

const ApartmentDetails = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [apartment, setApartment] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0); 
    const [isFavorite, setIsFavorite] = useState(false);

    const { id } = useParams();
    const params = new URLSearchParams(id);
    const apartment_id = params.get('id');

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/apartment/list/${apartment_id}`)
            .then(response => response.json())
            .then(data => {
                setApartment(data);
            })
            .catch(error => {
                console.error('Error fetching apartment:', error);
            });
    }, [apartment_id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/apartment/favorites/?user=${user.id}&apartment=${apartment_id}`);
                if (response.data.length > 0) {
                    setIsFavorite(true);
                 }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [isFavorite]);


    if (!apartment) {
        return <div>Loading...</div>;
    }

    const handlePrev = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? apartment.images.length - 1 : prevSlide - 1));
    };

    const handleNext = () => {
        setCurrentSlide((prevSlide) => (prevSlide === apartment.images.length - 1 ? 0 : prevSlide + 1));
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/apartment/list/${apartment_id}`)
            navigate('/')
            console.log('Apartment deleted successfully');
        } catch (error) {
            console.error('Error deleting apartment:', error);
        }
    };

    const toggleFavorite = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/apartment/favorites/?user=${user.id}&apartment=${apartment_id}`);
            console.log(response.data);
            if (response.data.length > 0) {
                const favoriteId = response.data[0].id;
                const deleteFav=await axios.delete(`http://127.0.0.1:8000/api/apartment/favorites/${favoriteId}`);
                setIsFavorite(false);
            } else {
                const addFav = await axios.post('http://127.0.0.1:8000/api/apartment/favorites/', {
                    user: user.id,
                    apartment: apartment_id,
                });
                console.log(addFav.data);
                setIsFavorite(true);
            }
        } catch (error) {
            console.error('error', error);
        }
    };


    return (
        <div className=" top-0 left-0  w-full h-full bg-slate-300 bg-opacity-90 z-50 flex justify-center items-center">
            <div className="max-w-4xl w-full my-16 bg-white p-8 rounded-lg shadow-xl overflow-hidden">
                <div className="carousel relative">
                    <img src={apartment.images[currentSlide]?.image} className="w-full" alt={`Slide ${currentSlide + 1}`} />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <button onClick={handlePrev} className="btn btn-circle">❮</button>
                        <button onClick={handleNext} className="btn btn-circle">❯</button>
                    </div>
                </div>
                <div className="mt-8">
                    <h2 className="text-2xl font-bold">{apartment.address}, {apartment.division}</h2>
                    <p className="text-xl font-bold text-gray-800 mb-4">Price: BDT {apartment.price}</p>
                    <p className="text-lg text-gray-800">Bedrooms: {apartment.bed}, Bathrooms: {apartment.bath}</p>
                    <p className="text-lg text-gray-800">Size: {apartment.size} sq ft</p>
                    <p className="text-lg text-gray-800">Description: {apartment.description}</p>
                </div>
                {user.user_type === 'apartment_owner' && user.id=== apartment.owner_id ?(
                    <div className="flex justify-between items-center mt-8">
                       <Link to={`/apartmentDetails/update/id=${apartment.id}`}><button className="btn btn-accent flex items-center">
                            Update
                        </button></Link> 
                        <button onClick={handleDelete} className="btn btn-error   flex items-center">
                            Delete
                        </button>
                    </div>
                ):
                <div className="flex justify-between items-center mt-8">
                        <button onClick={toggleFavorite} className={`btn btn-accent flex items-center ${isFavorite ? 'btn-error' : 'btn-accent '}`}>
                            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                        </button>
                    <button className="btn btn-primary flex items-center">
                        Book Now
                    </button>
                </div>}
            </div>
        </div>
    );
};

export default ApartmentDetails;
