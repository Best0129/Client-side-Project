import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PUT(req) {
    try {
        const { email, backgroundColor } = await req.json(); // Parse the JSON body

        // Check if the user exists
        const userExists = await prisma.user.findUnique({
            where: { email },
        });

        if (!userExists) {
            return NextResponse.json({ error: 'User  not found' }, { status: 404 });
        }

        // Update the user's background color
        const updatedUser  = await prisma.user.update({
            where: { email },
            data: { backgroundColor },
        });

        return NextResponse.json(updatedUser , { status: 200 });
    } catch (error) {
        console.error('Error updating background color:', error);
        return NextResponse.json({ error: 'Failed to update background color', details: error.message }, { status: 500 });
    }
}