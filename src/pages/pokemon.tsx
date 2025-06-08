"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography, Grid, Button, TextField } from "@mui/material";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import styles from "../styles/Pokemon.module.css";
import { typeColor } from "../components/typeColor";
import Image from "next/image";
import axios from 'axios';
type Pokemon = {
  id: number;
  name: string;
  sprites: {
    front_default: string
    back_default: string
    other?: {
      dream_world?: {
        front_default: string;
      };
      home?: {
        front_default: string;
        front_shiny: string;
      };

    };

  };
  base_experience: number;
  height: number;
  weight: number;
  types: {
    type: {
      name: string;
      url: string;
    };
  }[];
  abilities: { ability: { name: string; url: string } }[];

};
type PokemonListItem = { name: string; url: string };

export default function Pokemon() {
  const [data, setData] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [allPokemon, setAllPokemon] = useState<PokemonListItem[]>([]);
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);

  //fetch all pokemon
  const fetchData_all = async () => {
    try {
      axios.get('https://pokeapi.co/api/v2/pokemon?limit=1302')
      // console.log(response.data)
      .then(response => response.data)
      .then(data =>setAllPokemon(data.results))
    } catch (error) {
      console.log('Error:', error)
    }
  };
  useEffect(() => {
    fetchData_all();
  },[])
  // useEffect(() => {
  //   fetch("https://pokeapi.co/api/v2/pokemon?limit=1302")
  //     .then(res => res.json())
  //     .then(data => setAllPokemon(data.results));
  // }, []);
  //fetch pokemon data with offset

  const fetchData = async () => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=18&offset=${offset}`);
    const list = await res.data;
    const results = await Promise.all(
      list.results.map((item: any) =>
        axios.get(item.url).then(res => res.data)
      )
    );
    setData(prev => [...prev, ...results]);
  };
  useEffect(() => {
    if (search) return;
    fetchData();
  }, [offset, search]);

  // search function
  useEffect(() => {
    if (!search) {
      setSearchResults([]);
      return;
    }

    const filtered = allPokemon
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 20)

    if (filtered.length === 0) {
      setSearchResults([]);
      return;
    }

    setLoading(true);


    Promise.all(
      filtered.map(p => axios.get(p.url).then(res => res.data))
    )
      .then(setSearchResults)
      .finally(() => setLoading(false));
  }, [search, allPokemon]);

  const displayData = search ? searchResults : data;

  return (
    <div className={styles.container}>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={search}
        onChange={e => setSearch(e.target.value)}
        onKeyDown={e => {
          if (e.key === " ") {
            e.preventDefault();
          }
        }}
        sx={{ marginBottom: 2, width: 500, display: 'block', margin: '20px auto' }}
        InputProps={{
          endAdornment: <CiSearch />
        }}
      />
      <Grid container sx={{ padding: 2 }} spacing={2}>
        {loading && (
          <Typography sx={{ width: "100%", textAlign: "center" }}>Loading...</Typography>
        )}
        {displayData.map(val => (
          <Grid size={{ xs: 12, md: 3 }}>
            <Link href={`/pokemon/${val.id}`} style={{ textDecoration: "none" }}>
              <Card>
                <CardMedia sx={{
                  padding: 2,
                  background: '#defbe9'
                }}>
                  <Image
                    src={val.sprites.other?.dream_world?.front_default || val.sprites.front_default}
                    alt={val.name}
                    width={150}
                    height={150}
                    style={{
                      padding: 10,
                      display: 'block',
                      margin: '0 auto',
                    }}
                  />
                </CardMedia>
                <CardContent>
                  <Typography>
                    {val.name.charAt(0).toUpperCase() + val.name.slice(1)}
                  </Typography>
                  <Typography>
                    {val.types.map((type, index) => (
                      <Button
                        key={index}
                        variant="contained"
                        size="small"
                        sx={{
                          marginRight: 1,
                          marginBottom: 0.5,
                          backgroundColor: typeColor(type.type.name),
                          color: "#fff",
                          textTransform: "capitalize"
                        }}
                        disableElevation
                      >
                        {type.type.name}
                      </Button>
                    ))}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
      {!search && (
        <Button
          onClick={() => setOffset(offset + 18)}
          sx={{ display: 'block', margin: '20px auto', backgroundColor: '#ffda27', color: '#fff' }}
        >Load more</Button>
      )}
    </div>
  );
}