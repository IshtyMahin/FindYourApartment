import React, { useState } from 'react';
import { useContext } from 'react';
import AuthContext from '../../UseContext/UserProvider';
import axios from 'axios';

const BookingModal = ({ apartment_id, onClose, onSuccess }) => {
    const { user } = useContext(AuthContext);
    const [bookingDateTime, setBookingDateTime] = useState('');

    const handleBooking = async () => {
        try {
            const response = await axios.post('https://findyourapartmentbackend.onrender.com/api/apartment/bookings/', {
                user: user.id,
                apartment: apartment_id,
                bookingDateTime,
            });
            console.log(response.data);
            onSuccess();
            onClose();
        } catch (error) {
            console.error('error', error);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold mb-4">Book Apartment</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bookingDateTime">
                        Booking Date & Time
                    </label>
                    <input
                        type="datetime-local"
                        id="bookingDateTime"
                        value={bookingDateTime}
                        onChange={(e) => setBookingDateTime(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="flex justify-between">
                    <button onClick={onClose} className="btn btn-secondary">Cancel</button>
                    <button onClick={handleBooking} className="btn btn-primary">Book Now</button>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
