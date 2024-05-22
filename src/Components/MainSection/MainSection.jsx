import React, { useEffect, useState } from 'react';
import SectionCard from '../SectionCard/SectionCard';

const MainSection = () => {
    const [apartments, setApartments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/apartment/list/')
            .then(response => response.json())
            .then(data => {
                setApartments(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching apartments:', error);
                setLoading(false);
            });
    }, []);

    const filterApartmentsByDivision = (division) => {
        return apartments.filter(apartment => apartment.division === division);
    };

    if (loading) {
        return <p>Loading...</p>;
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
