"use client";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { typeColor } from "../../components/typeColor";
import { RadarChart } from '@mui/x-charts/RadarChart';
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Grid,


} from "@mui/material";
import styles from "../../styles/Pokemon.module.css";
type Pokemon = {
    id: number;
    name: string;
    sprites: {
        front_default: string;
        back_default: string;
        front_shiny?: string;
        back_shiny?: string;
        other?: {
            dream_world?: {
                front_default: string;
            };
            home?: {
                front_default: string;
                front_shiny: string;
            };
        };
        "official-artwork"?: {
            front_default: string;
            back_default: string;
        };
        versions: {
            "generation-viii": {
                "icons": {
                    front_default: string;
                    back_default: string;
                };
                "galar": {
                    front_default: string;
                    back_default: string;
                };
            };
        };
    };
    base_experience: number;
    height: number;
    weight: number;
    stats: {
        base_stat: number;
        stat: {
            name: string;
            url: string;
        };
    }[];
    types: {
        type: {
            name: string;
            url: string;
        };
    }[];
    abilities: {
        ability: {
            name: string;
            url: string;
        };
    }[];
    flavoe_text_entries: {
    }
};
export default function PokemonDetail({ pokemon }: { pokemon: Pokemon }) {

    if (!pokemon) return <div>Not Found</div>;
    return (
        <Grid container spacing={2} size={{ xs: 12, md: 8 }}
            style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "left",
                gap: 50,
            }}
        >
            <Card sx={{
                maxWidth: 400,
                height: 570,
                marginLeft: 0,
                borderRadius: 4,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                border: "outset rgb(148, 182, 224)",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
            }}>
                <h1 className={styles.poke_name}>{pokemon.name}</h1>
                <CardMedia sx={{
                    padding: 2,
                }}>
                    <Image
                        src={pokemon.sprites.other?.dream_world?.front_default || pokemon.sprites.front_default}
                        alt={pokemon.name}
                        width={350}
                        height={350}
                        style={{
                            padding: 10
                        }}
                    />
                </CardMedia>
                <CardContent sx={{ textAlign: 'center', marginTop: -10 }}>
                    <Typography variant="h3" component="div" sx={{
                        fontWeight: 'bold', color: '#316AB1 '
                        , marginTop: 7, display: 'inline-block', padding: '4px 8px',
                    }}>
                        #{pokemon.id.toString().padStart(4, '0')}
                    </Typography>
                </CardContent>
            </Card>
            <div style={{
                display: 'flex', gap: 20, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                border: "outset rgb(148, 182, 224)",
                borderRadius: 10, width: '70%',
                justifyContent: "center",

            }}>
                <div style={{ width: 350, }}  >
                    <div style={{
                        border: "1px solid #ccc",
                        padding: 20, borderRadius: 10,
                        marginTop: 18, marginBottom: 20
                    }}>
                        <h2 style={{ marginBottom: 10 }}>Base Experience</h2>
                        <Button
                            variant="contained"
                            size="small"
                            sx={{
                                marginRight: 2,
                                marginBottom: 0.5,
                                backgroundColor: "#316ab1",
                                color: "#fff",
                                textTransform: "capitalize"
                            }}
                            disableElevation
                        >
                            {pokemon.base_experience}
                        </Button>
                        <h3></h3>
                    </div>
                    <div style={{
                        border: "1px solid #ccc",
                        padding: 20, borderRadius: 10,
                        marginTop: 20
                    }}>
                        <h2 style={{ marginBottom: 10 }}>Types</h2>
                        <Typography>
                            {pokemon.types.map((type, index) => (
                                <Button
                                    key={index}
                                    variant="contained"
                                    size="small"
                                    sx={{
                                        marginRight: 2,
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
                    </div>
                    <div style={{
                        border: "1px solid #ccc",
                        padding: 20, borderRadius: 10,
                        marginTop: 20 
                    }}>  <h2>Abilities </h2>
                        {pokemon.abilities.map((ability, index) => (
                            <Button
                                key={index}
                                variant="contained"
                                size="small"
                                sx={{
                                    marginRight: 2,
                                    marginBottom: 0.5,
                                    backgroundColor: ' #f93b1b',
                                    color: "#fff",
                                    textTransform: "capitalize"
                                }}
                                disableElevation
                            >
                                {ability.ability.name}
                            </Button>
                        ))}
                    </div>
                    <div style={{ display: 'flex', width: '100%', marginBottom:20 }}>
                        <div style={{
                            border: "1px solid #ccc",
                            padding: 20, borderRadius: 10,
                            marginTop: 20, width: '100%'
                        }}>  <h3>weight </h3>
                            {pokemon.weight / 10} kg
                        </div>
                        <div style={{
                            border: "1px solid #ccc",
                            padding: 20, borderRadius: 10, marginLeft: 20,
                            marginTop: 20, width: '100%'
                        }}>  <h3>height</h3>
                            {pokemon.height / 10} m
                        </div>
                    </div>
                </div>
                <div style={{
                    border: "1px solid #ccc",
                    padding: 20, borderRadius: 10,
                    marginTop: 20, marginBottom: 35, width: '28%'
                }}>
                    <div style={{
                        height: 180, marginBottom: 15
                        , borderRadius: 10, padding: 10
                    }}>
                        <h2 >Shiny</h2>
                        <Image
                            src={pokemon.sprites.front_shiny || pokemon.sprites.front_default}
                            alt={`${pokemon.name} shiny`}
                            width={150}
                            height={150}
                        />
                    </div>
                    <h3 style={{ textAlign: 'center', marginTop: 30 }} >Sprite Ver.</h3>
                    <div style={{ width: '100%' }}>
                        <Image
                            src={pokemon.sprites["official-artwork"]?.front_default || pokemon.sprites.front_default}
                            alt={`${pokemon.name} official artwork`}
                            width={100}
                            height={100}
                        />
                    </div>
                    <div style={{ width: '100%' }}>
                        <Image
                            src={pokemon.sprites.other?.home?.front_default || pokemon.sprites.front_default}
                            alt={`${pokemon.name} home`}
                            width={100}
                            height={100}
                        />
                    </div>
                </div>
                <div   >
                    <h2 style={{ marginTop: 20 }}>Base Stats </h2>
                    <RadarChart
                        height={300}
                        series={[{ data: pokemon.stats.map(stat => stat.base_stat), }]}
                        radar={{
                            max: 120,
                            metrics: ['HP', 'ATK', 'Def', 'Sp. Atk ', 'Sp. Def ', 'Spe'],
                        }}
                    />
                    <Typography style={{ textAlign: 'left', padding: 15, border: "1px solid #ccc", backgroundColor: 'none', borderRadius: 10 }}>
                        {pokemon.stats.map((stat, index) => {
                            const statName = stat.stat.name
                                .replace('-', ' ')               
                                .replace(/\b\w/g, (c) => c.toUpperCase()); 
                            return (
                                <span key={index}>
                                    {statName} : {stat.base_stat}
                                    <br />
                                </span>
                            );
                        })}
                    </Typography>
                </div>
            </div>
        </Grid>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemon: Pokemon = response.data;
        return {
            props: {
                pokemon,
            },
        };
    } catch (error) {
        console.error('Failed to fetch Pokémon:', error);
        return {
            notFound: true,
        };
    }
};
