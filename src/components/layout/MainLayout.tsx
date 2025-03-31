
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Receipt, 
  Package, 
  FileText, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { Button } from "@/components/ui/button";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-vat-gray">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-vat-indigo">VAT Solver</h1>
          <p className="text-sm text-gray-500">Receipt & Inventory System</p>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link 
                to="/" 
                className="flex items-center p-3 text-vat-darkgray rounded-md hover:bg-vat-gray transition-colors"
              >
                <LayoutDashboard className="mr-3 h-5 w-5 text-vat-indigo" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                to="/receipts" 
                className="flex items-center p-3 text-vat-darkgray rounded-md hover:bg-vat-gray transition-colors"
              >
                <Receipt className="mr-3 h-5 w-5 text-vat-indigo" />
                Receipts
              </Link>
            </li>
            <li>
              <Link 
                to="/inventory" 
                className="flex items-center p-3 text-vat-darkgray rounded-md hover:bg-vat-gray transition-colors"
              >
                <Package className="mr-3 h-5 w-5 text-vat-indigo" />
                Inventory
              </Link>
            </li>
            <li>
              <Link 
                to="/reports" 
                className="flex items-center p-3 text-vat-darkgray rounded-md hover:bg-vat-gray transition-colors"
              >
                <FileText className="mr-3 h-5 w-5 text-vat-indigo" />
                Reports
              </Link>
            </li>
            <li>
              <Link 
                to="/settings" 
                className="flex items-center p-3 text-vat-darkgray rounded-md hover:bg-vat-gray transition-colors"
              >
                <Settings className="mr-3 h-5 w-5 text-vat-indigo" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-4 mt-auto border-t">
          <Button variant="outline" className="w-full flex items-center justify-center">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm h-16 flex items-center px-6">
          <h1 className="text-lg font-medium text-vat-darkgray">VAT Receipt System</h1>
        </header>
        
        {/* Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
