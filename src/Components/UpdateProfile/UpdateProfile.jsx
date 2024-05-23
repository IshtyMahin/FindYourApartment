import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../../UseContext/UserProvider';

const UpdateProfile = () => {
    const { user, setUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        mobile_number: '',
        user_type: '',
    });

    useEffect(() => {
        fetchUserData(); 
    }, [user]);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`https://findyourapartmentbackend.onrender.com/api/users/list/${user.id}`);
            const userData = response.data;
            setFormData({
                username: userData.username,
                first_name: userData.first_name,
                last_name: userData.last_name,
                email: userData.email,
                mobile_number: userData.mobile_number,
                user_type: userData.user_type,
            }); 
        } catch (error) {
            console.error('error', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const res =await axios.put(`https://findyourapartmentbackend.onrender.com/api/users/update/${user.id}/`, formData);
            console.log(res);
            setUser(res.data)
            console.log('success: ',res.data);
        } catch (error) {
            console.error('error:', error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
            <form onSubmit={handleSubmit} className="bg-white p-8  shadow-md w-full max-w-lg my-16 rounded-xl">
                <h2 className="text-2xl font-bold mb-6 text-center">Update Profile</h2>

                <div className='grid md:grid-cols-2 gap-4'>
                    

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

                    
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Update</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProfile;
