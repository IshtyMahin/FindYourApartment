import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../../UseContext/UserProvider';
import { useNavigate, useParams } from 'react-router-dom';

const ApartmentUpdateForm = () => {
    const navigate = useNavigate();
    const { user ,} = useContext(AuthContext);
    const [apartment, setApartment] = useState(null);
    const [formData, setFormData] = useState({
        price: '',
        address: '',
        bed: '',
        bath: '',
        division: 'Dhaka',
        size: '',
        description: '',
        owner_id: '',
        uploaded_images: [],
    });

    
    const { id } = useParams();
    const params = new URLSearchParams(id);
    
    const apartment_id = params.get('id');
    console.log(apartment_id);
    useEffect(() => {
        fetch(`https://findyourapartmentbackend.onrender.com/api/apartment/list/${apartment_id}`)
            .then(response => response.json())
            .then(data => {
                setApartment(data);
                setFormData({
                    price: data.price,
                    address: data.address,
                    bed: data.bed,
                    bath: data.bath,
                    division: data.division,
                    size: data.size,
                    description: data.description,
                    owner_id: user.id,
                    uploaded_images:[],
                })
            })
            .catch(error => {
                console.error('error', error);
            });
    }, [apartment_id,user]);

    if (!apartment) {
        return <div className='flex justify-center my-16'><span className="loading loading-spinner loading-lg"></span></div>
    }

    console.log(apartment);

    
   
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const images = e.target.files;
        setFormData({
            ...formData,
            uploaded_images: images,
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

        for (let i = 0; i < formData.uploaded_images.length; i++) {
            postData.append('uploaded_images', formData.uploaded_images[i]);
        }

        console.log(postData);

        try {
            const response = await axios.put(`https://findyourapartmentbackend.onrender.com/api/apartment/list/${apartment_id}/`, postData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            navigate('/')
            console.log('apartment add', response.data);
        } catch (error) {
            console.error('error ', error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white m-16 p-8 rounded shadow-md w-full max-w-lg" method="POST" encType="multipart/form-data">
                <h2 className="text-2xl font-bold mb-6 text-center">Update Apartment</h2>
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
                    <button type="submit" className="btn btn-primary">Update Apartment</button>
                </div>
            </form>
        </div>
    );
};

export default ApartmentUpdateForm;