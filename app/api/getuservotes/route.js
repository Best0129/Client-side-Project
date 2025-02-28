import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    // Find the user by email and include their votes
    const user = await prisma.user.findUnique({
        where: { email },
        include: {
            votes: true, // Include votes related to the user
        },
    });

    // Check if the user exists
    if (!user) {
        return new Response(JSON.stringify({ message: 'User  not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // Map votes to a simpler format
    const userVotes = user.votes.map(vote => ({
        postId: vote.postId,
        type: vote.type,
    }));

    // Return the user's votes
    return new Response(JSON.stringify(userVotes), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}