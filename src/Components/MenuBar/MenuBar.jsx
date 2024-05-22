import { Link } from 'react-router-dom';
import './MenuBar.css';

const MenuBar = () => {
    return (
        <div className="navbar bg-base-100 shadow-lg">
            <div className="container mx-auto flex justify-center">
                <ul className="menu menu-horizontal p-0">
                    <li>
                        <Link
                            to=""
                            className="btn btn-accent mx-2 sm:my-2"
                        >
                            Add Apartment
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="yourApartment"
                            className="btn btn-accent mx-2 sm:my-2"                        >
                            Your Apartment
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default MenuBar;
