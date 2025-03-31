
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, getTaxTypeLabel } from '@/utils/vatCalculator';
import { Package, Plus, Search, Edit, Trash2, ArrowUpDown } from 'lucide-react';
import { Item, TaxType } from '@/types';

// Dummy inventory data
const dummyInventory: Item[] = [
  {
    id: "item-001",
    name: "Laptop",
    description: "High-performance laptop",
    price: 45000.00,
    taxType: 'vatable',
    stock: 15,
    sku: "LAP-001",
    createdAt: new Date('2023-08-01'),
    updatedAt: new Date('2023-08-15')
  },
  {
    id: "item-002",
    name: "Office Chair",
    description: "Ergonomic office chair",
    price: 8500.00,
    taxType: 'vatable',
    stock: 25,
    sku: "FRN-001",
    createdAt: new Date('2023-08-02'),
    updatedAt: new Date('2023-08-10')
  },
  {
    id: "item-003",
    name: "Notebook",
    description: "Premium notebook",
    price: 250.00,
    taxType: 'exempt',
    stock: 150,
    sku: "STRY-001",
    createdAt: new Date('2023-08-05'),
    updatedAt: new Date('2023-08-05')
  },
  {
    id: "item-004",
    name: "Printer",
    description: "Color laser printer",
    price: 12500.00,
    taxType: 'vatable',
    stock: 8,
    sku: "PRN-001",
    createdAt: new Date('2023-08-07'),
    updatedAt: new Date('2023-08-20')
  },
  {
    id: "item-005",
    name: "Coffee Maker",
    description: "Professional coffee machine",
    price: 15000.00,
    taxType: 'zero-rated',
    stock: 5,
    sku: "APP-001",
    createdAt: new Date('2023-08-10'),
    updatedAt: new Date('2023-08-25')
  },
  {
    id: "item-006",
    name: "Desk",
    description: "Standing desk",
    price: 18000.00,
    taxType: 'vatable',
    stock: 12,
    sku: "FRN-002",
    createdAt: new Date('2023-08-15'),
    updatedAt: new Date('2023-08-30')
  }
];

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [taxTypeFilter, setTaxTypeFilter] = useState<string>('all');
  
  // Filter inventory based on search term and tax type
  const filteredInventory = dummyInventory.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTaxType = taxTypeFilter === 'all' || item.taxType === taxTypeFilter;
    
    return matchesSearch && matchesTaxType;
  });
  
  // Get stock status
  const getStockStatus = (stock: number) => {
    if (stock <= 5) return { label: 'Low Stock', variant: 'destructive' };
    if (stock <= 10) return { label: 'Medium Stock', variant: 'warning' };
    return { label: 'In Stock', variant: 'success' };
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-vat-darkgray">Inventory</h1>
        <Button className="bg-vat-indigo hover:bg-indigo-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </div>
      
      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search inventory..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              value={taxTypeFilter}
              onValueChange={setTaxTypeFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tax Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tax Types</SelectItem>
                <SelectItem value="vatable">VATable (12%)</SelectItem>
                <SelectItem value="exempt">VAT Exempt</SelectItem>
                <SelectItem value="zero-rated">VAT Zero-Rated</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Sort
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
          <CardDescription>
            Manage your inventory and stock levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Item Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Tax Type</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-center">Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => {
                const stockStatus = getStockStatus(item.stock);
                
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.sku}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell className="max-w-xs truncate">{item.description}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-vat-gray">
                        {getTaxTypeLabel(item.taxType)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{formatCurrency(item.price)}</TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        variant={
                          stockStatus.variant === 'destructive' ? 'destructive' : 
                          stockStatus.variant === 'warning' ? 'outline' : 'default'
                        }
                      >
                        {item.stock} - {stockStatus.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button size="icon" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;
