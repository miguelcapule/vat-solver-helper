
// Tax types
export type TaxType = 'vatable' | 'exempt' | 'zero-rated';

// Item interface
export interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  taxType: TaxType;
  stock: number;
  sku: string;
  createdAt: Date;
  updatedAt: Date;
}

// Receipt item interface
export interface ReceiptItem {
  id: string;
  itemId: string;
  receiptId: string;
  name: string;
  quantity: number;
  price: number;
  taxType: TaxType;
  subtotal: number;
}

// Receipt interface
export interface Receipt {
  id: string;
  receiptNumber: string;
  customerId?: string;
  customerName?: string;
  items: ReceiptItem[];
  vatableAmount: number;
  vatExemptAmount: number;
  vatZeroRatedAmount: number;
  vatAmount: number;
  discountAmount: number;
  totalAmount: number;
  paymentMethod: string;
  createdAt: Date;
  status: 'draft' | 'completed' | 'voided';
}

// Customer interface
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  tin?: string; // Tax Identification Number
}

// Sales Summary interface
export interface SalesSummary {
  totalSales: number;
  totalVat: number;
  vatableSales: number;
  vatExemptSales: number;
  vatZeroRatedSales: number;
  receiptCount: number;
  periodStart: Date;
  periodEnd: Date;
}
