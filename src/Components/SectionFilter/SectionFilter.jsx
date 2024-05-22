
import { Link, useParams } from 'react-router-dom';
import DetailCard from '../DetailCard/DetailCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

const SectionFilter = () => {
    const [displayApartments, setDisplayApartments] = useState([]);
    const {filter} = useParams();
    const parseFilter = (filter) => {
        const params = new URLSearchParams(filter);
        return {
            division: params.get('division'),
            partial_address: params.get('partial_address'),
            size: params.get('size'),
            bed: params.get('bed'),
            bath: params.get('bath'),
            min_price: params.get('min_price'),
            max_price: params.get('max_price'),
        };
    };

    const filterParams = parseFilter(filter);
    const { division, partial_address, size, bed, bath, min_price, max_price } = filterParams;
    
    console.log(division,size);
    useEffect(() => {
        const fetchApartments = async () => {
            const params = {};
            if (division) params.division = division;
            if (partial_address) params.partial_address = partial_address;
            if (size) params.size = size;
            if (bed) params.bed = bed;
            if (bath) params.bath = bath;
            if (min_price) params.min_price = min_price;
            if (max_price) params.max_price = max_price;
            console.log(params);
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/apartment/list/', { params });
                console.log(response.data);
                setDisplayApartments(response.data);
            } catch (error) {
                console.error("Error fetching apartments", error);
            } finally {
                // setLoading(false);
            }
        };

        fetchApartments();
    }, [division, partial_address, size, bed, bath, min_price, max_price]);

    console.log(displayApartments);
    return (
        <div className='my-16'>

            {displayApartments.length > 0 ? (
                <>
                    <h1 className='bg-slate-300 md:p-8 sm:p-6 border-slate-800 md:mx-16 text-2xl md:text-3xl lg:text-4xl my-6 text-center rounded-xl  font-bold'>
                        Popular Apartment : 
                        <span className='text-xl'>{division?` (Division- ${division})`:'' }</span>
                        <span className='text-xl'>{size?` (Minimum Size- ${size})`:'' }</span>
                        <span className='text-xl'>{max_price?` (Max Price- ${max_price})`:'' }</span>
                        <span className='text-xl'>{min_price?` (Max Price-  ${min_price})`:'' }</span>
                        <span className='text-xl'>{bed?` (min bed- ${bed})`:'' }</span>
                        <span className='text-xl'>{bath?` (min bath- ${bath})`:'' }</span>
                        <span className='text-xl'>{partial_address ?` (address with contain(${partial_address}))`:'' }</span>
                    </h1>
                    <div className='grid md:grid-cols-2 gap-6'>
                        {displayApartments.map(apartment => (
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

export default SectionFilter;
