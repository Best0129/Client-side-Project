"use client";
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import styles from './community.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Send } from 'lucide-react';
import { ChevronDown } from 'lucide-react'; // Import an icon for the dropdown
import PostAllList from '@/components/PostAllList';

export default function Community() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [bgColor, setBgColor] = useState('');
    const [postTitle, setPostTitle] = useState('');
    const [postText, setPostText] = useState('');
    const [userId, setUserId] = useState(null); // State to store userId
    const [postAccess, setPostAccess] = useState('Public'); // State for post access
    const textAreaRef = useRef(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility
    const [posts, setPosts] = useState([]); // State to hold user posts
    const [sortOrder, setSortOrder] = useState('Newest');
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [visiblePosts, setVisiblePosts] = useState(5);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [userVote, setUserVote] = useState({}); // State to track user votes

    const fetchPosts = async () => {
        const storedUser = localStorage.getItem('user');
        const sessionUser = sessionStorage.getItem('user');

        if (storedUser) {
            const response = await fetch(`/api/getallpost`);
            if (response.ok) {
                const data = await response.json();
                setPosts(data);
            } else {
                console.error('Failed to fetch user posts:', await response.text());
            }
        } else if (sessionUser) {
            const response = await fetch(`/api/getallpost`);
            if (response.ok) {
                const data = await response.json();
                setPosts(data);
            } else {
                console.error('Failed to fetch user posts:', await response.text());
            }
        }
    };

    const fetchUserVotes = async () => {
        const storedUser  = localStorage.getItem('user');
        const user = JSON.parse(storedUser );

        if (user) {
            const response = await fetch(`/api/getuservotes?email=${encodeURIComponent(user.email)}`);
            if (response.ok) {
                const votes = await response.json();
                const votesMap = {};
                votes.forEach(vote => {
                    votesMap[vote.postId] = vote.type; // Assuming vote has postId and type
                });
                setUserVote(votesMap);
                console.log(userVote); 
            } else {
                console.error('Failed to fetch user votes:', await response.text());
            }
        }
    };

    useEffect(() => {
        const fetchBgColor = async () => {
            const storedUser = localStorage.getItem('user');
            const sessionUser = sessionStorage.getItem('user');

            if (storedUser) {
                const user = JSON.parse(storedUser);
                if (user && user.username) {
                    setUsername(user.username);
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
        fetchBgColor();
        fetchPosts();
        fetchUserVotes();
    }, [router]);

    const handlePostTitleChange = (e) => {
        setPostTitle(e.target.value);
    }

    const handlePostTextChange = (e) => {
        setPostText(e.target.value);
        adjustTextAreaHeight();
    };

    const handleCancelPost = () => {
        setPostTitle('');
        setPostText('');
        setPostAccess('Public');
        adjustTextAreaHeight();
    };

    const adjustTextAreaHeight = () => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    };

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
                setPostTitle('');
                setPostText('');
                setPostAccess('Public');
                adjustTextAreaHeight();
                setSuccessMessage('Create post successfully!');
                fetchPosts();
            } else {
                const errorData = await response.json();
                console.error('Error creating post:', errorData.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleAccessChange = (access) => {
        setPostAccess(access);
        setIsDropdownOpen(false);
    };

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

    const toggleSort = () => {
        setIsSortOpen(!isSortOpen);
    };

    const handleSortChange = (order) => {
        setSortOrder(order);
        setIsSortOpen(false);
    };

    const handleViewMore = () => {
        setIsLoading(true);
        setTimeout(() => {
            setVisiblePosts(prevVisiblePosts => prevVisiblePosts + 3);
            setIsLoading(false);
        }, 1000);
    };

    const handleUpvote = async (postId) => {
        const storedUser  = localStorage.getItem('user');
        const user = JSON.parse(storedUser );
    
        try {

            const voteResponse = await fetch(`/api/checkvote?email=${encodeURIComponent(user.email)}&postId=${postId}`);
            const voteData = await voteResponse.json();
    
            const action = voteData.hasVote ? 'removeUpvote' : 'upvote';
    
            const response = await fetch(`/api/upvote?email=${encodeURIComponent(user.email)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId, action }),
            });
    
            if (response.ok) {
                fetchPosts();
                fetchUserVotes();
            } else {
                console.error(`Error ${action} post:`, await response.text());
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    const handleDownvote = async (postId) => {
        const storedUser  = localStorage.getItem('user');
        const user = JSON.parse(storedUser );
    
        try {
            // Check if the user has already downvoted this post
            const voteResponse = await fetch(`/api/checkvote?email=${encodeURIComponent(user.email)}&postId=${postId}`);
            const voteData = await voteResponse.json();
    
            const action = voteData.hasVote ? 'removeDownvote' : 'downvote';
    
            const response = await fetch(`/api/downvote?email=${encodeURIComponent(user.email)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId, action }),
            });
    
            if (response.ok) {
                fetchPosts();
                fetchUserVotes();
            } else {
                console.error(`Error ${action} post:`, await response.text());
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    return (
        <main className={styles.communityContainer}>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.banner}>
                    <h3>Welcome to GymBuddy</h3>
                    <h1>Community</h1>
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

                <div className={styles.postBox}>
                    <div className={styles.userContainer}>
                        <div className={styles.profile}>
                            <Image
                                src="/icon.webp"
                                alt="Description of the image"
                                width={32}
                                height={32}
                                style={{ backgroundColor: bgColor }}
                                className={styles.iconProfile}
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
                    <div className={styles.btnContainer}>
                        <button
                            className={styles.cancelBtn}
                            onClick={handleCancelPost}>
                            Cancel
                        </button>
                        <button
                            className={styles.postBtn}
                            disabled={!postText.trim()}
                            onClick={createPost}
                        >
                            <Send className={styles.icon} />
                            Post
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.postList}>

                <hr className={styles.sectionSep}></hr>

                <div className={styles.sortContainer}>
                    <h2>Published Posts</h2>
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

                <PostAllList
                    posts={sortPosts(posts.slice(0, visiblePosts))}
                    formatDate={formatDate}
                    onUpvote={handleUpvote}
                    onDownvote={handleDownvote}
                    userVote={userVote}
                />

                {isLoading && (
                    <div className={styles.loader}>
                        Loading ...
                    </div>
                )}

                {!isLoading && visiblePosts < posts.length && (
                    <button className={styles.viewmoreBtn} onClick={handleViewMore}>
                        <span className={styles.box}>
                            View more
                        </span>
                    </button>
                )}
            </div>
        </main>
    );
}