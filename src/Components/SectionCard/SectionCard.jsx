
import { Link, useParams } from 'react-router-dom';
import DetailCard from '../DetailCard/DetailCard';
import { useContext, useState } from 'react';
import AuthContext from '../../UseContext/UserProvider';
import LoginModal from '../LoginModal/LoginModal';

const SectionCard = ({ division, apartments }) => {
    const { division: routeDivision } = useParams();
    const { loggedIn } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false); 

    if (routeDivision) division = routeDivision;
    console.log(division,apartments);
    const displayApartments = routeDivision ? apartments : apartments.slice(0, 4);

    const closeModal = () => {
        setShowModal(false);
    };
   

    const handleViewAllClick = (e) => {
        if (!loggedIn) {
            e.preventDefault();
            setShowModal(true);
        }
    };

    return (
        <div className='my-16'>
            
            {displayApartments.length > 0 ? (
                <>
                    {showModal && <LoginModal closeModal={closeModal} value={`You need to log in to view all apartments of ${division}.`} />}
                    <h1 className='bg-slate-300 md:p-8 sm:p-6 border-slate-800 md:mx-16 text-2xl md:text-3xl lg:text-4xl my-6 text-center rounded-xl  font-bold'>
                        Popular Apartment of {division}
                    </h1>
                    <div className='grid md:grid-cols-2 gap-6'>
                        {displayApartments.map(apartment => (
                            <DetailCard key={apartment.id} apartment={apartment} />
                        ))}
                    </div>
                    <div className='flex mx-auto justify-center my-3'>
                        <Link to={`/filter/division=${division}`} onClick={handleViewAllClick}>
                            <button className="btn btn-accent">View ALL</button>
                        </Link>
                    </div>
                </>
            ) : (
                ""
            )}
        </div>
    );
};

export default SectionCard;
