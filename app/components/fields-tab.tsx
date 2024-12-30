import React from 'react';
import { UseFormReturn, useFieldArray, FieldArrayWithId } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FarmerFormSchema } from '@/lib/schema';
import * as z from 'zod';

type FieldsTabProps = {
	form: UseFormReturn<z.infer<typeof FarmerFormSchema>>;
	fields: FieldArrayWithId<z.infer<typeof FarmerFormSchema>, 'fields', 'id'>[];
	append: (value: z.infer<typeof FarmerFormSchema>['fields'][number] | z.infer<typeof FarmerFormSchema>['fields']) => void;
	remove: ReturnType<typeof useFieldArray>['remove'];
};

export function FieldsTab({ form, fields, append, remove }: FieldsTabProps) {
	const {
		register,
		formState: { errors },
	} = form;

	return (
		<div className="space-y-4">
			{fields.map((field, index) => (
				<div key={field.id} className="p-4 border rounded-md">
					<h4 className="text-lg font-semibold mb-2">Field {index + 1}</h4>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<Label htmlFor={`fields.${index}.surveyNumber`}>Survey Number</Label>
							<Input id={`fields.${index}.surveyNumber`} {...register(`fields.${index}.surveyNumber`)} />
							{errors.fields?.[index]?.surveyNumber && <p className="text-sm text-red-500">{errors.fields[index].surveyNumber.message}</p>}
						</div>
						<div>
							<Label htmlFor={`fields.${index}.areaHa`}>Area (Ha)</Label>
							<Input id={`fields.${index}.areaHa`} type="number" step="0.01" {...register(`fields.${index}.areaHa`, { valueAsNumber: true })} />
							{errors.fields?.[index]?.areaHa && <p className="text-sm text-red-500">{errors.fields[index].areaHa.message}</p>}
						</div>
						<div>
							<Label htmlFor={`fields.${index}.yieldEstimate`}>Yield Estimate</Label>
							<Input id={`fields.${index}.yieldEstimate`} type="number" step="0.01" {...register(`fields.${index}.yieldEstimate`, { valueAsNumber: true })} />
							{errors.fields?.[index]?.yieldEstimate && <p className="text-sm text-red-500">{errors.fields[index].yieldEstimate.message}</p>}
						</div>
						<div>
							<Label htmlFor={`fields.${index}.locationX`}>Location X</Label>
							<Input id={`fields.${index}.locationX`} type="number" step="0.000001" {...register(`fields.${index}.locationX`, { valueAsNumber: true })} />
							{errors.fields?.[index]?.locationX && <p className="text-sm text-red-500">{errors.fields[index].locationX.message}</p>}
						</div>
						<div>
							<Label htmlFor={`fields.${index}.locationY`}>Location Y</Label>
							<Input id={`fields.${index}.locationY`} type="number" step="0.000001" {...register(`fields.${index}.locationY`, { valueAsNumber: true })} />
							{errors.fields?.[index]?.locationY && <p className="text-sm text-red-500">{errors.fields[index].locationY.message}</p>}
						</div>
					</div>
					{index > 0 && (
						<Button type="button" variant="destructive" size="sm" className="mt-2" onClick={() => remove(index)}>
							Remove Field
						</Button>
					)}
				</div>
			))}
			<Button type="button" onClick={() => append({ surveyNumber: '', areaHa: 0, yieldEstimate: 0, locationX: 0, locationY: 0 })}>
				Add Field
			</Button>
		</div>
	);
}
