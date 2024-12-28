import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { FarmerInputSchema } from '@/lib/schema';
import { uploadFileToSupabase } from '@/lib/utils';

interface Field {
	surveyNumber: string;
	areaHa: string;
	yieldEstimate: string;
	locationX: string;
	locationY: string;
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
	try {
		const farmer = await prisma.farmer.findUnique({
			where: { id: parseInt(params.id) },
			include: {
				documents: true,
				bankDetails: true,
				fields: true,
			},
		});

		if (!farmer) {
			return NextResponse.json({ message: 'Farmer not found' }, { status: 404 });
		}

		return NextResponse.json({ farmer });
	} catch (error) {
		console.error('Error fetching farmer:', error);
		return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
	}
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
	const formData = await request.formData();

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

	try {
		const input = FarmerInputSchema.parse(body);

		const profilePicPath = input.documents.profilePic ? await uploadFileToSupabase(input.documents.profilePic, 'profile-pics') : undefined;
		const aadharPath = input.documents.aadhar ? await uploadFileToSupabase(input.documents.aadhar, 'aadhar') : undefined;
		const landPath = input.documents.land ? await uploadFileToSupabase(input.documents.land, 'land') : undefined;
		const bankPath = input.documents.bank ? await uploadFileToSupabase(input.documents.bank, 'bank') : undefined;

		const farmer = await prisma.farmer.update({
			where: { id: parseInt(params.id) },
			data: {
				farmerName: input.farmerName,
				relationship: input.relationship,
				gender: input.gender,
				community: input.community,
				aadharNumber: input.aadharNumber,
				state: input.state,
				district: input.district,
				mandal: input.mandal,
				village: input.village,
				panchayath: input.panchayath,
				dateOfBirth: input.dateOfBirth,
				age: input.age,
				contactNumber: input.contactNumber,
				accountNumber: input.accountNumber,
				documents: {
					update: {
						profilePic: profilePicPath,
						aadhar: aadharPath,
						land: landPath,
						bank: bankPath,
					},
				},
				bankDetails: {
					update: input.bankDetails,
				},
				fields: {
					deleteMany: {},
					create: input.fields,
				},
			},
		});

		return NextResponse.json({ farmer });
	} catch (error) {
		console.error('Error updating farmer:', error);
		return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
	}
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
	try {
		await prisma.farmer.delete({
			where: { id: parseInt(params.id) },
		});

		return NextResponse.json({ message: 'Farmer deleted successfully' });
	} catch (error) {
		console.error('Error deleting farmer:', error);
		return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
	}
}
