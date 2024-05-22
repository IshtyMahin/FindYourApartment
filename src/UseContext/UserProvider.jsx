import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [allApartment, setAllApartment] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            console.log('Token from localStorage:', token);
            axios.get('https://findyourapartmentbackend.onrender.com/api/users/verify-token/', {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
                .then(response => {
                    setUser(response.data.user);
                    setLoggedIn(true);
                    fetchApartmentList()
                    console.log(response.data.user);

                })
                .catch(error => {
                    console.error('error ', error);
                    setUser(null);
                    setLoggedIn(false);
                });
        } else {
            setUser(null);
            setLoggedIn(false);
        }
    }, [loggedIn]);

    const fetchApartmentList = () => {
        
        axios.get('https://findyourapartmentbackend.onrender.com/api/apartment/list/')
            .then(response => {
                setAllApartment(response.data);
            })
            .catch(error => {
                console.error('error', error);
            });
    };

    const login = (userData) => {
        localStorage.setItem('token', userData.token);
        setLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ user, loggedIn, login, logout, setUser, setAllApartment, allApartment }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
