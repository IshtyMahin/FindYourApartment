import { useContext, useState } from 'react';
import axios from 'axios';
import AuthContext from '../../UseContext/UserProvider';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [mess,setMess] = useState('')
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleForRequest = () => {
        navigate('/request_reset_Password')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('https://findyourapartmentbackend.onrender.com/api/users/login/', formData);
            console.log(response);
            console.log(response.data.token);
            localStorage.setItem('token', response.data.token);
            console.log(localStorage);
            if (response.data.error) {
                setMess(response.data.error)
            }
            else {
                login(response.data);
                navigate('/')
            }
            
            console.log('its okay', response.data);
        } catch (error) {
            console.error('error', error.response.data);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <div className="mb-4">
                    <label className="block text-gray-700">Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div className='my-2 flex justify-center text-red-700 '>
                    <p>{mess}</p>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
                <div className="text-center mt-4">
                    <p>Donot have an account? <Link className="text-blue-500" to="/register">Register</Link></p>
                    <p>Forgot your password? <button type="button" className="text-blue-500" onClick={handleForRequest}>Reset Password</button></p>
                </div>
                
            </form>
            
        </div>
    );
};

export default LoginForm;
