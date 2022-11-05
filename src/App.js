import "./styles.css";
import "mvp.css";
import { useEffect, useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [gameData, setGameData] = useState([]);

  function FetchGames() {
    fetch(`https://www.cheapshark.com/api/1.0/games?title=${query}`)
      .then((result) => result.json())
      .then((data) => {
        setGameData(data);
      });
  }

  useEffect(() => FetchGames());

  return (
    <>
      <main>
        <header>
          <h1>Steam Game Library</h1>
        </header>

        <h3>Search for the best price on Steam Games </h3>

        <form onSubmit={FetchGames}>
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            placeholder='Try Searching "Elden Ring"'
          ></input>
        </form>
      </main>

      <section>
        {Object.keys(gameData).map((game, i) => (
          <aside key={i}>
            <h2>Game name: {gameData[game].external}</h2>
            <p>Game ID: {gameData[game].gameID}</p>
            <p>lowest price: {gameData[game].cheapest}</p>
            <img src={gameData[game].thumb} alt="game icon" />
            <br></br>
          </aside>
        ))}
      </section>
    </>
  );
}
