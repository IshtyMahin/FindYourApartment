
const SuccessModal = ({ onClose }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold mb-4">Booking Successful</h2>
                <p className="mb-4">Your booking has been successfully made!</p>
                <button onClick={onClose} className="btn btn-primary">Close</button>
            </div>
        </div>
    );
};

export default SuccessModal;
