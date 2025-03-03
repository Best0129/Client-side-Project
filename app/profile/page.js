"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import PostList from '@/components/PostList';
import Loader from '@/components/Loader';
import styles from './userprofile.module.css';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Edit, Lock, ChevronDown, Send, Save } from 'lucide-react';

export default function Profile() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [view, setView] = useState('profile');
    const [posts, setPosts] = useState([]);
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [bgColor, setBgColor] = useState('#ffffff');
    const [postTitle, setPostTitle] = useState('');
    const [postText, setPostText] = useState('');
    const [userId, setUserId] = useState(null);
    const [editingPostId, setEditingPostId] = useState('');
    const [postAccess, setPostAccess] = useState('Public');
    const textAreaRef = useRef(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState('Newest');
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [visiblePosts, setVisiblePosts] = useState(3);
    const [isLoading, setIsLoading] = useState(false);
    const [loader, setLoader] = useState(true);

    // function fetch posts of user
    const fetchUserPosts = async () => {
        const storedUser = localStorage.getItem('user');
        const sessionUser = sessionStorage.getItem('user');

        if (storedUser) {
            const user = JSON.parse(storedUser);
            const response = await fetch(`/api/getuserpost?email=${encodeURIComponent(user.email)}`);
            if (response.ok) {
                const data = await response.json();
                setPosts(data);
            } else {
                console.error('Failed to fetch user posts:', await response.text());
            }
        } else if (sessionUser) {
            const user = JSON.parse(sessionUser);
            const response = await fetch(`/api/getuserpost?email=${encodeURIComponent(user.email)}`);
            if (response.ok) {
                const data = await response.json();
                setPosts(data);
            } else {
                console.error('Failed to fetch user posts:', await response.text());
            }
        }
    };

    useEffect(() => {
        // function fetch user data
        const fetchUserData = async () => {
            const storedUser = localStorage.getItem('user');
            const sessionUser = sessionStorage.getItem('user');

            if (storedUser) {
                const user = JSON.parse(storedUser);
                if (user && user.username) {
                    setUsername(user.username);
                    setEmail(user.email);
                    setNewUsername(user.username);
                    setNewEmail(user.email);
                    const response = await fetch(`/api/getuser?email=${encodeURIComponent(user.email)}`);
                    if (response.ok) {
                        const data = await response.json();
                        setBgColor(data.users.backgroundColor);
                        setUserId(data.users.id);
                    } else {
                        console.error('Failed to fetch username:', await response.text());
                    }
                }
            } else if (sessionUser) {
                const user = JSON.parse(sessionUser);
                if (user && user.username) {
                    setUsername(user.username);
                    setEmail(user.email);
                    setNewUsername(user.username);
                    setNewEmail(user.email);
                    const response = await fetch(`/api/getuser?email=${encodeURIComponent(user.email)}`);
                    if (response.ok) {
                        const data = await response.json();
                        setBgColor(data.users.backgroundColor);
                        setUserId(data.users.id);
                    } else {
                        console.error('Failed to fetch username:', await response.text());
                    }
                }
            } else {
                router.push('/authen/login');
            }
        };

        fetchUserData(); // recall function fetch user data
        fetchUserPosts(); // recall function fetch posts of user
    }, [router]);

    // function handle show password
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // function handle edit profile card
    const handleEditProfile = () => {
        setView('edit');
        setErrorMessage('');
        setSuccessMessage('');
    };

    // function handle post title change
    const handlePostTitleChange = (e) => {
        setPostTitle(e.target.value);
    }

    // function handle post content change
    const handlePostTextChange = (e) => {
        setPostText(e.target.value);
        adjustTextAreaHeight();
    };

    // function handle text area height
    const adjustTextAreaHeight = () => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    };

    // function handle create post
    const createPost = async () => {
        if (!postText.trim() || !userId) return;

        try {
            const response = await fetch('/api/createpost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: postTitle,
                    content: postText,
                    userId: userId,
                    access: postAccess,
                }),
            });

            if (response.ok) {
                const newPost = await response.json();
                console.log('Post created:', newPost);
                setPostTitle('');
                setPostText('');
                setPostAccess('Public');
                adjustTextAreaHeight();
                fetchUserPosts();
                setSuccessMessage('Create Post successfully!');
            } else {
                const errorData = await response.json();
                console.error('Error creating post:', errorData.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // function handle cancle post
    const handleCancelPost = () => {
        setPostTitle(' '); // set post title to empty string
        setPostText(''); // set post content to empty string
        setPostAccess('Public'); // set post access to Publuc
        setEditingPostId(''); // set id of post
        adjustTextAreaHeight(); // recall function handle text area height
    };

    // function handle dropdown open/close
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // function handle post access change
    const handleAccessChange = (access) => {
        setPostAccess(access);
        setIsDropdownOpen(false); // Close dropdown after selection
    };

    // function set icon background color
    const handleColorChange = async (e) => {
        const selectedColor = e.target.value;
        setBgColor(selectedColor);

        const response = await fetch('/api/updatebackgroundcolor', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                backgroundColor: selectedColor,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Background color updated:', data.backgroundColor);
            setBgColor(data.backgroundColor);
        } else {
            console.error('Failed to update background color');
        }
    };

    // function handle update user profile
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
            setView('profile');
            setErrorMessage('');
            setSuccessMessage('Update profile successfully!');

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

    // function handle change password
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
            setSuccessMessage('Change password successfully!');
            setTimeout(() => {
                setSuccessMessage('');
            }, 1000);
            setView('profile');
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

    // function handle set data of post
    const handleEditPost = (post) => {
        setPostTitle(post.title);
        setPostText(post.content);
        setPostAccess(post.access);
        setEditingPostId(post.id);
        setView('editPost');
    };

    // function handle update post
    const updatePost = async () => {
        if (!postText.trim() || !editingPostId) return;

        try {
            const response = await fetch('/api/updatepost', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: editingPostId,
                    title: postTitle,
                    content: postText,
                    access: postAccess,
                }),
            });

            if (response.ok) {
                const updatedPost = await response.json();
                console.log('Post updated:', updatedPost);
                setPostTitle('');
                setPostText('');
                setPostAccess('Public');
                setEditingPostId('');
                adjustTextAreaHeight();
                fetchUserPosts();
                setSuccessMessage(' Edit post successfully!');
            } else {
                const errorData = await response.json();
                console.error('Error updating post:', errorData.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // function handle post action
    const handlePostAction = () => {
        // if has editing postId
        if (editingPostId) {
            updatePost(); // recall function update post
        } else {
            createPost(); // recall function create post
        }
    };

    // function handle delete post
    const handleDeletePost = async (postId) => {
        const response = await fetch('/api/deletepost', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: postId }),
        });

        if (response.ok) {
            setSuccessMessage('Delete post successfully!');
            fetchUserPosts();
        } else {
            console.error('Failed to delete post');
        }
    };

    // function change format data of createAt
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const utcOffset = 7 * 60;
        const localDate = new Date(date.getTime() + utcOffset * 60000);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = localDate.toLocaleDateString(undefined, options);
        const formattedTime = localDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return { formattedDate, formattedTime };
    };

    const sortPosts = (posts) => {
        return posts.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return sortOrder === 'Newest' ? dateB - dateA : dateA - dateB;
        });
    };

    // function handle sort posts
    const toggleSort = () => {
        setIsSortOpen(!isSortOpen);
    };

    // function handle sort posts
    const handleSortChange = (order) => {
        setSortOrder(order);
        setIsSortOpen(false);
    };

    // function handle view more button
    const handleViewMore = () => {
        setIsLoading(true);
        setTimeout(() => {
            setVisiblePosts(prevVisiblePosts => prevVisiblePosts + 3); // set visible post 
            setIsLoading(false);
        }, 1000);
    };

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    const postCount = posts.length;

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoader(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <main>
            {loader ? (
                <Loader />
            ) : (
                <>
                    <Navbar />
                    <div className={styles.container}>
                        <div className={styles.imageContainer}>
                            <div className={styles.imageWrapper} onClick={() => document.getElementById('colorPicker').click()}>
                                <Image
                                    src="/icon.webp"
                                    alt="Description of the image"
                                    width={175}
                                    height={175}
                                    style={{ backgroundColor: bgColor }}
                                    className={styles.iconProfile}
                                />
                                <input
                                    type="color"
                                    id="colorPicker"
                                    style={{ display: 'none' }}
                                    onChange={handleColorChange}
                                />
                                <Edit className={styles.editIcon} />
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
                                    <h1 className={styles.header}><Edit className={styles.icon} />Edit Profile</h1>
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
                                    <h1 className={styles.header}><Lock className={styles.icon} />Change Password</h1>
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
                                            type={showPassword ? "text" : "password"}
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required
                                            placeholder="New Password"
                                        />
                                        {newPassword && (
                                            <button
                                                type="button"
                                                onClick={togglePasswordVisibility}
                                                className={styles.viewPasswordButton}
                                            >
                                                {showPassword ? <EyeOff /> : <Eye />}
                                            </button>
                                        )}
                                    </div>
                                    <div className={styles.inputBox}>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                            placeholder="Confirm New Password"
                                        />
                                        {confirmPassword && (
                                            <button
                                                type="button"
                                                onClick={togglePasswordVisibility}
                                                className={styles.viewPasswordButton}
                                            >
                                                {showPassword ? <EyeOff /> : <Eye />}
                                            </button>
                                        )}
                                    </div>
                                    <div className={styles.ctaBtnContainer}>
                                        <button type="button" onClick={() => setView('profile')} className={styles.cancelBtn}>Cancel</button>
                                        <button type="submit" className={styles.confirmBtn}>Confirm</button>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    <h1 className={styles.name}>{username}</h1>
                                    <h3>{email}</h3>
                                    <div className={styles.btnContainer}>
                                        <button onClick={handleEditProfile} className={styles.editButton}>
                                            <Edit className={styles.icon} size={14} />Edit Profile
                                        </button>
                                        <button onClick={() => setView('changePassword')} className={styles.changePasswordButton}>
                                            <Lock className={styles.icon} size={14} />Change Password
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className={styles.postContainer} id='postContainer'>
                        <h2>Post</h2>
                        <div className={styles.postbox}>
                            <div className={styles.userPost}>
                                <div className={styles.profile}>
                                    <Image
                                        src="/icon.webp"
                                        alt="Description of the image"
                                        width={32}
                                        height={32}
                                        style={{ backgroundColor: bgColor }}
                                        className={styles.iconprofile}
                                    />
                                    <h4>{username}</h4>
                                </div>
                                <div className={styles.customDropdown} onClick={toggleDropdown}>
                                    <p>Access: </p>
                                    <span>{postAccess}</span>
                                    <ChevronDown className={styles.dropdownIcon} />
                                    {isDropdownOpen && (
                                        <div className={styles.dropdownMenu}>
                                            <div className={styles.dropdownItem} onClick={() => handleAccessChange('Public')}>
                                                Public
                                            </div>
                                            <div className={styles.dropdownItem} onClick={() => handleAccessChange('Private')}>
                                                Private
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <input
                                className={styles.postTitle}
                                type='text'
                                placeholder="What's your topic?"
                                value={postTitle}
                                onChange={handlePostTitleChange}
                            />
                            <textarea
                                ref={textAreaRef}
                                className={styles.postText}
                                placeholder={`What are you thinking? ${username}`}
                                value={postText}
                                onChange={handlePostTextChange}
                            ></textarea>
                            <div className={styles.btncontainer}>
                                <button
                                    className={styles.cancelbtn}
                                    onClick={handleCancelPost}>
                                    Cancel</button>
                                <button
                                    className={styles.postbtn}
                                    disabled={!postText.trim()}
                                    onClick={handlePostAction}
                                >
                                    {editingPostId ? (
                                        <>
                                            <Save className={styles.icon} />
                                            Save
                                        </>
                                    ) : (
                                        <>
                                            <Send className={styles.icon} />
                                            Post
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        <hr className={styles.sectionSep}></hr>

                        <div className={styles.sortContainer}>
                            <h2>Published Posts <span>#Total posts: {postCount}</span></h2>
                            <div className={styles.customdropdown} onClick={toggleSort}>
                                <p>Sort by:</p>
                                <span>{sortOrder}</span>
                                <ChevronDown className={styles.dropdownIcon} />
                                {isSortOpen && (
                                    <div className={styles.dropdownmenu}>
                                        <div className={styles.dropdownitem} onClick={() => handleSortChange('Newest')}>
                                            Newest
                                        </div>
                                        <div className={styles.dropdownitem} onClick={() => handleSortChange('Latest')}>
                                            Latest
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={styles.postList}>
                            <PostList
                                posts={sortPosts(posts.slice(0, visiblePosts))}
                                formatDate={formatDate}
                                username={username}
                                bgColor={bgColor}
                                onEdit={handleEditPost}
                                onDelete={handleDeletePost}
                            />
                        </div>

                        {isLoading &&
                            <div className={styles.loader}>
                                Loading ...
                            </div>
                        }

                        {!isLoading && visiblePosts < posts.length && (
                            <button className={styles.viewmoreBtn} onClick={handleViewMore} >
                                <span className={styles.box}>
                                    View more
                                </span>
                            </button>
                        )}
                    </div>
                </>
            )}
        </main>
    );
}