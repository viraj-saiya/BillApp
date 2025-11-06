import React, { useMemo, useState } from 'react'
import DynamicInvoiceTable from '../component/DynamicInvoiceTable'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { type GeneralBillingColumnType } from './templatesConstants';
import InvoiceTable from '../component/DynamicInvoiceTable';
import SampleInvoiceTable from '../../explore/SampleInoviceTable';


const fallbackData = []

const columnHelper = createColumnHelper<GeneralBillingColumnType>()

export const columns = [
  columnHelper.accessor("sr", {
    id: "sr",
    header: "Sr No",
    cell: info => info.getValue(),
  }),
  columnHelper.accessor("item", {
    id: "item",
    header: "Item",
    // cell: info => info.getValue(),
    cell: ({ cell, row }) => {
      return <div><strong>{'Hello World'}</strong> {'Hello World'}</div>
    }
  }),
  columnHelper.accessor("hsncode", {
    id: "hsncode",
    header: "HSN Code",
    cell: info => info.getValue(),
  }),
  columnHelper.accessor("qty", {
    id: "qty",
    header: "Qty",
    cell: info => info.getValue(),
  }),
  columnHelper.accessor("unit", {
    id: "unit",
    header: "Unit",
    cell: info => info.getValue(),
  }),
  columnHelper.accessor("mrp", {
    id: "mrp",
    header: "MRP",
    cell: info => info.getValue().toFixed(2),
  }),
  columnHelper.accessor("rate", {
    id: "rate",
    header: "Rate",
    cell: info => info.getValue().toFixed(2),
  }),
  columnHelper.accessor("discount", {
    id: "discount",
    header: "Discount",
    cell: info => info.getValue().toFixed(2),
  }),
  columnHelper.accessor("discountper", {
    id: "discountper",
    header: "Discount %",
    cell: info => `${info.getValue()}%`,
  }),
  columnHelper.accessor("taxableamount", {
    id: "taxableamount",
    header: "Taxable Amount",
    cell: info => info.getValue().toFixed(2),
  }),

  columnHelper.accessor("gstper", {
    id: "gstper",
    header: "GST %",
    cell: info => `${info.getValue()}%`,
  }),
  columnHelper.accessor("gstamount", {
    id: "gstamount",
    header: "GST Amount",
    cell: info => info.getValue().toFixed(2),
  }),
  columnHelper.accessor("amount", {
    id: "amount",
    header: "Amount",
    cell: info => info.getValue().toFixed(2),
  }),

  columnHelper.display({
    id: "removeItem",
    header: "Remove Item",
    cell: () => <button>Remove</button>,
  })
]
export function BillingPage() {

  const [data, setData] = useState(() => []);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="border-2 border-black overflow-x-auto ">


        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr className="bg-gray-100" key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    className={`border border-black px-2 py-2 text-sm font-medium text-left `}
                    key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-50">               
                {/* {columns.map((column) => (
                  <td
                    key={column.id}
                    className="border border-black px-1 py-1 text-sm"
                    style={{ width: column.width, minWidth: column.width }}
                  >
                    {renderCell(row, column)}
                  </td>
                ))} */}
                {/* <td className="border border-black px-1 py-1 text-center">
                  <button
                    onClick={() => removeRow(row.id)}
                    className="text-red-600 hover:text-red-800"
                    disabled={rows.length === 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <InvoiceTable />
      <SampleInvoiceTable />

    </div>

  )
}


