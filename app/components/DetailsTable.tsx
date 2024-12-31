"use client";

import { useState, useEffect } from "react";
import { Download } from "lucide-react";
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
import { ScrollArea } from "@/components/ui/scroll-area";

type Gender = "MALE" | "FEMALE" | "OTHER";
type Community = "GENERAL" | "OBC" | "BC" | "SC" | "ST";
type DocumentType = "profilePic" | "aadhar" | "land" | "bank";

interface Documents {
  id: number;
  profilePic: string;
  aadhar: string;
  land: string;
  bank: string;
  farmerId: number;
}

interface BankDetails {
  ifscCode: string;
  branchName: string;
  address: string;
  bankName: string;
  bankCode: string;
}

interface Field {
  id: number;
  surveyNumber: string;
  areaHa: number;
  yieldEstimate: number;
  locationX: string;
  locationY: string;
}

interface Farmer {
  id: number;
  farmerName: string;
  relationship: string;
  gender: Gender;
  community: Community;
  aadharNumber: string;
  state: string;
  district: string;
  mandal: string;
  village: string;
  panchayath: string;
  dateOfBirth: string;
  age: number;
  contactNumber: string;
  accountNumber: string;
  documents: Documents;
  bankDetails: BankDetails;
  fields: Field[];
}

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
      <DialogContent className="max-w-2xl">
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
      <DialogContent className="max-w-2xl">
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
            {fields.map(field => (
              <TableRow key={field.id}>
                <TableCell>{field.surveyNumber}</TableCell>
                <TableCell>{field.areaHa}</TableCell>
                <TableCell>{field.yieldEstimate}</TableCell>
                <TableCell>{`${field.locationX}, ${field.locationY}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

interface DocumentsDialogProps extends BaseDialogProps {
  documents?: Documents;
}

const DocumentsDialog = ({
  documents,
  isOpen,
  onClose,
}: DocumentsDialogProps) => {
  if (!documents) return null;

  const documentTypes: DocumentType[] = [
    "profilePic",
    "aadhar",
    "land",
    "bank",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Documents</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          {documentTypes.map(type => (
            <div key={type} className="mb-4">
              <h3 className="text-lg font-semibold capitalize mb-2">{type}</h3>
              {type === "profilePic" ? (
                <img
                  src={documents[type]}
                  alt={`${type} document`}
                  className="w-48 h-48 object-cover rounded"
                />
              ) : (
                <div className="flex items-center justify-between bg-gray-100 p-2 rounded">
                  <span className="text-sm truncate mr-2">
                    {documents[type]}
                  </span>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

const DetailsTable = () => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [selectedBankDetails, setSelectedBankDetails] = useState<BankDetails>();
  const [selectedFields, setSelectedFields] = useState<Field[]>();
  const [selectedDocuments, setSelectedDocuments] = useState<Documents>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await fetch("/api/farmer", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch farmers");
        }
        const data = await response.json();
        setFarmers(data.farmers);
        setIsLoading(false);
      } catch (err) {
        setError("Error fetching farmers data");
        setIsLoading(false);
        console.log(err);
      }
    };

    fetchFarmers();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap">ID</TableHead>
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
          {farmers.map(farmer => (
            <TableRow key={farmer.id} className="hover:bg-muted/50">
              <TableCell className="whitespace-nowrap">{farmer.id}</TableCell>
              <TableCell className="whitespace-nowrap">
                {farmer.farmerName}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {farmer.relationship}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {farmer.gender}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {farmer.community}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {farmer.aadharNumber}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {farmer.state}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {farmer.district}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {farmer.mandal}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {farmer.village}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {farmer.panchayath}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {new Date(farmer.dateOfBirth).toLocaleDateString()}
              </TableCell>
              <TableCell className="whitespace-nowrap">{farmer.age}</TableCell>
              <TableCell className="whitespace-nowrap">
                {farmer.contactNumber}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDocuments(farmer.documents)}
                >
                  View Documents
                </Button>
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedBankDetails(farmer.bankDetails)}
                >
                  View Details
                </Button>
              </TableCell>
              <TableCell className="whitespace-nowrap">
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

      <DocumentsDialog
        documents={selectedDocuments}
        isOpen={!!selectedDocuments}
        onClose={() => setSelectedDocuments(undefined)}
      />
    </div>
  );
};

export default DetailsTable;
