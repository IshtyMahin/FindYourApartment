
import { Outlet } from 'react-router-dom';
import FilterForm from '../../Components/Filter/FilterForm';
import ApartmentForm from '../../Components/ApartmentForm/ApartmentForm';
import { useContext } from 'react';
import AuthContext from '../../UseContext/UserProvider';
// import ApartmentCard from '../../Components/ApartmentCard';
import DetailCard from '../../Components/DetailCard/DetailCard';
const Homepage = () => {
    const { user, loggedIn, login, logout } = useContext(AuthContext);
    console.log(user, loggedIn, login, logout);
    
    return (
        <div className='mx-6'>
            <FilterForm />
            <Outlet></Outlet>
            <DetailCard/>
        </div>
    );
};

export default Homepage;