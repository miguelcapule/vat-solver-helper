
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from '@/utils/vatCalculator';
import { 
  BarChart as BarChartIcon, 
  CreditCard, 
  DollarSign, 
  Package, 
  Receipt, 
  ShoppingCart 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Dummy data for demo
const dummySalesSummary = {
  totalSales: 158750.75,
  totalVat: 17053.65,
  vatableSales: 142113.75,
  vatExemptSales: 10250.00,
  vatZeroRatedSales: 6387.00,
  receiptCount: 47,
  periodStart: new Date('2023-09-01'),
  periodEnd: new Date('2023-09-30')
};

// Chart data
const salesData = [
  { name: 'Monday', sales: 24150.50 },
  { name: 'Tuesday', sales: 18750.25 },
  { name: 'Wednesday', sales: 21320.00 },
  { name: 'Thursday', sales: 25640.75 },
  { name: 'Friday', sales: 31250.25 },
  { name: 'Saturday', sales: 22450.00 },
  { name: 'Sunday', sales: 15190.00 }
];

const vatBreakdownData = [
  { name: 'VATable', value: dummySalesSummary.vatableSales },
  { name: 'VAT Exempt', value: dummySalesSummary.vatExemptSales },
  { name: 'Zero-Rated', value: dummySalesSummary.vatZeroRatedSales }
];

const COLORS = ['#4f46e5', '#10b981', '#f59e0b'];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-vat-darkgray">Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-vat-emerald" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(dummySalesSummary.totalSales)}</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">VAT Amount</CardTitle>
            <Receipt className="h-4 w-4 text-vat-indigo" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(dummySalesSummary.totalVat)}</div>
            <p className="text-xs text-muted-foreground">For current period</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Receipts Issued</CardTitle>
            <ShoppingCart className="h-4 w-4 text-vat-emerald" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dummySalesSummary.receiptCount}</div>
            <p className="text-xs text-muted-foreground">+8.2% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <Package className="h-4 w-4 text-vat-indigo" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Sales</CardTitle>
            <CardDescription>Sales trend for the current week</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value as number), 'Sales']}
                />
                <Legend />
                <Bar dataKey="sales" fill="#4f46e5" name="Daily Sales" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* VAT Breakdown Chart */}
        <Card>
          <CardHeader>
            <CardTitle>VAT Breakdown</CardTitle>
            <CardDescription>Distribution of sales by VAT category</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={vatBreakdownData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {vatBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* VAT Summary */}
      <Card>
        <CardHeader>
          <CardTitle>VAT Summary</CardTitle>
          <CardDescription>Current period VAT breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-vat-gray rounded-md">
              <h3 className="text-sm font-medium text-vat-darkgray mb-1">VATable Sales</h3>
              <p className="text-2xl font-bold text-vat-indigo">{formatCurrency(dummySalesSummary.vatableSales)}</p>
              <p className="text-xs text-muted-foreground">12% VAT Applicable</p>
            </div>
            
            <div className="p-4 bg-vat-gray rounded-md">
              <h3 className="text-sm font-medium text-vat-darkgray mb-1">VAT Exempt Sales</h3>
              <p className="text-2xl font-bold text-vat-emerald">{formatCurrency(dummySalesSummary.vatExemptSales)}</p>
              <p className="text-xs text-muted-foreground">No VAT Applicable</p>
            </div>
            
            <div className="p-4 bg-vat-gray rounded-md">
              <h3 className="text-sm font-medium text-vat-darkgray mb-1">Zero-Rated Sales</h3>
              <p className="text-2xl font-bold text-vat-indigo">{formatCurrency(dummySalesSummary.vatZeroRatedSales)}</p>
              <p className="text-xs text-muted-foreground">0% VAT Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
