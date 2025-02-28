import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req) {
    try {
        const { id, title, content, access } = await req.json();

        if (!id || !title || !content) {
            return new Response(JSON.stringify({ message: 'ID, title, and content are required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Update the post
        const updatedPost = await prisma.post.update({
            where: { id },
            data: { title, content, access },
        });

        return new Response(JSON.stringify(updatedPost), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error updating post:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}