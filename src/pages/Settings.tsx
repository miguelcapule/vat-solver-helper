
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { BadgeDollarSign, Building2, User } from 'lucide-react';

const Settings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-vat-darkgray">Settings</h1>
      
      <Tabs defaultValue="company">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="company">
            <Building2 className="mr-2 h-4 w-4" />
            Company Info
          </TabsTrigger>
          <TabsTrigger value="tax">
            <BadgeDollarSign className="mr-2 h-4 w-4" />
            Tax Settings
          </TabsTrigger>
          <TabsTrigger value="users">
            <User className="mr-2 h-4 w-4" />
            User Management
          </TabsTrigger>
        </TabsList>
        
        {/* Company Info Tab */}
        <TabsContent value="company" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>
                Update your business details that will appear on receipts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" defaultValue="Acme Corporation" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tin">Tax Identification Number (TIN)</Label>
                  <Input id="tin" defaultValue="123-456-789-000" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="123 Business Avenue, Makati City" />
              </div>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="info@acmecorp.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" defaultValue="+63 (2) 8123 4567" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vatRegNo">VAT Registration Number</Label>
                <Input id="vatRegNo" defaultValue="VAT-12345-67890" />
              </div>
              
              <Button className="mt-4 bg-vat-indigo hover:bg-indigo-700">Save Changes</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Receipt Customization</CardTitle>
              <CardDescription>
                Customize how your receipts appear to customers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="receiptFooter">Receipt Footer Message</Label>
                <Input id="receiptFooter" defaultValue="Thank you for your business!" />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="showLogo" />
                <Label htmlFor="showLogo">Display company logo on receipts</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="showVatBreakdown" defaultChecked />
                <Label htmlFor="showVatBreakdown">Show detailed VAT breakdown</Label>
              </div>
              
              <Button className="mt-4 bg-vat-indigo hover:bg-indigo-700">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Tax Settings Tab */}
        <TabsContent value="tax" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>VAT Settings</CardTitle>
              <CardDescription>
                Configure tax settings for your business
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="vatRate">VAT Rate (%)</Label>
                <Input id="vatRate" defaultValue="12" />
                <p className="text-sm text-muted-foreground">Standard VAT rate in the Philippines is 12%</p>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Default Tax Categories</h3>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>VATable Sales (12%)</Label>
                      <p className="text-sm text-muted-foreground">Standard goods and services subject to VAT</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>VAT Exempt</Label>
                      <p className="text-sm text-muted-foreground">Goods and services exempt from VAT</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>VAT Zero-Rated</Label>
                      <p className="text-sm text-muted-foreground">Goods and services with 0% VAT rate</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
              
              <Button className="mt-4 bg-vat-indigo hover:bg-indigo-700">Save Tax Settings</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Tax Compliance</CardTitle>
              <CardDescription>
                Settings related to tax filing and compliance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="automaticReports" defaultChecked />
                <Label htmlFor="automaticReports">Generate monthly VAT reports automatically</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="taxReminders" defaultChecked />
                <Label htmlFor="taxReminders">Enable tax filing deadline reminders</Label>
              </div>
              
              <Button className="mt-4 bg-vat-indigo hover:bg-indigo-700">Save Compliance Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* User Management Tab */}
        <TabsContent value="users" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage user accounts and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                User management features will be available in a future update.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
