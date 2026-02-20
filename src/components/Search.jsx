import React, { useState, useEffect } from 'react';

const Search = ({ onSelect, pokemonList }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    useEffect(() => {
        if (query.length > 0 && !selectedPokemon) {
            const lowQuery = query.toLowerCase();
            const filtered = pokemonList.filter(p =>
                p.name.toLowerCase().includes(lowQuery) ||
                (p.ja && p.ja.includes(query))
            ).slice(0, 10);
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    }, [query, pokemonList, selectedPokemon]);

    const handleSuggestionClick = (pokemon) => {
        setQuery(pokemon.ja || pokemon.name);
        setSelectedPokemon(pokemon);
        setSuggestions([]);
    };

    const handleSubmit = () => {
        let pokemonToSubmit = selectedPokemon;

        if (!pokemonToSubmit && query) {
            const lowQuery = query.toLowerCase();
            pokemonToSubmit = pokemonList.find(p =>
                p.name.toLowerCase() === lowQuery ||
                (p.ja && p.ja === query)
            );
        }

        if (pokemonToSubmit) {
            onSelect(pokemonToSubmit);
            setQuery('');
            setSelectedPokemon(null);
            setSuggestions([]);
        }
    };

    return (
        <div className="search-container">
            <div className="input-wrapper">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setSelectedPokemon(null);
                    }}
                    placeholder="ポケモンの名前を入力 (例: ピカチュウ)..."
                    className="search-input"
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                />
                <button className="submit-btn" onClick={handleSubmit}>
                    決定！
                </button>
            </div>
            {suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map(p => (
                        <li key={p.id} onClick={() => handleSuggestionClick(p)}>
                            {p.ja} ({p.name}) [ID: {p.id}]
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Search;
