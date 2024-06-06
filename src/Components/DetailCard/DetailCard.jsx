import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModal from '../LoginModal/LoginModal';
import AuthContext from '../../UseContext/UserProvider';



const DetailCard = ({ apartment }) => {
    const { loggedIn } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false); 
    if (!apartment) {
        return null; 
    }
    const {id, price, images, size, bed, bath, description, address, division } = apartment;
    const [currentSlide, setCurrentSlide] = useState(0);
    console.log(images);
    const navigate = useNavigate();
    const handlePrev = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
    };

    const handleNext = () => {
        setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
    };

    const handleDetailsClick = () => {
        if (!loggedIn) {
            setShowModal(true);
            return;
        }
        navigate(`/apartmentDetails/id=${id}`);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className={`card lg:card-side bg-base-100 shadow-xl container mx-auto`}>
            {showModal && <LoginModal closeModal={closeModal} value="You need to log in to view for apartments details." />}
            <div className="carousel md:w-1/2 relative">
                <img src={images[currentSlide]?.image_url} className="w-full" alt={`Slide ${currentSlide + 1}`} />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <button onClick={handlePrev} className="btn btn-circle">❮</button>
                    <button onClick={handleNext} className="btn btn-circle">❯</button>
                </div>
            </div>
            <div className="card-body md:w-1/2">
                <h2 className="card-title">Apartment in {address},{ division}</h2>
                <p className="text-xl font-bold">Price: BDT {price}</p>
                <p className="text-lg">Bed: {bed} ,Bath: {bath}</p>
                <p className="text-lg"> </p>
                <p className="text-lg">Size: {size} sq ft</p>
                <button onClick={handleDetailsClick} className="btn btn-accent mt-4">View Details</button>
            </div>
        </div>
    );
};

export default DetailCard;
