"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import styles from './userprofile.module.css';

export default function Profile() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State for error message

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const sessionUser = sessionStorage.getItem('user');

        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user && user.username) {
                setUsername(user.username);
                setEmail(user.email);
                setNewUsername(user.username);
                setNewEmail(user.email);
            }
        } else if (sessionUser) {
            const user = JSON.parse(sessionUser);
            if (user && user.username) {
                setUsername(user.username);
                setEmail(user.email);
                setNewUsername(user.username);
                setNewEmail(user.email);
            }
        }
    }, []);

    const handleEditProfile = () => {
        setIsEditing(true);
        setErrorMessage(''); // Clear any previous error messages when editing starts
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if both newUsername and newEmail are empty
        if (!newUsername && !newEmail) {
            setErrorMessage('Please provide a new username or email to update.');
            return;
        }

        const response = await fetch('/api/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username, // Current username to find the user
                newUsername, // New username to update to
                email,
                newEmail
            }),
        });

        if (response.ok) {
            const updatedUser = await response.json();
            setUsername(updatedUser.username);
            setEmail(updatedUser.email);
            setIsEditing(false);
            setErrorMessage(''); // Clear any previous error messages

            // Update local storage or session storage
            const userData = {
                username: updatedUser.username,
                email: updatedUser.email,
            };

            // Check if local storage has data
            if (localStorage.getItem('user')) {
                // Update local storage
                localStorage.setItem('user', JSON.stringify(userData));
            } else {
                // Update session storage if local storage is empty
                sessionStorage.setItem('user', JSON.stringify(userData));
            }
            window.location.reload();
        } else {
            const errorText = await response.text(); // Get the response as text
            let errorData;

            try {
                errorData = JSON.parse(errorText); // Try to parse it as JSON
            } catch {
                errorData = { error: 'Failed to parse error response' }; // Fallback if parsing fails
            }
            setErrorMessage(errorData.error || 'No changes made');
        }
    };

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
                    {isEditing ? (
                        <form onSubmit={handleSubmit}>
                            {errorMessage &&
                                <div className={styles.popupOverlay}>
                                    <div className={styles.popup}>
                                        <p>
                                            {errorMessage}</p>
                                    </div>
                                </div>}
                            <div className={styles.inputBox}>
                                <input
                                    type="text"
                                    value={newUsername}
                                    onChange={(e) => setNewUsername(e.target.value)}
                                    required
                                />
                                <span className={styles.user}>Username</span>
                            </div>

                            <div className={styles.inputBox}>
                                <input
                                    type="email"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    required
                                />
                                <span className={styles.user}>Email</span>
                            </div>
                            <div className={styles.ctaBtnContainer}>
                                <button onClick={() => { setIsEditing(false); setErrorMessage(''); }} className={styles.cancelBtn}>Cancel</button>
                                <button className={styles.confirmBtn}>Confirm</button>
                            </div>
                        </form>
                    ) : (
                        <>
                            <h1>{username}</h1>
                            <p>{email}</p>
                            <div className={styles.btnContainer}>
                                <button onClick={handleEditProfile}>Edit Profile</button>
                                <button>Change Password</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className={styles.postContainer}>
                <h3>Your post</h3>
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