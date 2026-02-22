import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import ResultTable from './components/ResultTable';
import { fetchPokemonData, fetchPokemonList } from './utils/pokemonApi';
import './App.css';

import finalPokemonIds from './utils/finalPokemonIds.json';

function App() {
  const [target, setTarget] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [won, setWon] = useState(false);
  const [gaveUp, setGaveUp] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allPokemon, setAllPokemon] = useState([]);

  const pickNewTarget = async (pokemonList) => {
    setLoading(true);
    // 最終進化形のみを対象にフィルター
    const finalEvolutions = pokemonList.filter(p => finalPokemonIds.includes(p.id));
    const listToPickFrom = finalEvolutions.length > 0 ? finalEvolutions : pokemonList;
    
    const randomPokemon = listToPickFrom[Math.floor(Math.random() * listToPickFrom.length)];
    const data = await fetchPokemonData(randomPokemon.id);
    setTarget(data);
    setGuesses([]);
    setWon(false);
    setGaveUp(false);
    setLoading(false);
  };

  useEffect(() => {
    const initGame = async () => {
      try {
        const list = await fetchPokemonList();
        setAllPokemon(list);
        await pickNewTarget(list);
      } catch (error) {
        console.error("Failed to load game data:", error);
      }
    };
    initGame();
  }, []);

  const handleReset = () => {
    pickNewTarget(allPokemon);
  };

  const handleGiveUp = () => {
    setGaveUp(true);
  };

  const handleGuess = async (pokemon) => {
    if (won || gaveUp) return;

    if (guesses.find(g => g.id === pokemon.id)) return;

    try {
      const data = await fetchPokemonData(pokemon.id);
      const newGuesses = [...guesses, data];
      setGuesses(newGuesses);

      if (data.id === target.id) {
        setWon(true);
      }
    } catch (error) {
      console.error("Guess failed:", error);
    }
  };

  if (loading && !target) return <div className="loading">データ取得中...</div>;

  return (
    <div className="app-container">
      <header>
        <h1>PokeGuess</h1>
      </header>

      <main>
        {won || gaveUp ? (
          <div className="win-message card">
            <h2>{won ? "正解！" : "残念..."}</h2>
            {target && (
              <>
                <img src={target.officialArtwork} alt={target.jaName} width={200} />
                <p>{won ? "正解は" : "正解は"} <strong>{target.jaName}</strong> でした！</p>
              </>
            )}
            <button className="reset-btn" onClick={handleReset}>もう一度遊ぶ</button>
          </div>
        ) : (
          <div className="guess-section card">
            <Search onSelect={handleGuess} pokemonList={allPokemon} />
            <button className="give-up-btn" onClick={handleGiveUp} style={{ marginTop: '1rem', width: '100%' }}>
              諦める
            </button>
          </div>
        )}

        <ResultTable guesses={guesses} target={target} />
      </main>
    </div>
  );
}

export default App;
