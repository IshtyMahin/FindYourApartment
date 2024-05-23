import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../../UseContext/UserProvider';

const EmailForRequest = () => {
   
    const [email,setEmail] = useState('')
    const [mess,setMess] = useState('')
    const HandleEmail = (e) => {
        setEmail(e.target.value)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email);
        try {
            const res = await axios.post(`https://findyourapartmentbackend.onrender.com/api/users/reset_password_request/`, {
                email: email 
            });
            console.log(res);
            setMess(res.data)
        } catch (error) {
            console.error('error', error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
            <form onSubmit={handleSubmit} className="bg-white p-8  shadow-md w-full max-w-lg my-16 rounded-xl">
                <h2 className="text-2xl font-bold mb-6 text-center">Reset Password Request</h2>

                <div className='grid md:grid-cols-1 gap-4'>
                    

                    <div className="mb-4">
                        <label className="block text-gray-700">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={HandleEmail}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                </div>
                <p className="text-center" >{mess}</p>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Request</button>
                </div>
            </form>
            
        </div>
    );
};

export default EmailForRequest;
