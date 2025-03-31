
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatCurrency } from '@/utils/vatCalculator';
import { Receipt, Plus, Search, FileText, Trash2, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';

// Dummy data for receipts
const dummyReceipts = [
  {
    id: "rec-001",
    receiptNumber: "R-20230901-001",
    customerName: "John Smith",
    vatableAmount: 1250.00,
    vatExemptAmount: 500.00,
    vatZeroRatedAmount: 0.00,
    vatAmount: 150.00,
    totalAmount: 1900.00,
    createdAt: new Date('2023-09-01T14:30:00'),
    status: 'completed',
  },
  {
    id: "rec-002",
    receiptNumber: "R-20230902-001",
    customerName: "Jane Doe",
    vatableAmount: 2450.00,
    vatExemptAmount: 0.00,
    vatZeroRatedAmount: 750.00,
    vatAmount: 294.00,
    totalAmount: 3494.00,
    createdAt: new Date('2023-09-02T10:15:00'),
    status: 'completed',
  },
  {
    id: "rec-003",
    receiptNumber: "R-20230902-002",
    customerName: "Acme Corp",
    vatableAmount: 5000.00,
    vatExemptAmount: 1200.00,
    vatZeroRatedAmount: 800.00,
    vatAmount: 600.00,
    totalAmount: 7600.00,
    createdAt: new Date('2023-09-02T16:45:00'),
    status: 'completed',
  },
  {
    id: "rec-004",
    receiptNumber: "R-20230903-001",
    customerName: "Sarah Wilson",
    vatableAmount: 3250.00,
    vatExemptAmount: 450.00,
    vatZeroRatedAmount: 0.00,
    vatAmount: 390.00,
    totalAmount: 4090.00,
    createdAt: new Date('2023-09-03T09:20:00'),
    status: 'completed',
  },
  {
    id: "rec-005",
    receiptNumber: "R-20230904-001",
    customerName: "Michael Brown",
    vatableAmount: 1800.00,
    vatExemptAmount: 350.00,
    vatZeroRatedAmount: 120.00,
    vatAmount: 216.00,
    totalAmount: 2486.00,
    createdAt: new Date('2023-09-04T13:10:00'),
    status: 'completed',
  }
];

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const Receipts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter receipts based on search term
  const filteredReceipts = dummyReceipts.filter(receipt => 
    receipt.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receipt.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-vat-darkgray">Receipts</h1>
        <Button className="bg-vat-indigo hover:bg-indigo-700">
          <Plus className="mr-2 h-4 w-4" />
          New Receipt
        </Button>
      </div>
      
      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search receipts..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Receipts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Receipts</CardTitle>
          <CardDescription>
            Manage and view your receipts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Receipt #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="text-right">VATable</TableHead>
                <TableHead className="text-right">VAT Exempt</TableHead>
                <TableHead className="text-right">Zero-Rated</TableHead>
                <TableHead className="text-right">VAT Amount</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReceipts.map((receipt) => (
                <TableRow key={receipt.id}>
                  <TableCell className="font-medium">{receipt.receiptNumber}</TableCell>
                  <TableCell>{receipt.customerName}</TableCell>
                  <TableCell className="text-right">{formatCurrency(receipt.vatableAmount)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(receipt.vatExemptAmount)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(receipt.vatZeroRatedAmount)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(receipt.vatAmount)}</TableCell>
                  <TableCell className="text-right font-semibold">{formatCurrency(receipt.totalAmount)}</TableCell>
                  <TableCell>{formatDate(receipt.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button size="icon" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Receipts;
