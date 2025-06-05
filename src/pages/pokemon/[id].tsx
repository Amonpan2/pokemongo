"use client";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { RadarChart } from '@mui/x-charts/RadarChart';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,

} from "@mui/material";
import styles from "../../styles/Pokemon.module.css";
type Pokemon = {
    id: number;
    name: string;
    sprites: {
        front_default: string;
        back_default: string;
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
};

export default function PokemonDetail({ pokemon }: { pokemon: Pokemon }) {
    if (!pokemon) return <div>Not Found</div>;
    return (
        <div
            style={{
                // minHeight: "600px",
                // width: "100%",
                textAlign: "center",
                display: "flex",
                justifyContent: "left",
                gap: 100,
                // backgroundImage: 'url("/bg-poke.png")',
                // backgroundSize: "cover",
                // backgroundRepeat: "no-repeat",
                // backgroundPosition: "center",
            }}
        >
            <Card sx={{
                maxWidth: 400,
                height: 550,
                marginLeft: 0,
                // marginRight: "auto",       
                // background: '#ffda27',
                borderRadius: 4,
                // border: '1px solid #ccc',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                border: "outset  rgba(200, 198, 71, 0.41);",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',

            }}>
                <h1 className={styles.poke_name}>{pokemon.name}</h1>

                <CardMedia sx={{
                    padding: 2,
                    // background: '#ffda27' 
                }}>
                    <Image
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                        width={350}
                        height={350}
                        style={{
                            background: 'none', borderRadius: '50%'
                            , padding: 10
                        }}
                    />
                </CardMedia>
                <CardContent sx={{ textAlign: 'center', marginTop: -10 }}>
                    <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' ,color: '#316AB1 '
                        , marginTop: 7 ,display: 'inline-block', padding: '4px 8px', 
                    }}>
                        {pokemon.id.toString().padStart(4, '0')}
                    </Typography>
                    {/* <Typography>
                        {pokemon.stats.map((stat, index) => (
                            <span key={index}>
                                {stat.stat.name}: {stat.base_stat}
                                {index < pokemon.stats.length - 1 ? ', ' : ''}
                            </span>
                        ))}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        Ability: {pokemon.abilities.map((ability, index) => (
                            <span key={index}>
                                {ability.ability.name}
                                {index < pokemon.abilities.length - 1 ? ', ' : ''}
                            </span>
                        ))}
                    </Typography>
                    <Typography>
                        Types: {pokemon.types.map((type, index) => (
                            <span key={index}>
                                {type.type.name}
                                {index < pokemon.types.length - 1 ? ', ' : ''}
                            </span>
                        ))}
                    </Typography> */}
                </CardContent>
            </Card>
            <div>
                detail ...
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!res.ok) return { notFound: true };
        const pokemon = await res.json();
        return { props: { pokemon } };
    } catch {
        return { notFound: true };
    }
};