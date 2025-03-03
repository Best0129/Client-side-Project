import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email'); 
    try {
        const { postId, action } = await req.json(); // Get postId and action from the request body

        if (!postId || !action) {
            return new Response(JSON.stringify({ message: 'Post ID and action are required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return new Response(JSON.stringify({ message: 'User  not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        if (action === 'upvote') {

            await prisma.vote.create({
                data: {
                    userId: user.id,
                    postId: postId,
                    type: 'upvote',
                },
            });

            // Increment the upvote count on the post
            const updatedPost = await prisma.post.update({
                where: { id: postId },
                data: {
                    upVoted: {
                        increment: 1, // Increment the upvote count by 1
                    },
                },
            });

            return new Response(JSON.stringify(updatedPost), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else if (action === 'removeUpvote') {

            await prisma.vote.delete({
                where: {
                    userId_postId: {
                        userId: user.id,
                        postId: postId,
                    },
                },
            });

            // Decrement the upvote count on the post
            const updatedPost = await prisma.post.update({
                where: { id: postId },
                data: {
                    upVoted: {
                        decrement: 1, // Decrement the upvote count by 1
                    },
                },
            });

            return new Response(JSON.stringify(updatedPost), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new Response(JSON.stringify({ message: 'Invalid action' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error) {
        console.error('Error processing vote:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}