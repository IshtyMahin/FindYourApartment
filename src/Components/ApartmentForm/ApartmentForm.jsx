import { useContext, useState } from 'react';
import axios from 'axios';
import AuthContext from '../../UseContext/UserProvider';
import { useNavigate } from 'react-router-dom';

const ApartmentForm = () => {
    
    const { user, allApartment, setAllApartment } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        price: '',
        address: '',
        bed: '',
        bath: '',
        division: 'Dhaka',
        size: '',
        description: '',
        owner_id: user.id,
        uploaded_images: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = async (e) => {
        const files = e.target.files;
        const urls = [];

        for (let i = 0; i < files.length; i++) {
            const formData = new FormData();
            formData.append('image', files[i]);

            try {
                const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
                    params: {
                        key: 'dccf78e1bf130f4292eb12620c826d79', 
                    },
                });
                urls.push(response.data.data.url);
            } catch (error) {
                console.error('Error uploading image to ImgBB', error);
            }
        }

        setFormData({
            ...formData,
            uploaded_images: urls,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = new FormData();
        postData.append('price', formData.price);
        postData.append('address', formData.address);
        postData.append('bed', formData.bed);
        postData.append('bath', formData.bath);
        postData.append('division', formData.division);
        postData.append('size', formData.size);
        postData.append('description', formData.description);
        postData.append('owner_id', formData.owner_id);

        formData.uploaded_images.forEach((url, index) => {
            postData.append(`uploaded_images[${index}]`, url);
        });

        try {
            console.log(postData)
            const response = await axios.post('https://findyourapartmentbackend.onrender.com/api/apartment/list/', postData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setAllApartment([...allApartment, response.data]);
            navigate('/');
            console.log('Apartment created:', response.data);
        } catch (error) {
            console.error('Error creating apartment', error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 md:m-16 rounded shadow-md w-full max-w-lg" method="POST" encType="multipart/form-data">
                <h2 className="text-2xl font-bold mb-6 text-center">Create Apartment</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Price:</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} className="input input-bordered w-full" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Address:</label>
                    <textarea name="address" value={formData.address} onChange={handleChange} className="textarea textarea-bordered w-full" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Bed:</label>
                    <input type="number" name="bed" value={formData.bed} onChange={handleChange} className="input input-bordered w-full" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Bath:</label>
                    <input type="number" name="bath" value={formData.bath} onChange={handleChange} className="input input-bordered w-full" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Division:</label>
                    <select name="division" value={formData.division} onChange={handleChange} className="select select-bordered w-full" required>
                        <option value="Dhaka">Dhaka</option>
                        <option value="Chittagong">Chittagong</option>
                        <option value="Rajshahi">Rajshahi</option>
                        <option value="Khulna">Khulna</option>
                        <option value="Barisal">Barisal</option>
                        <option value="Sylhet">Sylhet</option>
                        <option value="Rangpur">Rangpur</option>
                        <option value="Mymensingh">Mymensingh</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Size (sq ft):</label>
                    <input type="number" name="size" value={formData.size} onChange={handleChange} className="input input-bordered w-full" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Description:</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} className="textarea textarea-bordered w-full" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Images:</label>
                    <input type="file" name="uploaded_images" onChange={handleImageChange} className="file-input file-input-bordered w-full" multiple required />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Create Apartment</button>
                </div>
            </form>
        </div>
    );
};

export default ApartmentForm;
