
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { formatCurrency } from '@/utils/vatCalculator';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Calendar as CalendarIcon, Download, ChevronDown, FilePdf, FileSpreadsheet } from 'lucide-react';
import { format } from 'date-fns';

// Dummy report data
const vatableSalesData = [
  { month: 'Jan', sales: 120500 },
  { month: 'Feb', sales: 145000 },
  { month: 'Mar', sales: 132300 },
  { month: 'Apr', sales: 167800 },
  { month: 'May', sales: 175500 },
  { month: 'Jun', sales: 198700 },
  { month: 'Jul', sales: 210300 },
  { month: 'Aug', sales: 198500 },
  { month: 'Sep', sales: 205700 },
];

const vatPercentageData = [
  { name: 'VATable Sales', value: 205700 },
  { name: 'VAT Exempt', value: 35200 },
  { name: 'VAT Zero-Rated', value: 25800 }
];

const COLORS = ['#4f46e5', '#10b981', '#f59e0b'];

const vatSummaryData = {
  currentMonth: {
    vatableSales: 205700.00,
    vatExemptSales: 35200.00,
    vatZeroRatedSales: 25800.00,
    totalVatCollected: 24684.00,
    totalSales: 266700.00
  },
  ytd: {
    vatableSales: 1554300.00,
    vatExemptSales: 287400.00,
    vatZeroRatedSales: 197200.00,
    totalVatCollected: 186516.00,
    totalSales: 2038900.00
  }
};

const Reports = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-vat-darkgray">Reports</h1>
        
        <div className="flex space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'MMMM yyyy') : 'Select period'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <Download className="mr-2 h-4 w-4" />
                Export
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48">
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <FilePdf className="mr-2 h-4 w-4" />
                  Export as PDF
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Export as Excel
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <Tabs defaultValue="summary">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="summary">VAT Summary</TabsTrigger>
          <TabsTrigger value="sales">Sales Analysis</TabsTrigger>
          <TabsTrigger value="inventory">Inventory Reports</TabsTrigger>
        </TabsList>
        
        {/* VAT Summary Tab */}
        <TabsContent value="summary" className="space-y-6">
          {/* Monthly Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle>VAT Summary Report - {date ? format(date, 'MMMM yyyy') : 'Current Month'}</CardTitle>
              <CardDescription>
                Breakdown of VAT categories and collected amounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Summary table */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Monthly Breakdown</h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">VATable Sales:</span>
                      <span className="font-medium">{formatCurrency(vatSummaryData.currentMonth.vatableSales)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">VAT Exempt Sales:</span>
                      <span className="font-medium">{formatCurrency(vatSummaryData.currentMonth.vatExemptSales)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">VAT Zero-Rated Sales:</span>
                      <span className="font-medium">{formatCurrency(vatSummaryData.currentMonth.vatZeroRatedSales)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Output VAT (12%):</span>
                      <span className="font-medium">{formatCurrency(vatSummaryData.currentMonth.totalVatCollected)}</span>
                    </div>
                    <div className="flex justify-between py-2 font-bold">
                      <span>Total Sales:</span>
                      <span>{formatCurrency(vatSummaryData.currentMonth.totalSales)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Chart */}
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={vatPercentageData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {vatPercentageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* YTD Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle>Year-to-Date VAT Summary</CardTitle>
              <CardDescription>
                Cumulative VAT data for the current year
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* YTD data */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">YTD Totals</h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">YTD VATable Sales:</span>
                      <span className="font-medium">{formatCurrency(vatSummaryData.ytd.vatableSales)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">YTD VAT Exempt Sales:</span>
                      <span className="font-medium">{formatCurrency(vatSummaryData.ytd.vatExemptSales)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">YTD VAT Zero-Rated Sales:</span>
                      <span className="font-medium">{formatCurrency(vatSummaryData.ytd.vatZeroRatedSales)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">YTD Output VAT (12%):</span>
                      <span className="font-medium">{formatCurrency(vatSummaryData.ytd.totalVatCollected)}</span>
                    </div>
                    <div className="flex justify-between py-2 font-bold">
                      <span>YTD Total Sales:</span>
                      <span>{formatCurrency(vatSummaryData.ytd.totalSales)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Chart */}
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={vatableSalesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                      <Legend />
                      <Bar dataKey="sales" name="Monthly VATable Sales" fill="#4f46e5" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Sales Analysis Tab */}
        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Analysis</CardTitle>
              <CardDescription>Detailed sales performance analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                Sales analysis reports will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Inventory Reports Tab */}
        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Reports</CardTitle>
              <CardDescription>Stock level and inventory valuation</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                Inventory reports will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
