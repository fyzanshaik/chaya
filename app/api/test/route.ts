import { NextResponse } from 'next/server';

export async function GET() {
	try {
		return NextResponse.json({ message: 'Hello, world!' });
	} catch (error) {
		console.error('Error occurred during GET request:', error);
		return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
	}
}
