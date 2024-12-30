import React, { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FarmerFormSchema } from '@/lib/schema';
import { z } from 'zod';

type PersonalInfoTabProps = {
	form: UseFormReturn<z.infer<typeof FarmerFormSchema>>;
};

export function PersonalInfoTab({ form }: PersonalInfoTabProps) {
	const {
		register,
		formState: { errors },
		watch,
		setValue,
	} = form;
	const dateOfBirth = watch('dateOfBirth');

	useEffect(() => {
		if (dateOfBirth) {
			const today = new Date();
			const birthDate = new Date(dateOfBirth);

			let age = today.getFullYear() - birthDate.getFullYear();
			const monthDiff = today.getMonth() - birthDate.getMonth();

			if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
				age--;
			}

			if (age < 0) age = 0;
			if (birthDate > today) {
				age = 0;
				alert('Future dates are not allowed');
			}

			setValue('age', age);
		}
	}, [dateOfBirth, setValue]);

	return (
		<div className="space-y-4">
			<div>
				<Label htmlFor="farmerName">Farmer Name</Label>
				<Input id="farmerName" {...register('farmerName')} />
				{errors.farmerName && <p className="text-sm text-red-500">{errors.farmerName.message}</p>}
			</div>
			<div>
				<Label htmlFor="relationship">Relationship (S/o, W/o, D/o)</Label>
				<Input id="relationship" {...register('relationship')} />
				{errors.relationship && <p className="text-sm text-red-500">{errors.relationship.message}</p>}
			</div>
			<div>
				<Label htmlFor="dateOfBirth">Date of Birth</Label>
				<Input id="dateOfBirth" type="date" {...register('dateOfBirth')} max={new Date().toISOString().split('T')[0]} />
				{errors.dateOfBirth && <p className="text-sm text-red-500">{errors.dateOfBirth.message}</p>}
			</div>

			<div>
				<Label htmlFor="age">Age</Label>
				<Input id="age" type="number" {...register('age', { valueAsNumber: true })} readOnly className="bg-gray-50" />
				{errors.age && <p className="text-sm text-red-500">{errors.age.message}</p>}
			</div>
			<div>
				<Label htmlFor="gender">Gender</Label>
				<Select onValueChange={(value) => form.setValue('gender', value)} defaultValue={form.getValues('gender')}>
					<SelectTrigger>
						<SelectValue placeholder="Select gender" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="Male">Male</SelectItem>
						<SelectItem value="Female">Female</SelectItem>
						<SelectItem value="Other">Other</SelectItem>
					</SelectContent>
				</Select>
				{errors.gender && <p className="text-sm text-red-500">{errors.gender.message}</p>}
			</div>
			<div>
				<Label htmlFor="community">Community</Label>
				<Select onValueChange={(value) => form.setValue('community', value)} defaultValue={form.getValues('community')}>
					<SelectTrigger>
						<SelectValue placeholder="Select community" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="OBC">OBC</SelectItem>
						<SelectItem value="OC">OC</SelectItem>
						<SelectItem value="BC">BC</SelectItem>
						<SelectItem value="SC">SC</SelectItem>
						<SelectItem value="ST">ST</SelectItem>
					</SelectContent>
				</Select>
				{errors.community && <p className="text-sm text-red-500">{errors.community.message}</p>}
			</div>
			<div>
				<Label htmlFor="aadharNumber">Aadhar Number</Label>
				<Input id="aadharNumber" {...register('aadharNumber')} />
				{errors.aadharNumber && <p className="text-sm text-red-500">{errors.aadharNumber.message}</p>}
			</div>

			<div>
				<Label htmlFor="contactNumber">Contact Number</Label>
				<Input id="contactNumber" {...register('contactNumber')} />
				{errors.contactNumber && <p className="text-sm text-red-500">{errors.contactNumber.message}</p>}
			</div>
		</div>
	);
}
