import pokemonNames from './pokemonNames.json';

export const fetchPokemonList = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025');
    const data = await response.json();
    return data.results.map(p => {
        const id = parseInt(p.url.split('/').filter(Boolean).pop());
        const nameMatch = pokemonNames.find(n => n.id === id);
        return {
            name: p.name,
            id: id,
            ja: nameMatch ? nameMatch.ja : p.name,
            url: p.url
        };
    });
};

export const fetchPokemonData = async (nameOrId) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
    const pokemon = await response.json();

    // 日本語名と分類を取得するために species 情報が必要
    const speciesRes = await fetch(pokemon.species.url);
    const speciesData = await speciesRes.json();

    const jaName = speciesData.names.find(n => n.language.name === 'ja-Hrkt')?.name || pokemon.name;
    const jaGenus = speciesData.genera.find(g => g.language.name === 'ja-Hrkt')?.genus || '';

    // 世代情報の数値化 (url から抽出: generation/1/ -> 1)
    const genNum = parseInt(speciesData.generation.url.split('/').filter(Boolean).pop());

    return {
        id: pokemon.id,
        name: pokemon.name,
        jaName: jaName,
        types: pokemon.types.map(t => t.type.name),
        stats: {
            hp: pokemon.stats[0].base_stat,
            atk: pokemon.stats[1].base_stat,
            def: pokemon.stats[2].base_stat,
            spa: pokemon.stats[3].base_stat,
            spd: pokemon.stats[4].base_stat,
            spe: pokemon.stats[5].base_stat,
            total: pokemon.stats.reduce((acc, s) => acc + s.base_stat, 0)
        },
        generation: genNum,
        height: pokemon.height / 10, // m
        weight: pokemon.weight / 10, // kg
        genus: jaGenus,
        image: pokemon.sprites.front_default,
        officialArtwork: pokemon.sprites.other['official-artwork'].front_default
    };
};
