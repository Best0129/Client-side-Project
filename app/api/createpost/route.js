import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { title, content, userId, access } = await req.json();

        if (!title || !content || !userId) {
            return new Response(JSON.stringify({ message: 'Title, content, and userId are required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Create a new post
        const newPost = await prisma.post.create({
            data: {
                title, 
                content,
                user: {
                    connect: { id: userId }, 
                },
                access
            },
        });

        return new Response(JSON.stringify(newPost), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error creating post:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}