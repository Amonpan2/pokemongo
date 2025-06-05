import * as React from 'react';
import { Button } from '@mui/material';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
};

type Props = {
  pokemon: Pokemon;
};

export default function Home({ pokemon }: Props) {
  const [hover, setHover] = useState(false);

  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <h1>Welcome to Pokémon Go!</h1>
      </div>
      <div style={{ textAlign: 'center' }}>
        {/* <Link href={'/pokemon'}>
          <Button>
            <Image
              src={hover ? '/lock.png' : '/pokeball.png'}
              alt="Pokeball"
              width={100}
              height={100}
              className={styles.pokeball}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            />
          </Button>
        </Link> */}
        <Link href={'/pokemon'}>
          <Image
            src={hover ? '/lock.png' : '/pokeball.png'}
            alt="Pokeball"
            width={100}
            height={100}
            className={styles.pokeball}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          />
        </Link>
      </div>
    </div>
  );
}