'use client';

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

const FarmerForm = () => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			farmerName: '',
			relationship: '',
			gender: '',
			community: '',
			aadharNumber: '',
			state: '',
			district: '',
			mandal: '',
			village: '',
			panchayath: '',
			dateOfBirth: '',
			age: 0,
			contactNumber: '',
			accountNumber: '',
			ifscCode: '',
			branchName: '',
			address: '',
			bankName: '',
			bankCode: '',
			fields: [{ surveyNumber: '', areaHa: 0, yieldEstimate: 0, locationX: 0, locationY: 0 }],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'fields',
	});

	const [files, setFiles] = useState({
		profilePic: null,
		aadhar: null,
		land: null,
		bank: null,
	});

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, files: uploadedFiles } = e.target;
		if (uploadedFiles && uploadedFiles[0]) {
			setFiles((prev) => ({ ...prev, [name]: uploadedFiles[0] }));
		}
	};

	const onSubmit = async (data: object) => {
		const formData = new FormData();

		// Append form fields
		Object.entries(data).forEach(([key, value]) => {
			if (key === 'fields') {
				formData.append(key, JSON.stringify(value));
			} else {
				formData.append(key, String(value));
			}
		});

		// Append files
		Object.entries(files).forEach(([key, file]) => {
			if (file) formData.append(key, file);
		});

		try {
			const response = await fetch('/api/farmer', {
				method: 'POST',
				body: formData,
			});

			if (response.ok) {
				alert('Farmer created successfully!');
			} else {
				const errorData = await response.json();
				alert(`Error: ${errorData.message}`);
			}
		} catch (error) {
			console.error('Error submitting form:', error);
			alert('An error occurred while submitting the form.');
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
			<h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Farmer Registration Form</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Basic Information */}
				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700">Farmer Name</label>
						<input
							{...register('farmerName', { required: 'Farmer name is required' })}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						/>
						{errors.farmerName && <p className="mt-1 text-sm text-red-600">{errors.farmerName.message}</p>}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">Relationship (S/o, W/o, D/o)</label>
						<input
							{...register('relationship', { required: 'Relationship is required' })}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						/>
						{errors.relationship && <p className="mt-1 text-sm text-red-600">{errors.relationship.message}</p>}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">Gender</label>
						<select
							{...register('gender', { required: 'Gender is required' })}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						>
							<option value="">Select</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
							<option value="Other">Other</option>
						</select>
						{errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">Community</label>
						<select
							{...register('community', { required: 'Community is required' })}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						>
							<option value="">Select</option>
							<option value="OBC">OBC</option>
							<option value="OC">OC</option>
							<option value="BC">BC</option>
							<option value="SC">SC</option>
							<option value="ST">ST</option>
						</select>
						{errors.community && <p className="mt-1 text-sm text-red-600">{errors.community.message}</p>}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">Aadhar Number</label>
						<input
							{...register('aadharNumber', { required: 'Aadhar number is required', pattern: { value: /^\d{12}$/, message: 'Invalid Aadhar number' } })}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						/>
						{errors.aadharNumber && <p className="mt-1 text-sm text-red-600">{errors.aadharNumber.message}</p>}
					</div>
				</div>

				{/* Location Information */}
				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700">State</label>
						<input
							{...register('state', { required: 'State is required' })}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						/>
						{errors.state && <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">District</label>
						<input
							{...register('district', { required: 'District is required' })}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						/>
						{errors.district && <p className="mt-1 text-sm text-red-600">{errors.district.message}</p>}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">Mandal</label>
						<input
							{...register('mandal', { required: 'Mandal is required' })}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						/>
						{errors.mandal && <p className="mt-1 text-sm text-red-600">{errors.mandal.message}</p>}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">Village</label>
						<input
							{...register('village', { required: 'Village is required' })}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						/>
						{errors.village && <p className="mt-1 text-sm text-red-600">{errors.village.message}</p>}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">Panchayath</label>
						<input
							{...register('panchayath', { required: 'Panchayath is required' })}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						/>
						{errors.panchayath && <p className="mt-1 text-sm text-red-600">{errors.panchayath.message}</p>}
					</div>
				</div>
			</div>

			{/* Personal Information */}
			<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<label className="block text-sm font-medium text-gray-700">Date of Birth</label>
					<input
						type="date"
						{...register('dateOfBirth', { required: 'Date of birth is required' })}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
					/>
					{errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>}
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700">Age</label>
					<input
						type="number"
						{...register('age', { required: 'Age is required', min: { value: 18, message: 'Age must be at least 18' } })}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
					/>
					{errors.age && <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>}
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700">Contact Number</label>
					<input
						{...register('contactNumber', { required: 'Contact number is required', pattern: { value: /^\d{10}$/, message: 'Invalid phone number' } })}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
					/>
					{errors.contactNumber && <p className="mt-1 text-sm text-red-600">{errors.contactNumber.message}</p>}
				</div>
			</div>

			{/* Bank Details */}
			<div className="mt-8">
				<h2 className="text-xl font-semibold mb-4 text-gray-800">Bank Details</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<label className="block text-sm font-medium text-gray-700">Account Number</label>
						<input
							{...register('accountNumber', { required: 'Account number is required' })}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						/>
						{errors.accountNumber && <p className="mt-1 text-sm text-red-600">{errors.accountNumber.message}</p>}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">IFSC Code</label>
						<input
							{...register('ifscCode', { required: 'IFSC code is required', pattern: { value: /^[A-Z]{4}0[A-Z0-9]{6}$/, message: 'Invalid IFSC code' } })}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						/>
						{errors.ifscCode && <p className="mt-1 text-sm text-red-600">{errors.ifscCode.message}</p>}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">Branch Name</label>
						<input
							{...register('branchName', { required: 'Branch name is required' })}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						/>
						{errors.branchName && <p className="mt-1 text-sm text-red-600">{errors.branchName.message}</p>}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">Bank Name</label>
						<input
							{...register('bankName', { required: 'Bank name is required' })}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						/>
						{errors.bankName && <p className="mt-1 text-sm text-red-600">{errors.bankName.message}</p>}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">Bank Code</label>
						<input
							{...register('bankCode', { required: 'Bank code is required' })}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						/>
						{errors.bankCode && <p className="mt-1 text-sm text-red-600">{errors.bankCode.message}</p>}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">Address</label>
						<input
							{...register('address', { required: 'Address is required' })}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						/>
						{errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
					</div>
				</div>
			</div>

			{/* Fields */}
			<div className="mt-8">
				<h2 className="text-xl font-semibold mb-4 text-gray-800">Fields</h2>
				{fields.map((field: { id: React.Key | null | undefined }, index: number) => (
					<div key={field.id} className="mb-4 p-4 border border-gray-200 rounded-md">
						<h3 className="text-lg font-medium mb-2">Field {index + 1}</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700">Survey Number</label>
								<input
									{...register(`fields.${index}.surveyNumber` as const, { required: 'Survey number is required' })}
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
								/>
								{errors.fields?.[index]?.surveyNumber && <p className="mt-1 text-sm text-red-600">{errors.fields[index].surveyNumber.message}</p>}
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">Area (Ha)</label>
								<input
									type="number"
									step="0.01"
									{...register(`fields.${index}.areaHa` as const, { required: 'Area is required', min: { value: 0, message: 'Area must be positive' } })}
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
								/>
								{errors.fields?.[index]?.areaHa && <p className="mt-1 text-sm text-red-600">{errors.fields[index].areaHa.message}</p>}
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">Yield Estimate</label>
								<input
									type="number"
									step="0.01"
									{...register(`fields.${index}.yieldEstimate` as const, { required: 'Yield estimate is required', min: { value: 0, message: 'Yield estimate must be positive' } })}
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
								/>
								{errors.fields?.[index]?.yieldEstimate && <p className="mt-1 text-sm text-red-600">{errors.fields[index].yieldEstimate.message}</p>}
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">Location X</label>
								<input
									type="number"
									step="0.000001"
									{...register(`fields.${index}.locationX` as const, { required: 'Location X is required' })}
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
								/>
								{errors.fields?.[index]?.locationX && <p className="mt-1 text-sm text-red-600">{errors.fields[index].locationX.message}</p>}
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">Location Y</label>
								<input
									type="number"
									step="0.000001"
									{...register(`fields.${index}.locationY` as const, { required: 'Location Y is required' })}
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
								/>
								{errors.fields?.[index]?.locationY && <p className="mt-1 text-sm text-red-600">{errors.fields[index].locationY.message}</p>}
							</div>
						</div>
						{index > 0 && (
							<button type="button" onClick={() => remove(index)} className="mt-2 px-3 py-1 text-sm text-red-600 hover:text-red-800">
								Remove Field
							</button>
						)}
					</div>
				))}
				<button
					type="button"
					onClick={() => append({ surveyNumber: '', areaHa: 0, yieldEstimate: 0, locationX: 0, locationY: 0 })}
					className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
				>
					Add Field
				</button>
			</div>

			{/* File Uploads */}
			<div className="mt-8">
				<h2 className="text-xl font-semibold mb-4 text-gray-800">Document Uploads</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<label className="block text-sm font-medium text-gray-700">Profile Picture</label>
						<input
							type="file"
							name="profilePic"
							onChange={handleFileChange}
							accept="image/*"
							className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
            "
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">Aadhar Document</label>
						<input
							type="file"
							name="aadhar"
							onChange={handleFileChange}
							accept="application/pdf"
							className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
            "
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">Land Document</label>
						<input
							type="file"
							name="land"
							onChange={handleFileChange}
							accept="application/pdf"
							className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
            "
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">Bank Document</label>
						<input
							type="file"
							name="bank"
							onChange={handleFileChange}
							accept="application/pdf"
							className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
            "
						/>
					</div>
				</div>
			</div>

			{/* Submit Button */}
			<div className="mt-8">
				<button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
					Submit
				</button>
			</div>
		</form>
	);
};

export default FarmerForm;
