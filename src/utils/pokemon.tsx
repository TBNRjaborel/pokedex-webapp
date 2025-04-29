export interface Pokemon {
    name: string;
    type: string;
    url: string;
    id:number;
}

export async function getPokemonDetails(id: number){
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    
    if (!response.ok) {
        throw new Error(`Pokemon with ID ${id} not found`)
    }

    const data = await response.json()

    return {
        id: data.id,
        name: data.name,
        height: data.height,
        weight: data.weight,
        baseExperience: data.base_experience,
        types: data.types.map((type: { type: { name: string } }) => type.type.name),
        abilities: data.abilities.map((ability: { ability: { name: string } }) => ability.ability.name),
        stats: data.stats.map((stat: { base_stat: number; stat: { name: string } }) => ({
        name: stat.stat.name,
        value: stat.base_stat,
        })),
    }
    } catch (error) {
        console.error(`Error fetching Pokemon details for ID ${id}:`, error)
        return null
    }
}

export function getWeakness(types: string[]): string[] {
    const typeWeaknesses: Record<string, string[]> = {
        normal: ["fighting"],
        fire: ["water", "ground", "rock"],
        water: ["electric", "grass"],
        electric: ["ground"],
        grass: ["fire", "ice", "poison", "flying", "bug"],
        ice: ["fire", "fighting", "rock", "steel"],
        fighting: ["flying", "psychic", "fairy"],
        poison: ["ground", "psychic"],
        ground: ["water", "grass", "ice"],
        flying: ["electric", "ice", "rock"],
        psychic: ["bug", "ghost", "dark"],
        bug: ["fire", "flying", "rock"],
        rock: ["water", "grass", "fighting", "ground", "steel"],
        ghost: ["ghost", "dark"],
        dragon: ["ice", "dragon", "fairy"],
        dark: ["fighting", "bug", "fairy"],
        steel: ["fire", "fighting", "ground"],
        fairy: ["poison", "steel"],
    }
    const allWeaknesses = types.flatMap((type) => typeWeaknesses[type] || [])
    const uniqueWeaknesses = [...new Set(allWeaknesses)]

    return uniqueWeaknesses
}
