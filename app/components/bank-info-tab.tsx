import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FarmerFormSchema } from '@/lib/schema';
import { z } from 'zod';

type BankInfoTabProps = {
	form: UseFormReturn<z.infer<typeof FarmerFormSchema>>;
};

export function BankInfoTab({ form }: BankInfoTabProps) {
	const {
		register,
		formState: { errors },
	} = form;

	return (
		<div className="space-y-4">
			<div>
				<Label htmlFor="accountNumber">Account Number</Label>
				<Input id="accountNumber" {...register('accountNumber')} />
				{errors.accountNumber && <p className="text-sm text-red-500">{errors.accountNumber.message}</p>}
			</div>
			<div>
				<Label htmlFor="ifscCode">IFSC Code</Label>
				<Input id="ifscCode" {...register('ifscCode')} />
				{errors.ifscCode && <p className="text-sm text-red-500">{errors.ifscCode.message}</p>}
			</div>
			<div>
				<Label htmlFor="branchName">Branch Name</Label>
				<Input id="branchName" {...register('branchName')} />
				{errors.branchName && <p className="text-sm text-red-500">{errors.branchName.message}</p>}
			</div>
			<div>
				<Label htmlFor="bankName">Bank Name</Label>
				<Input id="bankName" {...register('bankName')} />
				{errors.bankName && <p className="text-sm text-red-500">{errors.bankName.message}</p>}
			</div>
			<div>
				<Label htmlFor="bankCode">Bank Code</Label>
				<Input id="bankCode" {...register('bankCode')} />
				{errors.bankCode && <p className="text-sm text-red-500">{errors.bankCode.message}</p>}
			</div>
			<div>
				<Label htmlFor="address">Address</Label>
				<Input id="address" {...register('address')} />
				{errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
			</div>
		</div>
	);
}
