import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email'); // Get email from query parameters

    if (!email) {
        return new Response(JSON.stringify({ message: 'Email is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        // Find the user by email
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return new Response(JSON.stringify({ message: 'User  not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Fetch posts for the specified user
        const posts = await prisma.post.findMany({
            where: { userId: user.id }, // Filter by userId
            orderBy: {
                createdAt: 'desc', // Order by creation date, newest first
            },
        });

        return new Response(JSON.stringify(posts), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching user posts:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}