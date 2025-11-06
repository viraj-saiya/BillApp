import { useState } from "react"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Plus,
  Minus,
  Settings,
  Percent,
  Calculator,
  Receipt,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
} from "lucide-react"

// ==== Types ====
export type InvoiceRow = Record<string, any>

export type InvoiceColumn = {
  id: string
  name: string
  type: "text" | "number" | "currency" | "date" | "unit"
  width: string
  editable: boolean
}

// ==== Templates (as you had) ====
const defaultColumnTemplates: Record<string, InvoiceColumn[]> = {
  medical: [
    { id: "sr", name: "Sr.", type: "number", width: "60px", editable: false },
    { id: "description", name: "Description/Medicine", type: "text", width: "250px", editable: true },
    { id: "batch", name: "Batch No.", type: "text", width: "100px", editable: true },
    { id: "expiry", name: "Expiry", type: "date", width: "100px", editable: true },
    { id: "qty", name: "Qty", type: "number", width: "80px", editable: true },
    { id: "unit", name: "Unit", type: "unit", width: "80px", editable: true },
    { id: "mrp", name: "MRP", type: "currency", width: "100px", editable: true },
    { id: "rate", name: "Rate/Unit", type: "currency", width: "100px", editable: true },
    { id: "amount", name: "Amount", type: "currency", width: "120px", editable: false },
  ],
  // general / wholesale templates omitted here but can be reused
}

const columnHelper = createColumnHelper<InvoiceRow>()

export default function SampleInvoiceTable() {
  const [columnsConfig, setColumnsConfig] = useState<InvoiceColumn[]>(defaultColumnTemplates.medical)
  const [rows, setRows] = useState<InvoiceRow[]>([
    { id: 1, sr: 1, description: "", batch: "", expiry: "", qty: "", unit: "pcs", mrp: "", rate: "", amount: "0.00" },
  ])
  const [sorting, setSorting] = useState<any>([])

  // ==== Helpers ====
  const handleRowChange = (rowId: number, columnId: string, value: any) => {
    setRows(prev =>
      prev.map(row => {
        if (row.id === rowId) {
          const updated = { ...row, [columnId]: value }
          if (["qty", "rate"].includes(columnId)) {
            const qty = parseFloat(updated.qty) || 0
            const rate = parseFloat(updated.rate) || 0
            updated.amount = (qty * rate).toFixed(2)
          }
          return updated
        }
        return row
      }),
    )
  }

  const addRow = () => {
    const newId = rows.length ? Math.max(...rows.map(r => r.id)) + 1 : 1
    const newRow: InvoiceRow = { id: newId, sr: rows.length + 1 }
    columnsConfig.forEach(col => {
      if (col.id === "sr") {
        newRow[col.id] = rows.length + 1
      } else if (col.id === "unit") {
        newRow[col.id] = "pcs"
      } else {
        newRow[col.id] = col.type === "currency" && col.id === "amount" ? "0.00" : ""
      }
    })
    setRows(prev => [...prev, newRow])
  }

  const removeRow = (id: number) => {
    if (rows.length === 1) return
    const newRows = rows.filter(r => r.id !== id).map((r, i) => ({ ...r, sr: i + 1 }))
    setRows(newRows)
  }

  // ==== Build TanStack Columns from config ====
  const tableColumns = columnsConfig.map(col =>
    columnHelper.accessor(row => row[col.id], {
      id: col.id,
      header: () => (
        <div className="flex items-center gap-1">
          {col.name}
          {sorting.find((s: any) => s.id === col.id) ? (
            sorting.find((s: any) => s.id === col.id).desc ? (
              <ChevronDown className="h-3 w-3 text-blue-600" />
            ) : (
              <ChevronUp className="h-3 w-3 text-blue-600" />
            )
          ) : (
            <ChevronsUpDown className="h-3 w-3 text-gray-400" />
          )}
        </div>
      ),
      cell: info => {
        const row = info.row.original
        if (!col.editable) {
          return col.type === "currency" ? `₹${row[col.id] || "0.00"}` : row[col.id]
        }
        switch (col.type) {
          case "number":
          case "currency":
            return (
              <input
                type="number"
                className="w-full px-1 border-none bg-transparent outline-none"
                value={row[col.id] || ""}
                onChange={e => handleRowChange(row.id, col.id, e.target.value)}
              />
            )
          case "date":
            return (
              <input
                type="date"
                className="w-full px-1 border-none bg-transparent outline-none"
                value={row[col.id] || ""}
                onChange={e => handleRowChange(row.id, col.id, e.target.value)}
              />
            )
          default:
            return (
              <input
                type="text"
                className="w-full px-1 border-none bg-transparent outline-none"
                value={row[col.id] || ""}
                onChange={e => handleRowChange(row.id, col.id, e.target.value)}
              />
            )
        }
      },
    }),
  )

  // Add action column
  tableColumns.push(
    columnHelper.display({
      id: "actions",
      header: "Action",
      cell: info => (
        <button
          onClick={() => removeRow(info.row.original.id)}
          className="text-red-600 hover:text-red-800"
          disabled={rows.length === 1}
        >
          <Minus className="h-4 w-4" />
        </button>
      ),
    }),
  )

  const table = useReactTable({
    data: rows,
    columns: tableColumns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="p-4 border">
      {/* Table */}
      <table className="w-full border">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{ width: columnsConfig.find(c => c.id === header.id)?.width }}
                  className="border px-2 py-1 text-left cursor-pointer"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="border px-1 py-1">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Row */}
      <div className="mt-2">
        <button
          onClick={addRow}
          className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-1"
        >
          <Plus className="h-4 w-4" /> Add Row
        </button>
      </div>
    </div>
  )
}