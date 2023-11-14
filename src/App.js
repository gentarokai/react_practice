import { useEffect, useState } from "react";
import "./App.css";
import { getAllPolemon, getPokemon } from "./utils/pokemon";
import Card from "./components/Card/Card";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";

function App() {
  const initalURL = "https://pokeapi.co/api/v2/pokemon/";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");

  useEffect(() => {
    const fetchPokemonData = async (init) => {
      //全てのポケモンデータを取得
      let res = await getAllPolemon(initalURL);
      //各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      //全て取得できたらローディングの状態をfalseに変更
      setNextUrl(res.next);
      setPrevUrl(res.previous);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    //Promise.add => mapの繰り返しが終了するまで待つ
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };
  // console.log(pokemonData);

  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPolemon(nextUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const handlePrevPage = async () => {
    if (!prevUrl) return;
    let data = await getAllPolemon(prevUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  // const changePokemonData = (data) => {
  //   setPokemonData(data)
  // }

  return (
    <div className="App">
      <Header />
      {loading ? (
        <h1>Now Loading</h1>
      ) : (
        <>
          <Search
            onSearch={(url) => {
              Promise.resolve(getPokemon(url)).then((newPokemon) => {
                setPokemonData([newPokemon]);
              });
            }}
            initialUrl={initalURL}
          />
          <div className="pokemonCardContainer">
            {pokemonData.map((pokemon, i) => {
              // console.log(pokemonData);
              console.log(typeof pokemonData);
              console.log(pokemonData);
              return <Card key={i} pokemon={pokemon} />;
            })}
          </div>
          <div className="btn">
            <button onClick={handlePrevPage}>前へ</button>
            <button onClick={handleNextPage}>次へ</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
