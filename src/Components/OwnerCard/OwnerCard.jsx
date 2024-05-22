import { useContext, useEffect, useState } from "react";
import AuthContext from "../../UseContext/UserProvider";
import DetailCard from "../DetailCard/DetailCard";

const OwnerCard = () => {
    const { user, allApartment } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user && allApartment) {
            setIsLoading(false);
        }
    }, [user, allApartment]);

    if (isLoading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    const ownerApartments = allApartment?.filter(apartment => apartment?.owner_id === user?.id);

    return (
        <div>
            <div className='my-16'>
                <h1 className='bg-slate-300 md:p-8 sm:p-6 border-slate-800 md:mx-16 text-2xl md:text-3xl lg:text-4xl my-6 text-center rounded-xl font-bold'>
                    Your Added Apartment
                </h1>
                {ownerApartments?.length === 0 ? (
                    <p className="text-center text-gray-600">You have not added any apartments yet.</p>
                ) : (
                    <div className='grid md:grid-cols-2 gap-6'>
                        {ownerApartments?.map(apartment => (
                            <DetailCard key={apartment.id} apartment={apartment} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OwnerCard;
