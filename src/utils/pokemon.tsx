export interface Pokemon {
    name: string;
    type: string;
    url: string;
}

export async function getPokemonList(): Promise<Pokemon[]> {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
    const data = await res.json();

    const detailedPokemonList = await Promise.all(
        data.results.map(async (pokemon: { name: string; url: string }) => {
            const detailsRes = await fetch(pokemon.url);
            const details = await detailsRes.json();

            return {
                name: pokemon.name,
                type: details.types.map((typeInfo: { type: { name: string } }) => typeInfo.type.name).join(", "),
                url: pokemon.url,
            };
        })
    );

    return detailedPokemonList;
}