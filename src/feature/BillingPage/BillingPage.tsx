// import React, { useMemo, useState } from 'react'
// import {
//   createColumnHelper,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
//   type ColumnDef,
// } from '@tanstack/react-table';

// export type GeneralBillingColumnType = {
//   sr: string
//   item: string
//   hsncode: string
//   qty: number
//   unit: string
//   mrp: number
//   rate: number
//   discount: number
//   discountper: number
//   amount: number
//   gstper: number
//   gstamount: number
//   taxableamount: number
//   removeItem?: boolean
// }

// export const defaultDataGeneralStore: Array<GeneralBillingColumnType> = [
//   {
//     sr: "1",
//     item: "Rice",
//     hsncode: "10063090",
//     qty: 1,
//     unit: "BAG",
//     mrp: 100,
//     rate: 100,
//     discount: 0,
//     discountper: 0,
//     taxableamount: 100,
//     gstper: 0,
//     gstamount: 0,
//     amount: 100,
//   }
// ]

// const columnHelper = createColumnHelper<GeneralBillingColumnType>()

// export function BillingPage() {
//   const [tableData, setTableData] = useState(defaultDataGeneralStore)
  
//   const columns = useMemo<ColumnDef<GeneralBillingColumnType, any>[]>(() => [
//     columnHelper.accessor("sr", {
//       id: "sr",
//       header: "Sr No",
//       cell: info => info.getValue(),
//     }),
//     columnHelper.accessor("item", {
//       id: "item",
//       header: "Item",
//       cell: ({ cell, row }) => {
//         return <div><strong>{'Hello World'}</strong> {'Hello World'}</div>
//       }
//     }),
//     columnHelper.accessor("hsncode", {
//       id: "hsncode",
//       header: "HSN Code",
//       cell: info => info.getValue(),
//     }),
//     columnHelper.accessor("qty", {
//       id: "qty",
//       header: "Qty",
//       cell: info => info.getValue(),
//     }),
//     columnHelper.accessor("unit", {
//       id: "unit",
//       header: "Unit",
//       cell: info => info.getValue(),
//     }),
//     columnHelper.accessor("mrp", {
//       id: "mrp",
//       header: "MRP",
//       cell: info => info.getValue().toFixed(2),
//     }),
//     columnHelper.accessor("rate", {
//       id: "rate",
//       header: "Rate",
//       cell: info => info.getValue().toFixed(2),
//     }),
//     columnHelper.accessor("discount", {
//       id: "discount",
//       header: "Discount",
//       cell: info => info.getValue().toFixed(2),
//     }),
//     columnHelper.accessor("discountper", {
//       id: "discountper",
//       header: "Discount %",
//       cell: info => `${info.getValue()}%`,
//     }),
//     columnHelper.accessor("taxableamount", {
//       id: "taxableamount",
//       header: "Taxable Amount",
//       cell: info => info.getValue().toFixed(2),
//     }),
//     columnHelper.accessor("gstper", {
//       id: "gstper",
//       header: "GST %",
//       cell: info => `${info.getValue()}%`,
//     }),
//     columnHelper.accessor("gstamount", {
//       id: "gstamount",
//       header: "GST Amount",
//       cell: info => info.getValue().toFixed(2),
//     }),
//     columnHelper.accessor("amount", {
//       id: "amount",
//       header: "Amount",
//       cell: info => info.getValue().toFixed(2),
//     }),
//     columnHelper.display({
//       id: "removeItem",
//       header: "Remove Item",
//       cell: () => <button>Remove</button>,
//     })
//   ], [])

//   const table = useReactTable({
//     data: tableData, // Changed from 'tableData' to 'data'
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   })

//   return (
//     <div className="w-full max-w-6xl mx-auto p-4">
//       <div className="border-2 border-red-500 overflow-x-auto">
//         <table className="w-full">
//           <thead>
//             {table.getHeaderGroups().map(headerGroup => (
//               <tr className="bg-gray-100" key={headerGroup.id}>
//                 {headerGroup.headers.map(header => (
//                   <th
//                     className="border border-blue-500 px-2 py-2 text-sm font-medium text-left"
//                     key={header.id}>
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                         header.column.columnDef.header,
//                         header.getContext()
//                       )}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody>
//             {table.getRowModel().rows.map(row => (
//               <tr key={row.id}>
//                 {row.getVisibleCells().map(cell => (
//                   <td
//                     className="border border-blue-500 px-2 py-2 text-sm"
//                     key={cell.id}>
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

import React, { useMemo, useState } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table';
import DynamicInvoiceTable from '../component/DynamicInvoiceTable';

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

export const defaultDataGeneralStore: Array<GeneralBillingColumnType> = [
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

const columnHelper = createColumnHelper<GeneralBillingColumnType>()

export function BillingPage() {
  const [tableData, setTableData] = useState(defaultDataGeneralStore)
  
  const handleCellChange = (rowIndex: number, columnId: keyof GeneralBillingColumnType, value: any) => {
    setTableData(prev => {
      const newData = [...prev]
      newData[rowIndex] = {
        ...newData[rowIndex],
        [columnId]: value
      }
      return newData
    })
  }

  const handleRemoveRow = (rowIndex: number) => {
    setTableData(prev => prev.filter((_, index) => index !== rowIndex))
  }
  
  const columns = useMemo<ColumnDef<GeneralBillingColumnType, any>[]>(() => [
    columnHelper.accessor("sr", {
      id: "sr",
      header: "Sr No",
      cell: ({ row, getValue }) => (
        <h1>{getValue()}</h1>
      ),
    }),
    columnHelper.accessor("item", {
      id: "item",
      header: "Item",
      cell: ({ row, getValue }) => (
        <input
          type="text"
          value={getValue()}
          onChange={(e) => handleCellChange(row.index, "item", e.target.value)}
          className="w-full px-2 py-1 border rounded"
        />
      )
    }),
    columnHelper.accessor("hsncode", {
      id: "hsncode",
      header: "HSN Code",
      cell: ({ row, getValue }) => (
        <input
          type="text"
          value={getValue()}
          onChange={(e) => handleCellChange(row.index, "hsncode", e.target.value)}
          className="w-full px-2 py-1 border rounded"
        />
      ),
    }),
    columnHelper.accessor("qty", {
      id: "qty",
      header: "Qty",
      cell: ({ row, getValue }) => (
        <input
          type="number"
          value={getValue()}
          onChange={(e) => handleCellChange(row.index, "qty", parseFloat(e.target.value) || 0)}
          className="w-full px-2 py-1 border rounded"
        />
      ),
    }),
    columnHelper.accessor("unit", {
      id: "unit",
      header: "Unit",
      cell: ({ row, getValue }) => (
        <input
          type="text"
          value={getValue()}
          onChange={(e) => handleCellChange(row.index, "unit", e.target.value)}
          className="w-full px-2 py-1 border rounded"
        />
      ),
    }),
    columnHelper.accessor("mrp", {
      id: "mrp",
      header: "MRP",
      cell: ({ row, getValue }) => (
        <input
          type="number"
          step="0.01"
          value={getValue()}
          onChange={(e) => handleCellChange(row.index, "mrp", parseFloat(e.target.value) || 0)}
          className="w-full px-2 py-1 border rounded"
        />
      ),
    }),
    columnHelper.accessor("rate", {
      id: "rate",
      header: "Rate",
      cell: ({ row, getValue }) => (
        <input
          type="number"
          step="0.01"
          value={getValue()}
          onChange={(e) => handleCellChange(row.index, "rate", parseFloat(e.target.value) || 0)}
          className="w-full px-2 py-1 border rounded"
        />
      ),
    }),
    columnHelper.accessor("discount", {
      id: "discount",
      header: "Discount",
      cell: ({ row, getValue }) => (
        <input
          type="number"
          step="0.01"
          value={getValue()}
          onChange={(e) => handleCellChange(row.index, "discount", parseFloat(e.target.value) || 0)}
          className="w-full px-2 py-1 border rounded"
        />
      ),
    }),
    columnHelper.accessor("discountper", {
      id: "discountper",
      header: "Discount %",
      cell: ({ row, getValue }) => (
        <input
          type="number"
          step="0.01"
          value={getValue()}
          onChange={(e) => handleCellChange(row.index, "discountper", parseFloat(e.target.value) || 0)}
          className="w-full px-2 py-1 border rounded"
        />
      ),
    }),
    columnHelper.accessor("taxableamount", {
      id: "taxableamount",
      header: "Taxable Amount",
      cell: ({ row, getValue }) => (
        <input
          type="number"
          step="0.01"
          value={getValue()}
          onChange={(e) => handleCellChange(row.index, "taxableamount", parseFloat(e.target.value) || 0)}
          className="w-full px-2 py-1 border rounded"
        />
      ),
    }),
    columnHelper.accessor("gstper", {
      id: "gstper",
      header: "GST %",
      cell: ({ row, getValue }) => (
        <input
          type="number"
          step="0.01"
          value={getValue()}
          onChange={(e) => handleCellChange(row.index, "gstper", parseFloat(e.target.value) || 0)}
          className="w-full px-2 py-1 border rounded"
        />
      ),
    }),
    columnHelper.accessor("gstamount", {
      id: "gstamount",
      header: "GST Amount",
      cell: ({ row, getValue }) => (
        <input
          type="number"
          step="0.01"
          value={getValue()}
          onChange={(e) => handleCellChange(row.index, "gstamount", parseFloat(e.target.value) || 0)}
          className="w-full px-2 py-1 border rounded"
        />
      ),
    }),
    columnHelper.accessor("amount", {
      id: "amount",
      header: "Amount",
      cell: ({ row, getValue }) => (
        <input
          type="number"
          step="0.01"
          value={getValue()}
          onChange={(e) => handleCellChange(row.index, "amount", parseFloat(e.target.value) || 0)}
          className="w-full px-2 py-1 border rounded"
        />
      ),
    }),
    columnHelper.display({
      id: "removeItem",
      header: "Remove Item",
      cell: ({ row }) => (
        <button 
          onClick={() => handleRemoveRow(row.index)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Remove
        </button>
      ),
    })
  ], [])

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const handleAddRow = () => {
    const newRow: GeneralBillingColumnType = {
      sr: String(tableData.length + 1),
      item: "",
      hsncode: "",
      qty: 0,
      unit: "",
      mrp: 0,
      rate: 0,
      discount: 0,
      discountper: 0,
      taxableamount: 0,
      gstper: 0,
      gstamount: 0,
      amount: 0,
    }
    setTableData(prev => [...prev, newRow])
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="border-2 border-red-500 overflow-x-auto">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr className="bg-gray-100" key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    className="border border-blue-500 px-2 py-2 text-sm font-medium text-left"
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
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td
                    className="border border-blue-500 px-2 py-2 text-sm"
                    key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={handleAddRow}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Row
      </button>
      <DynamicInvoiceTable/>
    </div>
  )
}