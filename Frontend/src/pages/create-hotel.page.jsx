import { useState } from "react";
import CreateHotelForm from "../components/CreateHotelForm"; 

const HotelPage = () => {
  const [hotel, setHotel] = useState(null);

  // Callback to receive created hotel from form
  const handleHotelCreated = (createdHotel) => {
    setHotel(createdHotel);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create a New Hotel</h1>
      <CreateHotelForm onHotelCreated={handleHotelCreated} />
      
      {hotel ? (
        <div className="mt-8 p-4 border rounded-lg">
          <h2 className="text-xl font-semibold">{hotel.name}</h2>
          {hotel.image && (
            <img 
              src={hotel.image} 
              alt={hotel.name} 
              className="my-4 max-w-md rounded-md" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/600x400?text=Image+Not+Available";
              }}
            />
          )}
          <p className="my-2">{hotel.description}</p>
          <p className="font-medium">Price: ${hotel.price}</p>
          <p>Location: {hotel.location}</p>
        </div>
      ) : (
        <p className="mt-8 text-gray-500">No hotel created yet. Fill out the form to create one.</p>
      )}
    </div>
  );
};

export default HotelPage;