import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        const posts = await prisma.post.findMany({
            where: { 
                access: 'Public'
             },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        backgroundColor: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc', // Order by creation date, newest first
            },
        });

        // Map the posts to include the username and user's backgroundColor in the response
        const postsWithDetails = posts.map(post => ({
            id: post.id,
            title: post.title,
            content: post.content,
            backgroundColor: post.user.backgroundColor,
            upVoted: post.upVoted,
            downVoted: post.downVoted,
            userId: post.user.id,
            username: post.user.username,
            createdAt: post.createdAt,
        }));

        return new Response(JSON.stringify(postsWithDetails), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}