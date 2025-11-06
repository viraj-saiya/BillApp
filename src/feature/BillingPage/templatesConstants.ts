// Default column configurations for different business types

import { createColumnHelper } from "@tanstack/react-table"

// interface GeneralBillingTemplate {
//   id: string;
//   name: string;
//   type: string;
//   width: string;
//   editable: boolean;
// }

// interface ColumnTemplate {
//   general: Array<GeneralBillingTemplate>;

// }


// export const defaultColumnTemplates : ColumnTemplate = {
  
//   general:  [
//     { id: 'sr', name: 'Sr.', type: 'number', width: '60px', editable: false },
//     { id: 'item', name: 'Item/Service', type: 'text', width: '300px', editable: true },
//     { id: 'hsncode', name: 'HSN Code', type: 'text', width: '300px', editable: true },
//     { id: 'qty', name: 'Quantity', type: 'number', width: '100px', editable: true },
//     { id: 'unit', name: 'Unit', type: 'unit', width: '80px', editable: true },
//     { id: 'mrp', name: 'MRP', type: 'currency', width: '120px', editable: true },
//     { id: 'rate', name: 'Rate', type: 'currency', width: '120px', editable: false },
//     { id: 'discount', name: 'Discount', type: 'currency', width: '120px', editable: true },
//     { id: 'discountper', name: 'Discount %', type: 'currency', width: '120px', editable: true },
//     { id: 'amount', name: 'Amount', type: 'currency', width: '120px', editable: true },
//     { id: 'gstper', name: 'GST % ', type: 'currency', width: '120px', editable: true },
//     { id: 'gstamount', name: 'GST Amount', type: 'currency', width: '120px', editable: true },
//     { id: 'taxamount', name: 'Total Amount', type: 'currency', width: '120px', editable: false },
//   ],

// };


export type GeneralBillingColumnType = {
  sr: string
  item: string
  hsncode: string
  qty: number
  unit: string
  mrp: number
  rate: number
  discount: number
  discountper: number
  amount: number
  gstper: number
  gstamount: number
  taxableamount: number
  removeItem?: boolean
}

export const defaultDataGeneralStore : Array<GeneralBillingColumnType> =[
  {
    sr: "1",
    item: "Rice",
    hsncode: "10063090",
    qty: 1,
    unit: "BAG",
    mrp: 100,
    rate: 100,
    discount: 0,
    discountper: 0,
    taxableamount: 100,
    gstper: 0,
    gstamount: 0,
    amount: 100,
  }
]



