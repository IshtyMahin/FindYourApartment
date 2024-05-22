import { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        mobile_number: '',
        user_type: 'normal',
        password: '',
        confirm_password: '',
    });
    const [showModel, setShowModel] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://findyourapartmentbackend.onrender.com/api/users/register/', formData);
            console.log(response);
            setShowModel(true)
            console.log('its  okay', response.data);
        } catch (error) {
            console.error('error', error.response.data);
        }
    };

    const handleCloseModal = () => {
        setShowModel(false);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
            <form onSubmit={handleSubmit} className="bg-white p-8  shadow-md w-full max-w-lg my-16 rounded-xl">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

                <div className='grid grid-cols-2 gap-4'>
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
                        <label className="block text-gray-700">First Name:</label>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Last Name:</label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Mobile Number:</label>
                        <input
                            type="text"
                            name="mobile_number"
                            value={formData.mobile_number}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">User Type:</label>
                        <select
                            name="user_type"
                            value={formData.user_type}
                            onChange={handleChange}
                            className="select select-bordered w-full"
                        >
                            <option value="normal">Viewer</option>
                            <option value="apartment_owner">Apartment Owner</option>
                        </select>
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

                    <div className="mb-4">
                        <label className="block text-gray-700">Confirm Password:</label>
                        <input
                            type="password"
                            name="confirm_password"
                            value={formData.confirm_password}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Register</button>
                </div>
            </form>

            {showModel && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-xl">
                        <h2 className="text-2xl font-bold mb-4">Registration Successful</h2>
                        <p className="mb-2">Your registration has been successfully completed!</p>
                        <p className='mb-4'>Please Check your email for verification <a className='text-blue-600  ' href="https://mail.google.com/mail/u/0/#inbox">Click Here</a></p>
                        <div className='grid grid-col-1'>
                            

                            <button onClick={handleCloseModal} className="btn btn-primary ">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegisterForm;
