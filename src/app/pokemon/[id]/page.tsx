"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { poppins } from "@/utils/fonts";
import { getWeakness,getPokemonDetails } from "@/utils/pokemon";

const typeColors: { [key: string]: string } = {
    normal: "bg-gray-400",
    fire: "bg-red-500",
    water: "bg-blue-500",
    electric: "bg-yellow-400",
    grass: "bg-green-500",
    ice: "bg-blue-200",
    fighting: "bg-red-700",
    poison: "bg-purple-500",
    ground: "bg-yellow-700",
    flying: "bg-indigo-300",
    psychic: "bg-pink-500",
    bug: "bg-lime-500",
    rock: "bg-yellow-800",
    ghost: "bg-purple-700",
    dragon: "bg-indigo-700",
    dark: "bg-gray-800",
    steel: "bg-gray-500",
    fairy: "bg-pink-300",
    };

    function PokemonDetail() {
    const router = useRouter();
    const params = useParams();
    const [pokemon, setPokemon] = useState<any>(null);
    

    useEffect(() => {
    async function fetchPokemon() {
        try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params?.id}`);
        if (!res.ok) {
            router.push("/not-found");
            return;
        }
        const data = await res.json();
        setPokemon(data);
        } catch (error) {
        console.error("Failed to fetch Pokémon", error);
        router.push("/not-found");
        }
    }

    if (params?.id) {
        fetchPokemon();
    }
    }, [params?.id, router]);

    if (!pokemon) return <p className="text-center mt-20">Loading...</p>;

    const formattedId = String(pokemon.id).padStart(3, "0");
    const Weaknesses = getWeakness(pokemon.types.map((typeObj: any) => typeObj.type.name));

    return (
    <div className={`flex flex-col items-center ${poppins.className}`}>
        <div className="m-10 rounded-2xl">
        <Image
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formattedId}.png`}
            alt={`Photo of ${pokemon.name}`}
            width={400}
            height={400}
        />
        <div className="bg-white rounded-2xl opacity-75 p-4 mt-4 text-center">
            <h1 className="capitalize text-2xl font-bold">{pokemon.name}</h1>
            <p className="text-xl">#{formattedId}</p>
            <div className="flex gap-2 justify-center mt-2">
            {pokemon.types.map((typeObj: any) => (
                <span
                key={typeObj.type.name}
                className={`px-3 py-1 rounded-full text-white ${typeColors[typeObj.type.name]}`}
                >
                {typeObj.type.name}
                </span>
            ))}
            </div>
        </div>
        </div>

        <div className="flex flex-col gap-4 items-center w-full max-w-xs opacity-75">
            <div className="bg-white rounded-2xl p-4 w-full text-center">
                <h1 className="text-2xl font-bold text-center">Stats</h1>
                <ul className="mt-2">
                {pokemon.stats.map((stat: any) => (
                    <li key={stat.stat.name} className="capitalize">
                    {stat.stat.name}: {stat.base_stat}
                    </li>
                ))}
                </ul>
            </div>

            <div className="bg-white rounded-2xl p-4 w-full text-center">
                <h1 className="text-2xl font-bold text-center">Details</h1>
                <ul className="mt-2">
                <li>Weight: {pokemon.weight}</li>
                <li>Height: {pokemon.height}</li>
                <li>
                    Abilities:{" "}
                    {pokemon.abilities
                    .map((abilityInfo: any) => abilityInfo.ability.name)
                    .join(", ")}
                </li>
                <li>Base Experience: {pokemon.base_experience}</li>
                </ul>
            </div>

            <div className="bg-white rounded-2xl p-4 w-full">
                <h1 className="text-2xl font-bold text-center">Weaknesses</h1>
                <p className="text-center">{Weaknesses.join(", ")}</p>
            </div>
        </div>
    </div>
    );
}

export default PokemonDetail;
