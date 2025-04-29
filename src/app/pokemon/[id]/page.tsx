import { notFound } from 'next/navigation';
import Image from "next/image";
import { poppins } from "@/utils/fonts";
import { getWeakness } from '@/utils/pokemon';

async function PokemonDetail({ params }: { params: { id: string } }) {
    const typeColors = {
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
    }
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);

    if (!res.ok) 
        return notFound();

    const pokemon = await res.json();

    return (
        <div className={`flex ${poppins.className}`}>
            <div className='m-50 bg-white rounded-2xl'>
                <Image
                src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${String(
                    pokemon.id
                ).padStart(3, "0")}.png`}
                alt= {`Photo of ${pokemon.name}`}
                width={400}
                height={400}
                />
                <h1 className='flex justify-center capitalize text-2xl'>
                    {pokemon.name}
                </h1>
                <p className='flex justify-center capitalize text-xl'>
                    #{String(
                        pokemon.id
                    ).padStart(3, "0")}
                </p>
                <p className={`flex capitalize justify-center ${typeColors}`}>
                    {pokemon.types.map((typeInfo: { type: { name: string } }) => typeInfo.type.name).join(", ")}
                </p>
            </div>
            
            <div className='flex flex-col gap-4 items-center justify-center'>

                <div className='bg-white rounded-2xl w-125 h-75'>
                    <h1 className='flex justify-center text-2xl'>
                        Stats 
                    </h1>
                    <ul>
                        {pokemon.stats.map((stat: { base_stat: number; stat: { name: string } }) => (
                            <li key={stat.stat.name} className="capitalize">
                                {stat.stat.name}: {stat.base_stat}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='bg-white rounded-2xl w-125 h-75'>
                    <h1 className='flex justify-center text-2xl'>
                        Details
                    </h1>
                    <ul>
                        <li>Weight: {pokemon.weight}</li>
                        <li>Height: {pokemon.height}</li>
                        <li>Abilities: {pokemon.abilities
                            .map((abilityInfo: { ability: { name: string } }) => abilityInfo.ability.name)
                            .join(", ")}
                        </li>
                        <li>Base Experience: {pokemon.base_experience}</li>
                    </ul>
                </div>
                <div className='bg-white rounded-2xl w-125 h-75'> 
                    <h1 className='flex justify-center text-2xl'>
                        Weaknesses
                    </h1>
                    <p>
                        {pokemon.getWeakness}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PokemonDetail;
