import { z } from 'zod';

// BankDetails Schema
export const BankDetailsSchema = z.object({
	ifscCode: z.string().min(11).max(11),
	branchName: z.string(),
	address: z.string(),
	bankName: z.string(),
	bankCode: z.string(),
});

// Field Schema
export const FieldSchema = z.object({
	surveyNumber: z.string(),
	areaHa: z.number().positive(),
	yieldEstimate: z.number().positive(),
	locationX: z.number(),
	locationY: z.number(),
});

// Input Documents Schema (for form data)
export const DocumentsInputSchema = z.object({
	profilePic: z.instanceof(File).optional(),
	aadhar: z.instanceof(File).optional(),
	land: z.instanceof(File).optional(),
	bank: z.instanceof(File).optional(),
});

// Output Documents Schema (for final data)
export const DocumentsOutputSchema = z.object({
	profilePic: z.string().optional(),
	aadhar: z.string().optional(),
	land: z.string().optional(),
	bank: z.string().optional(),
});

// Input Farmer Schema (for form data)
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
	documents: DocumentsInputSchema, // Use the input schema for documents
});

// Output Farmer Schema (for final data)
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
	documents: DocumentsOutputSchema, // Use the output schema for documents
});

export type FarmerInput = z.infer<typeof FarmerInputSchema>;
export type FarmerOutput = z.infer<typeof FarmerOutputSchema>;
