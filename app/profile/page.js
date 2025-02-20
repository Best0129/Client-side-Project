"use client";
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import styles from './Profile.module.css';
import { useState, useEffect } from 'react';

export default function Profile() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const sessionUser = sessionStorage.getItem('user');

        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user && user.username) {
                setUsername(user.username);
                setEmail(user.email);
            }
        } else if (sessionUser) {
            const user = JSON.parse(sessionUser);
            if (user && user.username) {
                setUsername(user.username);
                setEmail(user.email);
            }
        }
    }, []);


    return (
        <main>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.imageContainer}>
                    <Image
                        src="/icon.jpg"
                        alt="Description of the image"
                        width={175}
                        height={175}
                        className={styles.iconProfile}
                    />
                    <div className={styles.btnContainer}>
                        <button>Upload Profile Image</button>
                    </div>
                </div>

                <div className={styles.userContent}>
                    <h1>{username}</h1>
                    <p>{email}</p>
                    <div className={styles.btnContainer}>
                        <button>Edit Profile</button>
                        <button>Change Password</button>
                    </div>
                </div>
            </div>
            <div className={styles.postContainer}>
                <h1>Your post</h1>
                <div className={styles.notification}>
                    <div className={styles.notiglow}></div>
                    <div className={styles.notiborderglow}></div>
                    <div className={styles.notititle}>
                        <h1>Welcome To Uiverse</h1>
                    </div>
                    <div className={styles.notibody}>
                        <p>Contribute to Open Source UI Elements</p>
                    </div>
                </div>
            </div>
        </main>
    );
}