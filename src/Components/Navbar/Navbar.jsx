import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../../UseContext/UserProvider";
import './Navbar.css';

const Navbar = () => {
    const { user, loggedIn, logout } = useContext(AuthContext);
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="navbar bg-teal-700 text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden" onClick={toggleDropdown}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    {showDropdown && (
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {loggedIn ? (
                                <>
                                    <Link to='/profile'><li><span className="my-2 text-xl text-black">Welcome, {user?.username}</span></li></Link>
                                    {user?.user_type === "apartment_owner" && (
                                        <li>
                                            <NavLink
                                                to="/dashboard"
                                                className={({ isActive }) => isActive ? "btn btn-accent m-2 active" : "btn btn-accent m-2"}
                                            >
                                                Dashboard
                                            </NavLink>
                                        </li>
                                    )}
                                    <li><button onClick={logout} className="btn btn-accent m-2">Logout</button></li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <NavLink
                                            to="/login"
                                            className={({ isActive }) => isActive ? "btn btn-accent m-2 active" : "btn btn-accent m-2"}
                                        >
                                            Login
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/register"
                                            className={({ isActive }) => isActive ? "btn btn-accent m-2 active" : "btn btn-accent m-2"}
                                        >
                                            Register
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    )}
                </div>
                <Link to="/" className="btn btn-ghost text-xl">FindYourApartment</Link>
            </div>

            <div className="navbar-end hidden lg:flex">
                {loggedIn ? (
                    <>
                        <Link to='/profile'><div><p className="mr-2 p-4">Welcome, {user?.username}</p></div></Link>
                        {user?.user_type === "apartment_owner" && (
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) => isActive ? "btn btn-ghost mx-2 active" : "btn btn-ghost mx-2"}
                            >
                                Dashboard
                            </NavLink>
                        )}
                        <button onClick={handleLogout} className="btn">Logout</button>
                    </>
                ) : (
                    <>
                        <NavLink
                            to="/login"
                            className={({ isActive }) => isActive ? "btn btn-ghost mx-2 active" : "btn btn-ghost mx-2"}
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/register"
                            className={({ isActive }) => isActive ? "btn btn-ghost mx-2 active" : "btn btn-ghost mx-2"}
                        >
                            Register
                        </NavLink>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
