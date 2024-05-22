import React from 'react';

const ApartmentCard = () => {
    return (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row md:space-x-6">
                <div className="md:w-1/2">
                    <img
                        src="path_to_image.jpg"
                        alt="Apartment"
                        className="w-full h-auto rounded-lg"
                    />
                </div>
                <div className="md:w-1/2">
                    <h1 className="text-3xl font-bold text-gray-800">BDT 45 Thousand</h1>
                    <p className="text-gray-600">New Market, Dhaka</p>
                    <div className="mt-4">
                        <p className="text-gray-800">
                            <strong>3 Beds</strong> • <strong>4 Baths</strong> •{' '}
                            <strong>1,555 sqft</strong>
                        </p>
                        <p className="mt-4 text-gray-600">
                            Make this beautiful 1555 Square Feet apartment in New Market your home. This beautiful apartment has 3 beds and 4 baths. The balconies of the house have enough space for you to practice your gardening skills. And if you enjoy natural lights in your home then we have good news for you. The big windows in the house allow lots of natural light to come in.
                        </p>
                    </div>
                    <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg">Book Viewing</button>
                </div>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <img
                    src="path_to_image.jpg"
                    alt="Image 1"
                    className="w-full h-auto rounded-lg"
                />
                <img
                    src="path_to_image.jpg"
                    alt="Image 2"
                    className="w-full h-auto rounded-lg"
                />
                <img
                    src="path_to_image.jpg"
                    alt="Image 3"
                    className="w-full h-auto rounded-lg"
                />
                <img
                    src="path_to_image.jpg"
                    alt="Image 4"
                    className="w-full h-auto rounded-lg"
                />
            </div>
        </div>
    );
};

export default ApartmentCard;
