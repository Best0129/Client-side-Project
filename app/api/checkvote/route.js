import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const postId = parseInt(searchParams.get('postId'));

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        return new Response(JSON.stringify({ message: 'User  not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const vote = await prisma.vote.findUnique({
        where: {
            userId_postId: {
                userId: user.id,
                postId: postId,
            },
        },
    });

    return new Response(JSON.stringify({ hasVote: !!vote }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}