"use client"
import React from 'react'
import Navbar from '@/components/Navbar';
import styles from './community.module.css'
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Community() {

    const [username, setUsername] = useState('');


    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const sessionUser = sessionStorage.getItem('user');

        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user && user.username) {
                setUsername(user.username);
            }
        } else if (sessionUser) {
            const user = JSON.parse(sessionUser);
            if (user && user.username) {
                setUsername(user.username);
            }
        }
    }, []);


    return (
        <main>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.create_post}>
                    <Image
                        src="/icon.jpg"
                        alt="Description of the image"
                        width={50}
                        height={50}
                        className={styles.iconProfile}
                    />
                    <p>{username}</p>
                </div>
            </div>
        </main>
    )
}
