
"use client";

import { useEffect, useState } from "react";

interface Pokemon {
    name: string;
    url: string;
    id: number;
}

export default function PokemonList() {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

    useEffect(() => {
    async function fetchPokemon() {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
        const data = await res.json();
        setPokemonList(data.results);
    }

    fetchPokemon();
    }, []);

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
            {pokemonList.map((pokemon, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-4 hover:scale-105 transition">
                <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>
                <img
                src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
                alt={pokemon.name}
                className="mt-2 w-full h-32 object-contain"
                />
            </div>
            ))}
        </div>
    );
}
