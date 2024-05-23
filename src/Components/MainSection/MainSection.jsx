import  { useEffect, useState } from 'react';
import SectionCard from '../SectionCard/SectionCard';

const MainSection = () => {
    const [apartments, setApartments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://findyourapartmentbackend.onrender.com/api/apartment/list/')
            .then(response => response.json())
            .then(data => {
                setApartments(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('error', error);
                setLoading(false);
            });
    }, []);

    const filterApartmentsByDivision = (division) => {
        return apartments.filter(apartment => apartment.division === division);
    };

    if (loading) {
        return <div className='flex justify-center my-16'><span className="loading loading-spinner loading-lg"></span></div>
    }

    const divisions = ["Dhaka", "Chittagong", "Khulna", "Rajshahi", "Rangpur", "Sylhet"];

    return (
        <div>
            {divisions.map(division => (
                <SectionCard key={division} division={division} apartments={filterApartmentsByDivision(division)} />
            ))}
        </div>
    );
};

export default MainSection;
