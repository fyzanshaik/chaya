import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type FileUploadProps = {
	label: string;
	name: string;
	accept: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function FileUpload({ label, name, accept, onChange }: FileUploadProps) {
	return (
		<div>
			<Label htmlFor={name}>{label}</Label>
			<Input id={name} name={name} type="file" accept={accept} onChange={onChange} />
		</div>
	);
}
