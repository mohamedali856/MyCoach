import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { motion } from "framer-motion";

export default function MovieDetails() {
  const { id } = useParams();
  const [characterDetails, setCharacterDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch character details");
        }
        const data = await response.json();
        setCharacterDetails(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchCharacter();
  }, [id]);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.9 }}// Initial state
    animate={{ opacity: 1, scale: 1 }} // Animation state
    transition={{ duration: 0.3 }}>
    <NavBar/>
    <div className="flex justify-center items-center">
        <h1 className="font-['Work Sans'] font-medium text-base lg:text-xl ">Discover the Secrets of Rick Sanchez<br/>from the Rick and Morty Universe!🚀🧪</h1>
    </div>
    <div className="h-[80vh]">
    <div className="p-4 bg-white shadow-lg rounded-lg w-[80%] lg:w-[50%] mx-auto mt-8">
      {characterDetails && (
        <div className="flex lg:flex-row flex-col justify-between">
        <div>
            <img src={characterDetails.image} alt={characterDetails.name} className="w-[310.78px] h-auto rounded-md mb-4" />
        </div>
        <div>
          <h1 className="text-[40px] font-semibold font-JimNightshade text-[#017034] mb-4">{characterDetails.name}</h1>
          <li className="font-Inter font-bold">Status: {characterDetails.status}</li>
          <li className="font-Inter font-bold">Species: {characterDetails.species}</li>
          <li className="font-Inter font-bold">Gender: {characterDetails.gender}</li>
          <p className="font-Inter font-bold mt-6"><span className="text-green-700">{characterDetails.name}</span> is a <span className="text-green-700">{characterDetails.gender} {characterDetails.species}</span><br/>who is currently <span className="text-green-700">{characterDetails.status}</span>.He remains<br/>a core figure in the <span className="text-green-700">{characterDetails.species}</span><br/>species.</p>
        </div>
        </div>
      )}
    </div>
    </div>
    <Footer/>
    </motion.div>
  );
}
