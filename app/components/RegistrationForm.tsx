"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// import { useTheme } from 'next-themes';
import { Button } from "@/components/ui/button";
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Switch } from '@/components/ui/switch';
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FarmerFormSchema } from "@/lib/schema";
// import { cn } from '@/lib/utils';
import { BankInfoTab } from "./bank-info-tab";
import { FieldsTab } from "./fields-tab";
import { FileUpload } from "./file-upload";
import { LocationInfoTab } from "./location-info-tab";
import { PersonalInfoTab } from "./personal-info-tab";

type FarmerFormValues = z.infer<typeof FarmerFormSchema>;

export function FarmerRegistrationForm() {
  // const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<FarmerFormValues | null>(null);

  const form = useForm<FarmerFormValues>({
    resolver: zodResolver(FarmerFormSchema),
    defaultValues: {
      farmerName: "",
      relationship: "",
      gender: "",
      community: "",
      aadharNumber: "",
      state: "",
      district: "",
      mandal: "",
      village: "",
      panchayath: "",
      dateOfBirth: "",
      age: 0,
      contactNumber: "",
      accountNumber: "",
      ifscCode: "",
      branchName: "",
      address: "",
      bankName: "",
      bankCode: "",
      fields: [
        {
          surveyNumber: "",
          areaHa: 0,
          yieldEstimate: 0,
          locationX: 0,
          locationY: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "fields",
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
      setFiles(prev => ({ ...prev, [name]: uploadedFiles[0] }));
    }
  };

  const onSubmit = async (data: FarmerFormValues) => {
    setFormData(data);
    setOpen(true);
  };

  const handleConfirm = async () => {
    if (!formData) return;

    const formDataToSend = new FormData();

    // Append form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "fields") {
        formDataToSend.append(key, JSON.stringify(value));
      } else {
        formDataToSend.append(key, String(value));
      }
    });

    // Append files
    Object.entries(files).forEach(([key, file]) => {
      if (file) formDataToSend.append(key, file);
    });

    try {
      const response = await fetch("/api/farmer", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        alert("Farmer created successfully!");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }

    setOpen(false);
  };

  return (
    <ScrollArea className="h-full">
      <div className="container mx-auto p-6  bg-white text-gray-900">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Farmer Registration Form</CardTitle>
            <CardDescription>
              Please fill out all the required information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                  <TabsTrigger value="bank">Bank</TabsTrigger>
                  <TabsTrigger value="fields">Fields</TabsTrigger>
                </TabsList>
                <TabsContent value="personal">
                  <PersonalInfoTab form={form} />
                </TabsContent>
                <TabsContent value="location">
                  <LocationInfoTab form={form} />
                </TabsContent>
                <TabsContent value="bank">
                  <BankInfoTab form={form} />
                </TabsContent>
                <TabsContent value="fields">
                  <FieldsTab
                    fields={fields}
                    form={form}
                    append={append}
                    remove={remove}
                  />
                </TabsContent>
              </Tabs>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Document Uploads</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FileUpload
                    label="Profile Picture"
                    name="profilePic"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <FileUpload
                    label="Aadhar Document"
                    name="aadhar"
                    accept="application/pdf"
                    onChange={handleFileChange}
                  />
                  <FileUpload
                    label="Land Document"
                    name="land"
                    accept="application/pdf"
                    onChange={handleFileChange}
                  />
                  <FileUpload
                    label="Bank Document"
                    name="bank"
                    accept="application/pdf"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full mt-6">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Submission</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit this farmer registration form?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ScrollArea>
  );
}

// ... (PersonalInfoTab, LocationInfoTab, BankInfoTab, FieldsTab, and FileUpload components will be defined in separate files)
