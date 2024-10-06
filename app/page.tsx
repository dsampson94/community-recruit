'use client';

import { Hero } from '../components/landing/Hero';
import { Footer } from '../components/landing/Footer';
import { Header } from '../components/landing/Header';

export default function Home() {
    return (
        <>
            <Header/>
            <main>
                <Hero/>
            </main>
            <Footer/>
        </>
    );
}
