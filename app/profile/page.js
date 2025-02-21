"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import styles from './profile.module.css';

export default function Profile() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State for error message

    useEffect(() => {
        const storedUser  = localStorage.getItem('user');
        const sessionUser  = sessionStorage.getItem('user');

        if (storedUser ) {
            const user = JSON.parse(storedUser );
            if (user && user.username) {
                setUsername(user.username);
                setEmail(user.email);
                setNewUsername(user.username);
                setNewEmail(user.email);
            }
        } else if (sessionUser ) {
            const user = JSON.parse(sessionUser );
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

        const response = await fetch('/api/update', {
            method: 'PUT', // Ensure this is set to 'PUT'
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
            const updatedUser  = await response.json();
            setUsername(updatedUser .username);
            setEmail(updatedUser .email);
            setIsEditing(false);
            setErrorMessage(''); // Clear any previous error messages

            // Update local storage or session storage
            const userData = {
                username: updatedUser .username,
                email: updatedUser .email,
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

            // Set the error message without logging to the console
            setErrorMessage(errorData.error || 'An unknown error occurred'); // Set the error message
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
                    {errorMessage && <p className={styles.error}>{errorMessage}</p>} {/* Display error message */}
                    {isEditing ? (
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                placeholder="Username"
                                required
                            />
                            <input
                                type="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                placeholder="Email"
                                required
                            />
                            <button type="submit">Save Changes</button>
                            <button type="button" onClick={() => { setIsEditing(false); setErrorMessage(''); }}>Cancel</button>
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