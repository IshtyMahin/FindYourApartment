import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../UseContext/UserProvider';
import LoginModal from '../LoginModal/LoginModal';

const FilterForm = () => {
    const {  loggedIn } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const [division, setDivision] = useState('');
    const [partialAddress, setPartialAddress] = useState('');
    const [bed, setBed] = useState('');
    const [bath, setBath] = useState('');
    const [size, setSize] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [searchMessage, setSearchMessage] = useState(''); 
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!loggedIn) {
            setShowModal(true);
            return;
        }
        
        const params = new URLSearchParams();

        if (division) params.append('division', division);
        if (partialAddress) params.append('partial_address', partialAddress);
        if (bed) params.append('bed', bed);
        if (bath) params.append('bath', bath);
        if (size) params.append('size', size);
        if (minPrice) params.append('min_price', minPrice);
        if (maxPrice) params.append('max_price', maxPrice);

        

        if (!params.toString()) {
            navigate(`/`)
            setSearchMessage('Please select at least one filter');
            return;
        }
        navigate(`/filter/${params.toString()}`);
        setSearchMessage(`Searching for apartments${params.toString() && ' with the following filters: ' + params.toString() }`);
    };
   
    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="bg-center">
            <div className="md:m-16 rounded-xl flex items-center justify-center h-full bg-slate-300 md:p-16 bg-opacity-50">
                {showModal && <LoginModal closeModal={closeModal} value="You need to log in to search for apartments." />}
                <div className="p-8 bg-white rounded-lg shadow-lg ">
                    <h1 className="text-2xl font-bold mb-4">Search Apartment for rent in Bangladesh</h1>
                    <form className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-6" onSubmit={handleSubmit}>
                        <select className="select select-bordered" onChange={(e) => setDivision(e.target.value)} value={division}>
                            <option value="">Select Division</option>
                            <option value="Dhaka">Dhaka</option>
                            <option value="Chittagong">Chittagong</option>
                            <option value="Khulna">Khulna</option>
                            <option value="Rajshahi">Rajshahi</option>
                            <option value="Rangpur">Rangpur</option>
                            <option value="Sylhet">Sylhet</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Enter location"
                            className="input input-bordered"
                            onChange={(e) => setPartialAddress(e.target.value)}
                            value={partialAddress}
                        />
                        <select className="select select-bordered" onChange={(e) => setBed(e.target.value)} value={bed}>
                            <option value="">Beds</option>
                            <option value="1">1 Bed</option>
                            <option value="2">2 Beds</option>
                            <option value="3">3 Beds</option>
                            <option value="4">4 Beds</option>
                            <option value="5">5 Beds</option>
                            <option value="6">6 Beds</option>
                            <option value="7">7+ Beds</option>
                        </select>
                        <select className="select select-bordered" onChange={(e) => setBath(e.target.value)} value={bath}>
                            <option value="">Bath</option>
                            <option value="1">1 Bath</option>
                            <option value="2">2 Baths</option>
                            <option value="3">3 Baths</option>
                            <option value="4">4 Baths</option>
                            <option value="5">5 Baths</option>
                            <option value="6">6 Baths</option>
                            <option value="7">7+ Baths</option>
                        </select>
                        <input
                            type="number"
                            placeholder="Area (sqft)"
                            className="input input-bordered"
                            onChange={(e) => setSize(e.target.value)}
                            value={size}
                        />
                        <input
                            type="number"
                            placeholder="Min Price (BDT)"
                            className="input input-bordered"
                            onChange={(e) => setMinPrice(e.target.value)}
                            value={minPrice}
                        />
                        <input
                            type="number"
                            placeholder="Max Price (BDT)"
                            className="input input-bordered"
                            onChange={(e) => setMaxPrice(e.target.value)}
                            value={maxPrice}
                        />
                        {searchMessage && <p className="col-span-full text-center text-success     text-xl mb-4">{searchMessage}</p>}
                        <button type="submit" className="btn btn-accent text-xl col-span-full mt-4">
                            Find
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FilterForm;
