"use client"
import { poppins } from "@/utils/fonts";
import Image from "next/image";
import { Pokemon } from "@/utils/pokemon";
import { useEffect, useState } from "react";
import Link from 'next/link';




function LandingPage(){
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState('');

    useEffect(() => {
        async function fetchPokemonList() {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
            const data = await res.json();
            
            const detailedPokemonList = await Promise.all(
                data.results.map(async (pokemon: { name: string; url: string }) => {
                    const detailsRes = await fetch(pokemon.url);
                    const details = await detailsRes.json();
                    
                    return {
                        name: pokemon.name,
                        type: details.types.map((typeInfo: { type: { name: string } }) => typeInfo.type.name).join(", "),
                        url: pokemon.url,
                        id: details.id,
                    };
                })
            );
            setPokemonList(detailedPokemonList);
            setAllPokemon(detailedPokemonList);
        }
        fetchPokemonList();

    
    }, [limit]);

    const SeeMore = () => {
        setLimit(100000);
    }
    const handleSearch = () => {
        const filtered = allPokemon.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(search.toLowerCase()) || 
            String(pokemon.id) === search
        );
        setPokemonList(filtered);
    };
    return(
        <div className="flex flex-col items-center">
            <div className="flex flex-col my-10 items-center">
                <h1 className={`${poppins.className} text-6xl text-black font-bold`}>
                    Pokédex
                </h1>
                <input
                    type="text"
                    placeholder="Search Pokemon" 
                    className="bg-white mt-10 rounded-lg px-20 py-2 text-center w-72"
                    value={search}
                    onChange={(e)=> setSearch(e.target.value)}
                    onKeyDown={(e)=> {
                        if(e.key === "Enter"){
                            handleSearch();
                        }
                    }}
                />
                <button></button>  
                
            </div>
            <div className="flex flex-wrap justify-center gap-10 mb-10">

                {pokemonList.map((pokemon, index) => {
                    
                    const formattedId = String(pokemon.id).padStart(3, "0");
                    return(
                        <Link href={`/pokemon/${pokemon.id}`} key={pokemon.id}>
                            <div className="bg-white rounded-lg w-70 h-70 mt-10 justify-end flex flex-col items-center hover:scale-110 transition-transform duration-200 cursor-pointer capitalize">
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
                        </Link>
                    )
                })}
                
            </div>
            <div className="my-10">
                <button onClick={SeeMore} className="bg-white text-black py-2 px-4 rounded hover:bg-black hover:text-white transition duration-300 ease-in-out cursor-pointer">
                    See More
                </button>
            </div>
        </div>
    )
}



export default LandingPage;