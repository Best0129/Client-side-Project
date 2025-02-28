import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req) {
    try {
        const { id } = await req.json();

        if (!id) {
            return new Response(JSON.stringify({ message: 'ID is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Delete the post
        await prisma.post.delete({
            where: { id },
        });

        return new Response(JSON.stringify({ message: 'Post deleted successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error deleting post:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}