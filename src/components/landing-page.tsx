
"use client";
import { poppins } from "@/utils/fonts";
import Image from "next/image";
import { getPokemonList, Pokemon } from "@/utils/pokemon";
import { useState } from "react";




async function LandingPage({ pokemons = [] }){
    const pokemonList = await getPokemonList();
    const [sortoption, setSortOption] = useState("");



    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(event.target.value);
    }


    return(
        <div className="flex flex-col items-center">
            <div className="flex  justify-between w-full max-w-4xl mt-10 px-5">
                <h1 className={`${poppins.className} text-5xl text-white`}>
                    Welcome to the Pokedex
                </h1>
                <div className="p-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Sort by:</label>
                    <select
                        value={sortoption}
                        onChange={handleChange}
                        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Select option</option>
                        <option value="name-asc">Name A-Z</option>
                        <option value="name-desc">Name Z-A</option>
                        <option value="id-asc">ID Low-High</option>
                        <option value="id-desc">ID High-Low</option>
                    </select>
                </div>
                
            </div>
            <div className="flex flex-wrap justify-center gap-5">

                {pokemonList.map((pokemon, index) => {
                    
                    const formattedId = String(index + 1).padStart(3, "0");
                    return(

                        <div key = {index}className="bg-white rounded-lg shadow-lg w-70 h-70 mt-10 justify-end flex flex-col items-center">
                            <Image
                                src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formattedId}.png`}
                                alt="Pokemon"
                                width={200}
                                height={200}
                                />
                            <h2>
                                {formattedId}
                            </h2>
                            <h2 className="capitalize font-bold text-xl">
                                {pokemon.name} 
                            </h2>
                            <h2>
                                Type: {pokemon.type} 
                            </h2>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}



export default LandingPage;