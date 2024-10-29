import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.NEXT_PUBLIC_EMAIL,
        pass: process.env.NEXT_PUBLIC_EMAIL_PWD,
    },
});

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { errorLocation, errorMessage } = body;

    if (!errorLocation || !errorMessage) {
        return NextResponse.json({ error: 'Bad request' }, { status: 400 });
    }

    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const deviceType = isMobile ? 'Mobile' : 'Web';

    try {
        await transporter.sendMail({
            from: process.env.NEXT_PUBLIC_EMAIL,
            to: process.env.NEXT_PUBLIC_EMAIL,
            subject: 'Application Error Notification',
            html: `
                <h2>Error Notification</h2>
                <p><strong>Error Location:</strong> ${errorLocation || 'Unknown'}</p>
                <p><strong>Error Message:</strong> ${errorMessage || 'No message provided'}</p>
                <p><strong>User Agent:</strong> ${userAgent}</p>
                <p><strong>Device Type:</strong> ${deviceType}</p>
                <p><strong>Is Mobile:</strong> ${isMobile ? 'Yes' : 'No'}</p>
            `,
        });

        return NextResponse.json({ success: 'Error details emailed successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Failed to send error details' }, { status: 500 });
    }
}
