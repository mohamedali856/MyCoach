import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import arrowIcon from "../assets/arrow-up.png";
import search from "../assets/Icon.png";
import arrow from "../assets/arrow-left (1).png"
import family from "../assets/allFamily.jpg"
import { Link } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

export default function Home() {
  const [dropdowns, setDropdowns] = useState([
    { id: 1, selectedOption: "Select Gender", options: ["Male", "Female", "Genderless", "Unknown"], isOpen: false, isArrowRotated: false },
    { id: 2, selectedOption: "Select Species", options: ["Human", "Alien"], isOpen: false, isArrowRotated: false },
    { id: 3, selectedOption: "Select Status", options: ["Alive", "Dead", "Unknown"], isOpen: false, isArrowRotated: false },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 9;
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const responses = await Promise.all([
          fetch("https://rickandmortyapi.com/api/character"),
          fetch("https://rickandmortyapi.com/api/character?page=2"),
        ]);
        const data = await Promise.all(responses.map(response => response.json()));
        const allCharacters = [...data[0].results, ...data[1].results]; // Combine results
        setCharacters(allCharacters);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCharacters();
  }, []);
  const handleSelect = (id, option) => {
    setDropdowns((prevDropdowns) =>
      prevDropdowns.map((dropdown) =>
        dropdown.id === id
          ? { ...dropdown, selectedOption: option, isOpen: false, isArrowRotated: false }
          : dropdown
      )
    );
  };
  const toggleDropdown = (id) => {
    setDropdowns((prevDropdowns) =>
      prevDropdowns.map((dropdown) =>
        dropdown.id === id
          ? { ...dropdown, isOpen: !dropdown.isOpen, isArrowRotated: !dropdown.isArrowRotated }
          : { ...dropdown, isOpen: false, isArrowRotated: false }
      )
    );
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredCharacters = characters.filter((character) => {
    const matchesSearch = character.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = dropdowns[0].selectedOption === "Select Gender" || character.gender === dropdowns[0].selectedOption;
    const matchesSpecies = dropdowns[1].selectedOption === "Select Species" || character.species === dropdowns[1].selectedOption;
    const matchesStatus = dropdowns[2].selectedOption === "Select Status" || character.status === dropdowns[2].selectedOption;
    return matchesSearch && matchesGender && matchesSpecies && matchesStatus;
  });
  const totalPages = Math.ceil(filteredCharacters.length / itemsPerPage);
  const currentItems = filteredCharacters.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    >
    <div className="lg:h-[100vh]">
        <NavBar/>
        <div className="flex flex-col h-[250px] lg:h-[450px]">
            <div className="flex justify-center items-center">
            <img className="w-[370px] lg:w-[800px] rounded-lg" src={family} alt="" />
            </div>
            <div className="bg-white w-[240px] lg:w-[350px] shadow-xl px-4 py-2 lg:px-8 lg:py-4 rounded-lg ml-[40px] -mt-14 flex lg:ml-[356px]">
                <h1 className="font-WorkSans font-semibold text-base lg:text-xl ">"Get Schwifty with the<br/>Multiverse Madness of Rick<br/>and Morty!" 🚀🧪</h1>
            </div>
        </div>
    </div>
      <div className="flex justify-center items-center h-[100px]">
        <div className="shadow-lg py-2 px-4 rounded-full w-[300px] h-[40px] lg:w-[400px] lg:h-[50px] flex justify-between items-center lg:mt-0 mt-8">
          <input
            className="text-[#ABB7C2] font-Poppins w-[390px] bg-white outline-none flex items-center justify-center"
            type="search"
            placeholder="Search ..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button>
            <img src={search} alt="Search Icon" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-6 font-Poppins justify-around items-center mt-8 lg:flex-row w-[75%] mx-auto lg:h-[30vh]">
        {dropdowns.map((dropdown) => (
          <div key={dropdown.id} className="relative inline-block w-full lg:w-auto">
            <h3 className="font-Poppins font-semibold">{dropdown.id === 1 ? 'Gender' : dropdown.id === 2 ? 'Species' : 'Status'}</h3>

            <div
              className="font-Poppins w-full lg:w-[200px] text-[#333333] outline-none shadow-lg py-3 px-6 flex justify-between items-center bg-white cursor-pointer"
              onClick={() => toggleDropdown(dropdown.id)}
            >
              <span className="font-Poppins">{dropdown.selectedOption}</span>
              <span>
                <img
                  className={`w-6 h-6 transition-transform ${dropdown.isArrowRotated ? "rotate-180" : ""}`}
                  src={arrowIcon}
                  alt="Dropdown Arrow"
                />
              </span>
            </div>
            {dropdown.isOpen && (
              <ul className="absolute w-full bg-white shadow-lg mt-1 z-10">
                {dropdown.options.map((option) => (
                  <li
                    key={option}
                    className="py-2 px-4 hover:bg-green-800 hover:text-white cursor-pointer"
                    onClick={() => handleSelect(dropdown.id, option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center h-[100px] mt-8">
        <h1 className="font-WorkSans text-[26px] text-center font-bold">
          Meet the Wildest Characters
          <br />
          from the Rick and Morty Multiverse!
        </h1>
      </div>      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 w-[70%] mx-auto">
        <AnimatePresence>
          {currentItems.map((character) => (
            <motion.div
              key={character.id}
              className="bg-white shadow-md rounded-lg p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Link to={`/movie/${character.id}`}>
              <img src={character.image} alt={character.name} className="w-full h-auto rounded-lg" />
              <p className="font-Inter text-sm text-[#4B6BFB] bg-[#4B6BFB0D] w-[70px] px-3 py-1 mt-3">{character.species}</p>
              <h2 className="font-Inter text-base font-semibold mt-2">Name : {character.name}</h2>
              <p className="font-Inter text-base font-semibold">Status: {character.status}</p>
              <p className="font-Inter text-base font-semibold">Gender: {character.gender}</p>
              <button className="text-green-800 font-WorkSans mt-4 font-medium bg-[#007C2A33] hover:bg-green-400 rounded-md px-4 py-1 text-sm">Details</button>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
        
      </div>
      <div className="flex justify-center items-center my-8">
        <button onClick={handlePrevPage} disabled={currentPage === 0} className="mx-2">
        <img className="w-7 border-green-700 rounded-md border-[2px]" src={arrow} alt="" />
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`mx-2 ${currentPage === index ? 'font-bold' : ''}border-green-700 rounded-md border-[2px] w-7`}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages - 1} className="mx-2">
          <img className="w-7 rotate-180 border-green-700 rounded-md border-[2px]" src={arrow} alt="" />
        </button>
      </div>
      <Footer/>
    </motion.div>
  );
}
