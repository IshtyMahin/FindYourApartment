
import { Outlet } from 'react-router-dom';
import FilterForm from '../../Components/Filter/FilterForm';

// import ApartmentCard from '../../Components/ApartmentCard';
import DetailCard from '../../Components/DetailCard/DetailCard';
const Homepage = () => {
   
    
    return (
        <div className='mx-6'>
            <FilterForm />
            <Outlet></Outlet>
            <DetailCard/>
        </div>
    );
};

export default Homepage;