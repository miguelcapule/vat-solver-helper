
import { ReceiptItem, TaxType } from "@/types";

// VAT rate is 12% in the Philippines
export const VAT_RATE = 0.12;

// Calculate VAT amount from a gross (VAT-inclusive) amount
export const calculateVatFromGross = (grossAmount: number): number => {
  return grossAmount - (grossAmount / (1 + VAT_RATE));
};

// Calculate VAT amount from a net (VAT-exclusive) amount
export const calculateVatFromNet = (netAmount: number): number => {
  return netAmount * VAT_RATE;
};

// Calculate gross (VAT-inclusive) amount from a net amount
export const calculateGrossFromNet = (netAmount: number): number => {
  return netAmount * (1 + VAT_RATE);
};

// Calculate the subtotal for a receipt item (price * quantity)
export const calculateItemSubtotal = (price: number, quantity: number): number => {
  return price * quantity;
};

// Calculate VAT breakdown from receipt items
export interface VatBreakdown {
  vatableAmount: number;   // Amount subject to VAT
  vatExemptAmount: number; // Amount exempt from VAT
  vatZeroRatedAmount: number; // Amount with 0% VAT rate
  vatAmount: number;       // Total VAT amount
  totalAmount: number;     // Total including VAT
}

export const calculateVatBreakdown = (items: ReceiptItem[]): VatBreakdown => {
  let vatableAmount = 0;
  let vatExemptAmount = 0;
  let vatZeroRatedAmount = 0;
  
  // Group amounts by tax type
  items.forEach(item => {
    const subtotal = calculateItemSubtotal(item.price, item.quantity);
    
    switch(item.taxType) {
      case 'vatable':
        // For vatable items, we need to extract the VAT from the gross amount
        vatableAmount += subtotal / (1 + VAT_RATE); // This gets the net amount
        break;
      case 'exempt':
        vatExemptAmount += subtotal;
        break;
      case 'zero-rated':
        vatZeroRatedAmount += subtotal;
        break;
    }
  });
  
  // Calculate VAT amount based on vatable amount
  const vatAmount = vatableAmount * VAT_RATE;
  
  // Calculate total amount
  const totalAmount = (vatableAmount * (1 + VAT_RATE)) + vatExemptAmount + vatZeroRatedAmount;
  
  return {
    vatableAmount,
    vatExemptAmount,
    vatZeroRatedAmount,
    vatAmount,
    totalAmount
  };
};

// Format currency to Philippine Peso
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(amount);
};

// Format percentage
export const formatPercentage = (value: number): string => {
  return `${(value * 100).toFixed(2)}%`;
};

// Determine tax type label
export const getTaxTypeLabel = (taxType: TaxType): string => {
  switch(taxType) {
    case 'vatable':
      return 'VATable (12%)';
    case 'exempt':
      return 'VAT Exempt';
    case 'zero-rated':
      return 'VAT Zero-Rated';
    default:
      return '';
  }
};
