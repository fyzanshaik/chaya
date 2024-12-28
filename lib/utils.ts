import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { supabase } from './supabase';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const generateFileName = (file: File) => {
	return `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
};

export const uploadFileToSupabase = async (file: File, path: string) => {
	const fileName = generateFileName(file);
	const { data, error } = await supabase.storage.from('files').upload(`${path}/${fileName}`, file);

	if (error) throw error;
	return data.path;
};
