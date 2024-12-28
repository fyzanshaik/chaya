import { NextResponse } from 'next/server';
import { FarmerInputSchema, FarmerOutputSchema } from '@/lib/schema';
import { prisma } from '@/lib/prisma';
import { uploadFileToSupabase } from '@/lib/utils';

interface Field {
	surveyNumber: string;
	areaHa: string;
	yieldEstimate: string;
	locationX: string;
	locationY: string;
}

export async function POST(request: Request) {
	console.log('Received POST request to /api/farmers');
	const formData = await request.formData();
	console.log('Form data parsed successfully');

	const body = {
		farmerName: formData.get('farmerName'),
		relationship: formData.get('relationship'),
		gender: formData.get('gender'),
		community: formData.get('community'),
		aadharNumber: formData.get('aadharNumber'),
		state: formData.get('state'),
		district: formData.get('district'),
		mandal: formData.get('mandal'),
		village: formData.get('village'),
		panchayath: formData.get('panchayath'),
		dateOfBirth: formData.get('dateOfBirth'),
		age: parseInt(formData.get('age') as string),
		contactNumber: formData.get('contactNumber'),
		accountNumber: formData.get('accountNumber'),
		bankDetails: {
			ifscCode: formData.get('ifscCode'),
			branchName: formData.get('branchName'),
			address: formData.get('address'),
			bankName: formData.get('bankName'),
			bankCode: formData.get('bankCode'),
		},
		fields: JSON.parse(formData.get('fields') as string).map((field: Field) => ({
			surveyNumber: field.surveyNumber,
			areaHa: parseFloat(field.areaHa),
			yieldEstimate: parseFloat(field.yieldEstimate),
			locationX: parseFloat(field.locationX),
			locationY: parseFloat(field.locationY),
		})),
		documents: {
			profilePic: formData.get('profilePic') as File,
			aadhar: formData.get('aadhar') as File,
			land: formData.get('land') as File,
			bank: formData.get('bank') as File,
		},
	};
	console.log('Extracted fields from form data:', body);

	try {
		console.log('Validating input data with Zod schema...');
		const input = FarmerInputSchema.parse(body);
		console.log('Input data validated successfully:', input);

		console.log('Uploading files to Supabase Storage...');
		const profilePicPath = input.documents.profilePic ? await uploadFileToSupabase(input.documents.profilePic, 'profile-pics') : undefined;
		const aadharPath = input.documents.aadhar ? await uploadFileToSupabase(input.documents.aadhar, 'aadhar') : undefined;
		const landPath = input.documents.land ? await uploadFileToSupabase(input.documents.land, 'land') : undefined;
		const bankPath = input.documents.bank ? await uploadFileToSupabase(input.documents.bank, 'bank') : undefined;
		console.log('Files uploaded successfully:', {
			profilePicPath,
			aadharPath,
			landPath,
			bankPath,
		});

		console.log('Transforming input data into output schema...');
		const output = FarmerOutputSchema.parse({
			...input,
			documents: {
				profilePic: profilePicPath,
				aadhar: aadharPath,
				land: landPath,
				bank: bankPath,
			},
		});
		console.log('Output data transformed successfully:', output);

		console.log('Creating farmer record in Prisma...');
		const farmer = await prisma.farmer.create({
			data: {
				farmerName: output.farmerName,
				relationship: output.relationship,
				gender: output.gender,
				community: output.community,
				aadharNumber: output.aadharNumber,
				state: output.state,
				district: output.district,
				mandal: output.mandal,
				village: output.village,
				panchayath: output.panchayath,
				dateOfBirth: output.dateOfBirth,
				age: output.age,
				contactNumber: output.contactNumber,
				accountNumber: output.accountNumber,
				documents: {
					create: {
						profilePic: output.documents.profilePic,
						aadhar: output.documents.aadhar,
						land: output.documents.land,
						bank: output.documents.bank,
					},
				},
				bankDetails: {
					create: output.bankDetails,
				},
				fields: {
					create: output.fields,
				},
			},
		});
		console.log('Farmer record created successfully:', farmer);

		return NextResponse.json({ farmer }, { status: 201 });
	} catch (error) {
		console.error('Error occurred during POST request:', error);
		return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
	}
}

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const page = parseInt(searchParams.get('page') || '1');
	const limit = parseInt(searchParams.get('limit') || '10');

	try {
		const farmers = await prisma.farmer.findMany({
			skip: (page - 1) * limit,
			take: limit,
			include: {
				documents: true,
				bankDetails: true,
				fields: true,
			},
		});

		return NextResponse.json({ farmers });
	} catch (error) {
		console.error('Error fetching farmers:', error);
		return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
	}
}
