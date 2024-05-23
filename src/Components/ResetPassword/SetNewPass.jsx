import { useState } from 'react';
import axios from 'axios';

import { useNavigate, useParams } from 'react-router-dom';

const SetNewPass = () => {

    const { uid64, token } = useParams();
    console.log(uid64,token);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newPassword,confirmPassword);
        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }
        console.log(uid64,token);
        try {
            const response = await axios.post(`https://findyourapartmentbackend.onrender.com/api/users/reset_password_confirm/${uid64}/${token}/`, {
                new_password: newPassword,
                confirm_password: confirmPassword,
            });
            console.log(response);
            setMessage(response.data.message);
            if (response.status === 200) {
                navigate("/login")
            }
        } catch (error) {
            console.log(error);
            setMessage('We found some error.Please try again.');
        }
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
            <form onSubmit={handleSubmit} className="bg-white p-8  shadow-md w-full max-w-lg my-16 rounded-xl">
                <h2 className="text-2xl font-bold mb-6 text-center">Update Profile</h2>

                <div className='grid md:grid-cols-2 gap-4'>

                    <div className="mb-4">
                        <label className="block text-gray-700">New Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Confirm Password:</label>
                        <input
                            type="password"
                            name="confirm_password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                </div>
                <p className='text-2xl'>{message}</p>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Reset Password</button>
                </div>
            </form>
           
        </div>
    );
};

export default SetNewPass;
