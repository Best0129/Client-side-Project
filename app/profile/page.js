"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import styles from './userprofile.module.css';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

export default function Profile() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [view, setView] = useState('profile'); // State to manage the current view (profile, edit, change password)
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [newPassword, setNewPassword] = useState(''); // State for new password
    const [confirmPassword, setConfirmPassword] = useState(''); // State for confirming new password
    const [passwordError, setPasswordError] = useState(''); // State for password error message
    const [successMessage, setSuccessMessage] = useState(''); // State for success message
    const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

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
        } else {
            router.push('/authen/login');
        }
    }, [router]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle the visibility state
    };

    const handleEditProfile = () => {
        setView('edit'); // Set view to edit profile
        setErrorMessage('');
        setSuccessMessage(''); // Clear success message when editing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                username,
                newUsername,
                email,
                newEmail
            }),
        });

        if (response.ok) {
            const updatedUser = await response.json();
            setUsername(updatedUser.username);
            setEmail(updatedUser.email);
            setView('profile'); // Return to profile view
            setErrorMessage('');
            setSuccessMessage('Profile updated successfully!'); // Set success message

            const userData = {
                username: updatedUser.username,
                email: updatedUser.email,
            };

            if (localStorage.getItem('user')) {
                localStorage.setItem('user', JSON.stringify(userData));
            } else {
                sessionStorage.setItem('user', JSON.stringify(userData));
            }
            window.location.reload();
        } else {
            const errorText = await response.text();
            let errorData;

            try {
                errorData = JSON.parse(errorText);
            } catch {
                errorData = { error: 'Failed to parse error response' };
            }
            setErrorMessage(errorData.error || 'No changes made');
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setPasswordError('Passwords do not match.');
            return;
        }

        const response = await fetch('/api/changepassword', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                newPassword,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            setNewPassword('');
            setConfirmPassword('');
            setPasswordError('');
            setSuccessMessage('Password changed successfully!'); // Set success message
            setTimeout(() => {
                setSuccessMessage('');
            }, 1000);
            setView('profile'); // Return to profile view
        } else {
            const errorText = await response.text();
            let errorData;

            try {
                errorData = JSON.parse(errorText);
            } catch {
                errorData = { error: 'Failed to parse error response' };
            }
            setPasswordError(errorData.error || 'Failed to change password');
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

                {successMessage &&
                    <div className={styles.popupSuccessOverlay}>
                        <div className={styles.popupSuccess}>
                            <svg className={styles.succes_svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293 a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                            <p>{successMessage}</p>
                        </div>
                    </div>}

                <div className={styles.userContent}>
                    {view === 'edit' ? (
                        <form onSubmit={handleSubmit}>
                            <h1 className={styles.header}>Edit Profile</h1>
                            {errorMessage &&
                                <div className={styles.popupOverlay}>
                                    <div className={styles.popup}>
                                        <p>{errorMessage}</p>
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
                                <button onClick={() => { setView('profile'); setErrorMessage(''); }} className={styles.cancelBtn}>Cancel</button>
                                <button className={styles.confirmBtn}>Confirm</button>
                            </div>
                        </form>
                    ) : view === 'changePassword' ? (
                        <form onSubmit={handleChangePassword}>
                            <h1 className={styles.header}>Change Password</h1>
                            {passwordError &&
                                <div className={styles.popupOverlay}>
                                    <div className={styles.popup}>
                                        <p>{passwordError}</p>
                                    </div>
                                </div>}
                            {successMessage &&
                                <div className={styles.popupOverlay}>
                                    <div className={styles.popup}>
                                        <p>{successMessage}</p>
                                    </div>
                                </div>}
                            <div className={styles.inputBox}>
                                <input
                                    type={showPassword ? "text" : "password"} // Change input type based on state
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    placeholder="New Password"
                                />
                                {newPassword && ( // Conditionally render the button if password is not empty
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className={styles.viewPasswordButton} // Add a class for styling
                                    >
                                        {showPassword ? <EyeOff /> : <Eye />}
                                    </button>
                                )}
                            </div>
                            <div className={styles.inputBox}>
                                <input
                                    type={showPassword ? "text" : "password"} // Change input type based on state
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    placeholder="Confirm New Password"
                                />
                                {confirmPassword && ( // Conditionally render the button if password is not empty
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className={styles.viewPasswordButton} // Add a class for styling
                                    >
                                        {showPassword ? <EyeOff /> : <Eye />}
                                    </button>
                                )}
                            </div>
                            <div className={styles.ctaBtnContainer}>
                                <button type="button" onClick={() => setView('profile')} className={styles.cancelBtn}>Cancel</button>
                                <button type="submit" className={styles.confirmBtn}>Change Password</button>
                            </div>
                        </form>
                    ) : (
                        <>
                            <h1 className={styles.name}>{username}</h1>
                            <p>{email}</p>
                            <div className={styles.btnContainer}>
                                <button onClick={handleEditProfile}>Edit Profile</button>
                                <button onClick={() => setView('changePassword')}>Change Password</button>
                            </div>
                        </>
                    )}
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