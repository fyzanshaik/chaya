"use client";

import { useState } from "react";
import { Eye, Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Gender = "MALE" | "FEMALE" | "OTHER";
type Community = "GENERAL" | "OBC" | "BC" | "SC" | "ST";
type DocumentType = "photo" | "aadharDoc" | "landDoc" | "bankDoc";

interface GeoTag {
  latitude: number;
  longitude: number;
}

interface BankDetails {
  ifscCode: string;
  branchName: string;
  address: string;
  bankName: string;
  bankCode: string;
}

interface Field {
  geoTag: GeoTag;
  surveyNumber: string;
  areaInHa: number;
  yieldEstimate: number;
}

interface Farmer {
  id: string;
  name: string;
  relationInfo: string;
  gender: Gender;
  community: Community;
  aadharNumber: string;
  state: string;
  district: string;
  mandal: string;
  village: string;
  panchayat: string;
  dob: string;
  age: number;
  contact: string;
  photo: string;
  aadharDoc: string;
  landDoc: string;
  bankDoc: string;
  bankDetails: BankDetails;
  fields: Field[];
}

const mockFarmers: Farmer[] = [
  {
    id: "1",
    name: "John Doe",
    relationInfo: "S/O Robert Doe",
    gender: "MALE",
    community: "GENERAL",
    aadharNumber: "123456789012",
    state: "Telangana",
    district: "Hyderabad",
    mandal: "Secunderabad",
    village: "Example Village",
    panchayat: "Example Panchayat",
    dob: "1990-01-01",
    age: 33,
    contact: "9876543210",
    photo: "farmer1.jpg",
    aadharDoc: "aadhar1.pdf",
    landDoc: "land1.pdf",
    bankDoc: "bank1.pdf",
    bankDetails: {
      ifscCode: "SBIN0123456",
      branchName: "Secunderabad Branch",
      address: "Bank Street, Secunderabad",
      bankName: "State Bank of India",
      bankCode: "SBI001",
    },
    fields: [
      {
        geoTag: { latitude: 17.385044, longitude: 78.486671 },
        surveyNumber: "123/A",
        areaInHa: 2.5,
        yieldEstimate: 1000.0,
      },
      {
        geoTag: { latitude: 17.385044, longitude: 78.486671 },
        surveyNumber: "123/B",
        areaInHa: 1.5,
        yieldEstimate: 750.0,
      },
    ],
  },
  {
    id: "2",
    name: "Sarah Smith",
    relationInfo: "D/O William Smith",
    gender: "FEMALE",
    community: "OBC",
    aadharNumber: "989876543210",
    state: "Telangana",
    district: "Rangareddy",
    mandal: "Shamshabad",
    village: "Airport Village",
    panchayat: "Airport Panchayat",
    dob: "1985-05-15",
    age: 38,
    contact: "8765432109",
    photo: "farmer2.jpg",
    aadharDoc: "aadhar2.pdf",
    landDoc: "land2.pdf",
    bankDoc: "bank2.pdf",
    bankDetails: {
      ifscCode: "HDFC0001234",
      branchName: "Shamshabad Branch",
      address: "Airport Road, Shamshabad",
      bankName: "HDFC Bank",
      bankCode: "HDFC001",
    },
    fields: [
      {
        geoTag: { latitude: 17.240263, longitude: 78.42972 },
        surveyNumber: "456/A",
        areaInHa: 3.0,
        yieldEstimate: 1200.0,
      },
    ],
  },
];

interface BaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BankDetailsDialogProps extends BaseDialogProps {
  bankDetails?: BankDetails;
}

const BankDetailsDialog = ({
  bankDetails,
  isOpen,
  onClose,
}: BankDetailsDialogProps) => {
  if (!bankDetails) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Bank Details</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>IFSC Code</TableHead>
              <TableHead>Branch Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Bank Name</TableHead>
              <TableHead>Bank Code</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{bankDetails.ifscCode}</TableCell>
              <TableCell>{bankDetails.branchName}</TableCell>
              <TableCell>{bankDetails.address}</TableCell>
              <TableCell>{bankDetails.bankName}</TableCell>
              <TableCell>{bankDetails.bankCode}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

interface FieldsDialogProps extends BaseDialogProps {
  fields?: Field[];
}

const FieldsDialog = ({ fields, isOpen, onClose }: FieldsDialogProps) => {
  if (!fields) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Fields Information</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Survey Number</TableHead>
              <TableHead>Area (Ha)</TableHead>
              <TableHead>Yield Estimate</TableHead>
              <TableHead>Location</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((field, index) => (
              <TableRow key={`${field.surveyNumber}-${index}`}>
                <TableCell>{field.surveyNumber}</TableCell>
                <TableCell>{field.areaInHa.toFixed(2)}</TableCell>
                <TableCell>{field.yieldEstimate.toFixed(2)}</TableCell>
                <TableCell>{`${field.geoTag.latitude.toFixed(
                  6
                )}, ${field.geoTag.longitude.toFixed(6)}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

interface DocumentPreviewProps {
  type: DocumentType;
  value: string;
}

const DocumentPreview = ({ type, value }: DocumentPreviewProps) => (
  <div className="relative group">
    <Eye className="h-4 w-4 cursor-pointer hover:text-blue-500" />
    <div className="hidden group-hover:block absolute z-50 p-2 bg-white rounded shadow-lg -translate-x-1/2 left-1/2">
      {type === "photo" ? (
        <img
          src={`/api/placeholder/100/100`}
          alt="Farmer photo"
          className="w-24 h-24 object-cover rounded"
        />
      ) : (
        <div className="flex items-center space-x-2 min-w-[200px]">
          <span className="text-sm truncate">{value}</span>
          <Download className="h-4 w-4 cursor-pointer hover:text-blue-500" />
        </div>
      )}
    </div>
  </div>
);

const DetailsTable = () => {
  const [selectedBankDetails, setSelectedBankDetails] = useState<BankDetails>();
  const [selectedFields, setSelectedFields] = useState<Field[]>();

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap">id</TableHead>
            <TableHead className="whitespace-nowrap">Name</TableHead>
            <TableHead className="whitespace-nowrap">Relation</TableHead>
            <TableHead className="whitespace-nowrap">Gender</TableHead>
            <TableHead className="whitespace-nowrap">Community</TableHead>
            <TableHead className="whitespace-nowrap">Aadhar</TableHead>
            <TableHead className="whitespace-nowrap">State</TableHead>
            <TableHead className="whitespace-nowrap">District</TableHead>
            <TableHead className="whitespace-nowrap">Mandal</TableHead>
            <TableHead className="whitespace-nowrap">Village</TableHead>
            <TableHead className="whitespace-nowrap">Panchayat</TableHead>
            <TableHead className="whitespace-nowrap">DOB</TableHead>
            <TableHead className="whitespace-nowrap">Age</TableHead>
            <TableHead className="whitespace-nowrap">Contact</TableHead>
            <TableHead className="whitespace-nowrap">Documents</TableHead>
            <TableHead className="whitespace-nowrap">Bank Details</TableHead>
            <TableHead className="whitespace-nowrap">Fields</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockFarmers.map(farmer => (
            <TableRow key={farmer.id} className="hover:bg-muted/50">
              <TableCell>{farmer.id}</TableCell>
              <TableCell>{farmer.name}</TableCell>
              <TableCell>{farmer.relationInfo}</TableCell>
              <TableCell>{farmer.gender}</TableCell>
              <TableCell>{farmer.community}</TableCell>
              <TableCell>{farmer.aadharNumber}</TableCell>
              <TableCell>{farmer.state}</TableCell>
              <TableCell>{farmer.district}</TableCell>
              <TableCell>{farmer.mandal}</TableCell>
              <TableCell>{farmer.village}</TableCell>
              <TableCell>{farmer.panchayat}</TableCell>
              <TableCell>{farmer.dob}</TableCell>
              <TableCell>{farmer.age}</TableCell>
              <TableCell>{farmer.contact}</TableCell>
              <TableCell>
                <div className="flex space-x-3">
                  {(["photo", "aadharDoc", "landDoc", "bankDoc"] as const).map(
                    doc => (
                      <DocumentPreview
                        key={doc}
                        type={doc}
                        value={farmer[doc]}
                      />
                    )
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedBankDetails(farmer.bankDetails)}
                >
                  View Details
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedFields(farmer.fields)}
                >
                  View Fields ({farmer.fields.length})
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <BankDetailsDialog
        bankDetails={selectedBankDetails}
        isOpen={!!selectedBankDetails}
        onClose={() => setSelectedBankDetails(undefined)}
      />

      <FieldsDialog
        fields={selectedFields}
        isOpen={!!selectedFields}
        onClose={() => setSelectedFields(undefined)}
      />
    </div>
  );
};

export default DetailsTable;
