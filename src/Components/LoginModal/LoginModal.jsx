
const LoginModal = ({ closeModal,value }) => {
    return (
        <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <div className="relative bg-white rounded-lg overflow-hidden max-w-md">
                    <div className="p-8">
                        <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
                        <p className="text-gray-600">{value}</p>
                    </div>
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                        <button onClick={closeModal} className="btn btn-primary w-full">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
