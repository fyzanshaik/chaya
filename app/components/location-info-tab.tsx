import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FarmerFormSchema } from '@/lib/schema';
import { z } from 'zod';

type LocationInfoTabProps = {
	form: UseFormReturn<z.infer<typeof FarmerFormSchema>>;
};

export function LocationInfoTab({ form }: LocationInfoTabProps) {
	const {
		register,
		formState: { errors },
	} = form;

	return (
		<div className="space-y-4">
			<div>
				<Label htmlFor="state">State</Label>
				<Input id="state" {...register('state')} />
				{errors.state && <p className="text-sm text-red-500">{errors.state.message}</p>}
			</div>
			<div>
				<Label htmlFor="district">District</Label>
				<Input id="district" {...register('district')} />
				{errors.district && <p className="text-sm text-red-500">{errors.district.message}</p>}
			</div>
			<div>
				<Label htmlFor="mandal">Mandal</Label>
				<Input id="mandal" {...register('mandal')} />
				{errors.mandal && <p className="text-sm text-red-500">{errors.mandal.message}</p>}
			</div>
			<div>
				<Label htmlFor="village">Village</Label>
				<Input id="village" {...register('village')} />
				{errors.village && <p className="text-sm text-red-500">{errors.village.message}</p>}
			</div>
			<div>
				<Label htmlFor="panchayath">Panchayath</Label>
				<Input id="panchayath" {...register('panchayath')} />
				{errors.panchayath && <p className="text-sm text-red-500">{errors.panchayath.message}</p>}
			</div>
		</div>
	);
}
