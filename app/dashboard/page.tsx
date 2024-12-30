'use client';

import { Button } from '@/components/ui/button';
import AppSidebar from '../components/AppSidebar';
import DetailsTable from '../components/DetailsTable';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import FarmerForm from '../components/FarmerForm';
import { Sidebar, SidebarContent } from '@/components/ui/sidebar';
import { FarmerRegistrationForm } from '../components/RegistrationForm';

const FormPage = () => {
	return (
		<div className="flex h-screen w-full">
			<Sidebar className="w-[150px] border-r border-red-800">
				<SidebarContent>
					<AppSidebar />
				</SidebarContent>
			</Sidebar>
			<main className="flex-1 p-4 overflow-y-auto">
				<div className="flex flex-col">
					<p className="text-3xl font-semibold mb-4">Dashboard</p>
					<div className="ml-auto flex gap-2 mb-4">
						<Dialog>
							<DialogTrigger asChild>
								<Button>ADD FARMER DATA</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
								<DialogHeader>
									<DialogTitle>Enter Farmer Details</DialogTitle>
								</DialogHeader>
								<FarmerRegistrationForm />
								{/* <DialogClose asChild>
									<Button type="button" variant="secondary" className="mt-4">
										Close
									</Button>
								</DialogClose> */}
							</DialogContent>
						</Dialog>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline">Export Document</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>Export as</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>CSV</DropdownMenuItem>
								<DropdownMenuItem>Json</DropdownMenuItem>
								<DropdownMenuItem>XLSX</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
				<Card>
					<CardHeader>
						<CardTitle>Data</CardTitle>
					</CardHeader>
					<CardContent>
						<DetailsTable />
					</CardContent>
				</Card>
			</main>
		</div>
	);
};

export default FormPage;
