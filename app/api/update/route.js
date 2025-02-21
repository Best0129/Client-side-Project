    import { PrismaClient } from '@prisma/client';
    import { NextResponse } from 'next/server';

    const prisma = new PrismaClient();

    export async function PUT(req) {
        try {
            const { username, newUsername, email, newEmail } = await req.json(); // Parse the JSON body

            console.log('Request body:', { username, newUsername, email, newEmail }); // Log the incoming request body

            // Check if the user exists
            const userExists = await prisma.user.findUnique({
                where: { username },
            });

            if (!userExists) {
                return NextResponse.json({ error: 'User  not found' }, { status: 404 });
            }

            // Initialize an object to hold the data to be updated
            const updateData = {};

            // Check if the new username is different from the current username
            if (newUsername && newUsername !== username) {
                // Check if the new username already exists
                const usernameExists = await prisma.user.findUnique({
                    where: { username: newUsername },
                });

                if (usernameExists) {
                    return NextResponse.json({ error: 'New username already exists' }, { status: 400 });
                }

                // If valid, add to updateData
                updateData.username = newUsername;
            }

            // Check if the new email is different from the current email
            if (newEmail && newEmail !== email) {
                // Check if the new email already exists
                const emailExists = await prisma.user.findUnique({
                    where: { email: newEmail },
                });

                if (emailExists && emailExists.username !== username) {
                    return NextResponse.json({ error: 'Email already in use by another account' }, { status: 400 });
                }

                // If valid, add to updateData
                updateData.email = newEmail;
            }

            // If there are no fields to update, return a message
            if (Object.keys(updateData).length === 0) {
                return NextResponse.json({ message: 'No changes made' }, { status: 400 });
            }

            // Update the user's email and/or username
            const updatedUser  = await prisma.user.update({
                where: { username },
                data: updateData,
            });

            return NextResponse.json(updatedUser , { status: 200 });
        } catch (error) {
            console.error('Error updating user:', error);
            return NextResponse.json({ error: 'Failed to update user', details: error.message }, { status: 500 });
        }
    }