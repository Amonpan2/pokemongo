"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography, Grid, Button, TextField } from "@mui/material";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import styles from "../styles/Pokemon.module.css";

type Pokemon = {
  id: number;
  name: string;
  sprites: { front_default: string; back_default: string };
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
const typeColor = (type: string) => {
  switch (type) {
    case "fire":
      return "#ff7043";
    case "water":
      return "#42a5f5";
    case "grass":
      return "#66bb6a";
    case "electric":
      return "#ffd600";
    case "bug":
      return "#a2cf6e";
    case "poison":
      return "#ba68c8";
    case "ground":
      return "#bcaaa4";
    case "rock":
      return "#bdb76b";
    case "psychic":
      return "#f06292";
    case "fighting":
      return "#d84315";
    case "ghost":
      return "#7e57c2";
    case "ice":
      return "#4fc3f7";
    case "dragon":
      return "#1976d2";
    case "dark":
      return "#616161";
    case "fairy":
      return "#f8bbd0";
    case "steel":
      return "#90a4ae";
    case "flying":
      return "#81d4fa";
    default:
      return "#1976d2";
  }
};
export default function Pokemon() {
  const [data, setData] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [allPokemon, setAllPokemon] = useState<PokemonListItem[]>([]);
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1302")
      .then(res => res.json())
      .then(data => setAllPokemon(data.results));
  }, []);

  const fetchData = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=18&offset=${offset}`);
    const list = await res.json();
    const results = await Promise.all(
      list.results.map((item: any) =>
        fetch(item.url).then(res => res.json())
      )
    );
    setData(prev => [...prev, ...results]);
  };
  useEffect(() => {
    if (search) return; // ถ้ามี search ไม่ต้องโหลดเพิ่ม
    fetchData();
  }, [offset, search]);
  useEffect(() => {
    if (!search) {
      setSearchResults([]);
      return;
    }
    const filtered = allPokemon.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 12);
    if (filtered.length === 0) {
      setSearchResults([]);
      return;
    }
    setLoading(true);
    Promise.all(
      filtered.map(p =>
        fetch(p.url).then(res => res.json())
      )
    ).then(setSearchResults).finally(() => setLoading(false));
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
          <Grid size={{ xs: 4, md: 3 }}>
            <Link href={`/pokemon/${val.id}`} style={{ textDecoration: "none" }}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={
                    hoveredId === val.id
                      ? val.sprites.back_default
                      : val.sprites.front_default
                  }
                  alt={val.name}
                  style={{ objectFit: "contain", background: "#DEFBE9" }}
                  onMouseEnter={() => setHoveredId(val.id)}
                  onMouseLeave={() => setHoveredId(null)}
                />
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