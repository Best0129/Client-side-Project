"use client"
import React from 'react'
import Navbar from '@/components/Navbar';
import styles from './community.module.css'
import Image from 'next/image';

export default function Community() {
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
                </div>
            </div>
        </main>
    )
}
