import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './PostAllList.module.css';

const PostAllList = ({ posts, formatDate, onUpvote, onDownvote, userVote }) => {

    return (
        <>
            {posts.length > 0 ? (
                posts.map(post => {
                    const { formattedDate, formattedTime } = formatDate(post.createdAt);
                    return (
                        <div key={post.id} className={styles.postbox}>
                            <div className={styles.userContainer}>
                                <div className={styles.user_content}>
                                    <Image
                                        src="/icon.webp"
                                        alt="Description of the image"
                                        width={32}
                                        height={32}
                                        style={{ backgroundColor: post.backgroundColor }}
                                        className={styles.iconPostProfile}
                                    />
                                    <h4>{post.username} <span className={styles.dateTime}>{formattedDate} {formattedTime}</span></h4>
                                </div>
                                <div className={styles.postContent}>
                                    <h1>{post.title}</h1>
                                    <p>{post.content}</p>
                                    <div className={styles.voteContainer}>
                                        <button 
                                            onClick={() => onUpvote(post.id)} 
                                            className={`${styles.voteButton} ${userVote[post.id] === 'upvote' ? styles.active : ''}`}
                                        >
                                            <span>Upvote ↑</span> {post.upVoted}
                                        </button>
                                        <button 
                                            onClick={() => onDownvote(post.id)} 
                                            className={`${styles.voteButton} ${userVote[post.id] === 'downvote' ? styles.active : ''}`}
                                        >
                                            <span>Downvote ↓</span> {post.downVoted}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p>No posts available.</p>
            )}
        </>
    );
};

export default PostAllList;