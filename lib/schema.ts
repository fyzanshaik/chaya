import { z } from 'zod';

export const BankDetailsSchema = z.object({
	ifscCode: z.string().min(11).max(11),
	branchName: z.string(),
	address: z.string(),
	bankName: z.string(),
	bankCode: z.string(),
});

export const FieldSchema = z.object({
	surveyNumber: z.string(),
	areaHa: z.number().positive(),
	yieldEstimate: z.number().positive(),
	locationX: z.number(),
	locationY: z.number(),
});

export const DocumentsInputSchema = z.object({
	profilePic: z.instanceof(File).optional(),
	aadhar: z.instanceof(File).optional(),
	land: z.instanceof(File).optional(),
	bank: z.instanceof(File).optional(),
});

export const DocumentsOutputSchema = z.object({
	profilePic: z.string().optional(),
	aadhar: z.string().optional(),
	land: z.string().optional(),
	bank: z.string().optional(),
});

export const FarmerInputSchema = z.object({
	farmerName: z.string(),
	relationship: z.string(),
	gender: z.string(),
	community: z.string(),
	aadharNumber: z.string().length(12),
	state: z.string(),
	district: z.string(),
	mandal: z.string(),
	village: z.string(),
	panchayath: z.string(),
	dateOfBirth: z.string().transform((str) => new Date(str)),
	age: z.number().positive(),
	contactNumber: z.string().length(10),
	accountNumber: z.string(),
	bankDetails: BankDetailsSchema,
	fields: z.array(FieldSchema),
	documents: DocumentsInputSchema,
});

export const FarmerOutputSchema = z.object({
	farmerName: z.string(),
	relationship: z.string(),
	gender: z.string(),
	community: z.string(),
	aadharNumber: z.string().length(12),
	state: z.string(),
	district: z.string(),
	mandal: z.string(),
	village: z.string(),
	panchayath: z.string(),
	dateOfBirth: z.date(),
	age: z.number().positive(),
	contactNumber: z.string().length(10),
	accountNumber: z.string(),
	bankDetails: BankDetailsSchema,
	fields: z.array(FieldSchema),
	documents: DocumentsOutputSchema,
});

export const FarmerFormSchema = z.object({
	farmerName: z.string().min(1, 'Farmer name is required'),
	relationship: z.string().min(1, 'Relationship is required'),
	gender: z.string().min(1, 'Gender is required'),
	community: z.string().min(1, 'Community is required'),
	aadharNumber: z.string().length(12, 'Aadhar number must be 12 digits'),
	state: z.string().min(1, 'State is required'),
	district: z.string().min(1, 'District is required'),
	mandal: z.string().min(1, 'Mandal is required'),
	village: z.string().min(1, 'Village is required'),
	panchayath: z.string().min(1, 'Panchayath is required'),
	dateOfBirth: z.string().min(1, 'Date of birth is required'),
	age: z.number().min(18, 'Age must be at least 18'),
	contactNumber: z.string().length(10, 'Contact number must be 10 digits'),
	accountNumber: z.string().min(1, 'Account number is required'),
	ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code'),
	branchName: z.string().min(1, 'Branch name is required'),
	address: z.string().min(1, 'Address is required'),
	bankName: z.string().min(1, 'Bank name is required'),
	bankCode: z.string().min(1, 'Bank code is required'),
	fields: z.array(
		z.object({
			surveyNumber: z.string().min(1, 'Survey number is required'),
			areaHa: z.number().min(0, 'Area must be positive'),
			yieldEstimate: z.number().min(0, 'Yield estimate must be positive'),
			locationX: z.number(),
			locationY: z.number(),
		})
	),
});

export type FarmerInput = z.infer<typeof FarmerInputSchema>;
export type FarmerOutput = z.infer<typeof FarmerOutputSchema>;
