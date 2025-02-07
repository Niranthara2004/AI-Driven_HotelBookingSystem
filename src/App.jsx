import Navigation from "../src/components/Navigation";
import Hero from "../src/components/Hero";
import HotelListings from "../src/components/HotelListings";

const App = () => {

  return (
    <>
      <Navigation name="Adithya" />
      <div className="relative min-h-screen">
        <Hero />
        <img
          src="/src/assets/hero/img.jpg" // Ensure this path is correct
          alt="Background"
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        />
      </div>
      <HotelListings />
    </>
  );
};

export default App;