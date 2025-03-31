import Hero from "@/components/Hero";
import HotelListings from "@/components/HotelListings";

const HomePage = () => {
  return (
    <main>
      <div className="relative min-h-screen opacity-90">
        <Hero />
        <img
          src="src/assets/hero/r4.webp"
          alt=""
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        />
      </div>
      <HotelListings />
    </main>
  )
}

export default HomePage