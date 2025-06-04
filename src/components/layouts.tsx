import React, { ReactNode } from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { SiPokemon } from "react-icons/si";
export default function Layouts({ children }: { children: ReactNode }) {
    return (
        <div>
            <header className={styles.header}>
                <div className={styles.logoContainer}>
                        <SiPokemon className={styles.logo} />
                    <Link href={'/'} className={styles.title}>Home</Link> {' '}
                    <Link href={'/'} className={styles.title}>About</Link>


                </div>
            </header>
            <main className={styles.main}>{children}</main>
            <footer className={styles.footer}>
                <p>&copy; 2023 Pokémon Go</p>
            </footer>
        </div>
    );
}