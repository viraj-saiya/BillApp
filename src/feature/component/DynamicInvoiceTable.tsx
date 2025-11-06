import { useState } from 'react';
import { Plus, Minus, Edit2, Trash2, Settings, Save, X, ChevronUp, ChevronDown, ChevronsUpDown, Percent, Calculator, Receipt } from 'lucide-react';

// Unit conversion factors (all converted to base units)
const unitConversions = {
  // Weight units (base: grams)
  'g': 1,
  'kg': 1000,
  'mg': 0.001,
  'lb': 453.592,
  'oz': 28.3495,
  
  // Volume units (base: ml)
  'ml': 1,
  'l': 1000,
  'cl': 10,
  'fl oz': 29.5735,
  'cup': 240,
  'pint': 473.176,
  
  // Length units (base: cm)
  'cm': 1,
  'm': 100,
  'mm': 0.1,
  'in': 2.54,
  'ft': 30.48,
  
  // Area units (base: sq cm)
  'sq cm': 1,
  'sq m': 10000,
  'sq ft': 929.03,
  'sq in': 6.4516,
  
  // Count units (base: pieces)
  'pcs': 1,
  'dozen': 12,
  'pair': 2,
  'set': 1,
  'box': 1,
  'packet': 1
};

const unitCategories = {
  'Weight': ['g', 'kg', 'mg', 'lb', 'oz'],
  'Volume': ['ml', 'l', 'cl', 'fl oz', 'cup', 'pint'],
  'Length': ['cm', 'm', 'mm', 'in', 'ft'],
  'Area': ['sq cm', 'sq m', 'sq ft', 'sq in'],
  'Count': ['pcs', 'dozen', 'pair', 'set', 'box', 'packet']
};

// Default column configurations for different business types
const defaultColumnTemplates = {
  medical: [
    { id: 'sr', name: 'Sr.', type: 'number', width: '60px', editable: false },
    { id: 'description', name: 'Description/Medicine Name', type: 'text', width: '250px', editable: true },
    { id: 'batch', name: 'Batch No.', type: 'text', width: '100px', editable: true },
    { id: 'expiry', name: 'Expiry', type: 'date', width: '100px', editable: true },
    { id: 'qty', name: 'Qty', type: 'number', width: '80px', editable: true },
    { id: 'unit', name: 'Unit', type: 'unit', width: '80px', editable: true },
    { id: 'mrp', name: 'MRP', type: 'currency', width: '100px', editable: true },
    { id: 'rate', name: 'Rate/Unit', type: 'currency', width: '100px', editable: true },
    { id: 'amount', name: 'Amount', type: 'currency', width: '120px', editable: false }
  ],
  general: [
    { id: 'sr', name: 'Sr.', type: 'number', width: '60px', editable: false },
    { id: 'item', name: 'Item/Service', type: 'text', width: '300px', editable: true },
    { id: 'qty', name: 'Quantity', type: 'number', width: '100px', editable: true },
    { id: 'unit', name: 'Unit', type: 'unit', width: '80px', editable: true },
    { id: 'rate', name: 'Rate/Unit', type: 'currency', width: '120px', editable: true },
    { id: 'amount', name: 'Amount', type: 'currency', width: '120px', editable: false }
  ],
  wholesale: [
    { id: 'sr', name: 'Sr.', type: 'number', width: '60px', editable: false },
    { id: 'item', name: 'Item Description', type: 'text', width: '250px', editable: true },
    { id: 'qty', name: 'Qty', type: 'number', width: '80px', editable: true },
    { id: 'unit', name: 'Unit', type: 'unit', width: '80px', editable: true },
    { id: 'weight', name: 'Weight/Unit', type: 'number', width: '100px', editable: true },
    { id: 'weightUnit', name: 'Weight Unit', type: 'unit', width: '100px', editable: true },
    { id: 'rate', name: 'Rate/Unit', type: 'currency', width: '100px', editable: true },
    { id: 'amount', name: 'Amount', type: 'currency', width: '120px', editable: false }
  ]
};

export default function DynamicInvoiceTable() {
  const [columns, setColumns] = useState(defaultColumnTemplates.medical);
  const [rows, setRows] = useState([
    { id: 1, sr: 1, description: '', batch: '', expiry: '', qty: '', unit: 'pcs', mrp: '', rate: '', amount: '0.00' }
  ]);
  const [isEditingColumns, setIsEditingColumns] = useState(false);
  const [editingColumn, setEditingColumn] = useState(null);
  const [newColumn, setNewColumn] = useState({ name: '', type: 'text', width: '120px' });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  
  // Discount state
  const [discount, setDiscount] = useState({
    type: 'percentage', // 'percentage' or 'fixed'
    value: 0,
    enabled: false
  });

  // GST state
  const [gst, setGst] = useState({
    enabled: true,
    rate: 18, // GST percentage
    type: 'exclusive' // 'inclusive' or 'exclusive'
  });

  // Common GST rates in India
  const gstRates = [0, 5, 12, 18, 28];

  // Calculate amount for a row with unit consideration
  const calculateAmount = (row) => {
    const qty = parseFloat(row.qty) || 0;
    const rate = parseFloat(row.rate) || 0;
    
    // For items with weight-based pricing
    if (row.weight && row.weightUnit) {
      const weight = parseFloat(row.weight) || 0;
      const totalWeight = qty * weight;
      return (totalWeight * rate).toFixed(2);
    }
    
    // Standard quantity × rate calculation
    return (qty * rate).toFixed(2);
  };

  // Get display text for quantity with unit
  const getQuantityDisplay = (row) => {
    if (row.qty && row.unit) {
      return `${row.qty} ${row.unit}`;
    }
    return row.qty || '';
  };

  // Get all available units for a category
  const getUnitsForCategory = (category) => {
    return unitCategories[category] || [];
  };

  // Sorting functionality
  const getSortableColumns = () => {
    return ['description', 'item', 'qty', 'rate', 'amount', 'mrp', 'weight'];
  };

  const sortRows = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sortedRows = [...rows].sort((a, b) => {
      const aValue = a[key] || '';
      const bValue = b[key] || '';

      // Handle different data types
      if (key === 'qty' || key === 'rate' || key === 'amount' || key === 'mrp' || key === 'weight') {
        const aNum = parseFloat(aValue) || 0;
        const bNum = parseFloat(bValue) || 0;
        return direction === 'asc' ? aNum - bNum : bNum - aNum;
      } else {
        // Text sorting
        const aText = aValue.toString().toLowerCase();
        const bText = bValue.toString().toLowerCase();
        if (aText < bText) return direction === 'asc' ? -1 : 1;
        if (aText > bText) return direction === 'asc' ? 1 : -1;
        return 0;
      }
    });

    setRows(sortedRows);
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnId) => {
    if (!getSortableColumns().includes(columnId)) return null;
    
    if (sortConfig.key === columnId) {
      return sortConfig.direction === 'asc' ? 
        <ChevronUp className="h-4 w-4 text-blue-600" /> : 
        <ChevronDown className="h-4 w-4 text-blue-600" />;
    }
    return <ChevronsUpDown className="h-4 w-4 text-gray-400" />;
  };

  const isSortable = (columnId) => {
    return getSortableColumns().includes(columnId);
  };

  // Handle row data change with unit calculations
  const handleRowChange = (rowId, columnId, value) => {
    setRows(prev => prev.map(row => {
      if (row.id === rowId) {
        const updatedRow = { ...row, [columnId]: value };
        // Auto-calculate amount if qty, rate, weight, or weightUnit changes
        if (['qty', 'rate', 'weight', 'weightUnit'].includes(columnId)) {
          updatedRow.amount = calculateAmount(updatedRow);
        }
        return updatedRow;
      }
      return row;
    }));
  };

  // Add new row
  const addRow = () => {
    const newRowId = Math.max(...rows.map(r => r.id)) + 1;
    const newRow = { id: newRowId, sr: rows.length + 1 };
    columns.forEach(col => {
      if (col.id === 'sr') {
        newRow[col.id] = rows.length + 1;
      } else if (col.id === 'unit' || col.id === 'weightUnit') {
        newRow[col.id] = 'pcs'; // Default unit
      } else {
        newRow[col.id] = col.type === 'currency' && col.id === 'amount' ? '0.00' : '';
      }
    });
    setRows([...rows, newRow]);
  };

  // Remove row
  const removeRow = (rowId) => {
    if (rows.length > 1) {
      const filteredRows = rows.filter(row => row.id !== rowId);
      // Update serial numbers
      const updatedRows = filteredRows.map((row, index) => ({
        ...row,
        sr: index + 1
      }));
      setRows(updatedRows);
    }
  };

  // Column management functions
  const addColumn = () => {
    if (newColumn.name.trim()) {
      const newCol = {
        id: Date.now().toString(),
        ...newColumn,
        editable: true
      };
      setColumns([...columns, newCol]);
      
      // Add empty values for this column to all existing rows
      setRows(prev => prev.map(row => ({
        ...row,
        [newCol.id]: newCol.type === 'currency' ? '0.00' : ''
      })));
      
      setNewColumn({ name: '', type: 'text', width: '120px' });
    }
  };

  const removeColumn = (columnId) => {
    if (columns.length > 1) {
      setColumns(prev => prev.filter(col => col.id !== columnId));
      setRows(prev => prev.map(row => {
        const { [columnId]: removed, ...rest } = row;
        return rest;
      }));
    }
  };

  const updateColumn = (columnId, updates) => {
    setColumns(prev => prev.map(col => 
      col.id === columnId ? { ...col, ...updates } : col
    ));
    setEditingColumn(null);
  };

  // Load template
  const loadTemplate = (templateName) => {
    setColumns(defaultColumnTemplates[templateName]);
    setSortConfig({ key: null, direction: null }); // Reset sorting when template changes
    // Reset rows with new column structure
    const newRow = { id: 1, sr: 1 };
    defaultColumnTemplates[templateName].forEach(col => {
      if (col.id === 'sr') {
        newRow[col.id] = 1;
      } else if (col.id === 'unit' || col.id === 'weightUnit') {
        newRow[col.id] = 'pcs'; // Default unit
      } else {
        newRow[col.id] = col.type === 'currency' && col.id === 'amount' ? '0.00' : '';
      }
    });
    setRows([newRow]);
  };

  // Calculate totals with discount and flexible GST
  const calculateTotals = () => {
    const rawSubtotal = rows.reduce((sum, row) => sum + (parseFloat(row.amount) || 0), 0);
    
    let subtotal = rawSubtotal;
    let taxableAmount = rawSubtotal;
    let tax = 0;
    
    // Handle GST inclusive pricing
    if (gst.enabled && gst.type === 'inclusive' && gst.rate > 0) {
      // If GST is inclusive, extract the tax amount from the subtotal
      const gstMultiplier = 1 + (gst.rate / 100);
      subtotal = rawSubtotal / gstMultiplier;
      tax = rawSubtotal - subtotal;
      taxableAmount = subtotal;
    }
    
    // Apply discount
    let discountAmount = 0;
    if (discount.enabled && discount.value > 0) {
      if (discount.type === 'percentage') {
        discountAmount = taxableAmount * (discount.value / 100);
      } else {
        discountAmount = Math.min(discount.value, taxableAmount);
      }
    }
    
    const afterDiscount = taxableAmount - discountAmount;
    
    // Calculate GST on discounted amount (for exclusive GST)
    if (gst.enabled && gst.type === 'exclusive' && gst.rate > 0) {
      tax = afterDiscount * (gst.rate / 100);
    } else if (gst.enabled && gst.type === 'inclusive' && gst.rate > 0) {
      // For inclusive GST, recalculate tax on discounted amount
      tax = (afterDiscount * gst.rate) / 100;
    }
    
    const total = afterDiscount + (gst.enabled ? tax : 0);
    
    return {
      rawSubtotal: rawSubtotal.toFixed(2),
      subtotal: taxableAmount.toFixed(2),
      discountAmount: discountAmount.toFixed(2),
      afterDiscount: afterDiscount.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
      gstIncluded: gst.type === 'inclusive' && gst.enabled
    };
  };

  const totals = calculateTotals();

  const renderCell = (row, column) => {
    if (!column.editable) {
      if (column.type === 'currency') {
        return `₹${row[column.id] || '0.00'}`;
      }
      return row[column.id];
    }

    switch (column.type) {
      case 'number':
        return (
          <input
            type="number"
            value={row[column.id] || ''}
            onChange={(e) => handleRowChange(row.id, column.id, e.target.value)}
            className="w-full px-2 py-1 border-none outline-none bg-transparent"
            min="0"
          />
        );
      case 'currency':
        return (
          <input
            type="number"
            value={row[column.id] || ''}
            onChange={(e) => handleRowChange(row.id, column.id, e.target.value)}
            className="w-full px-2 py-1 border-none outline-none bg-transparent"
            min="0"
            step="0.01"
          />
        );
      case 'date':
        return (
          <input
            type="date"
            value={row[column.id] || ''}
            onChange={(e) => handleRowChange(row.id, column.id, e.target.value)}
            className="w-full px-2 py-1 border-none outline-none bg-transparent"
          />
        );
      case 'unit':
        return (
          <select
            value={row[column.id] || 'pcs'}
            onChange={(e) => handleRowChange(row.id, column.id, e.target.value)}
            className="w-full px-1 py-1 border-none outline-none bg-transparent text-xs"
          >
            {Object.entries(unitCategories).map(([category, units]) => (
              <optgroup key={category} label={category}>
                {units.map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </optgroup>
            ))}
          </select>
        );
      default:
        return (
          <input
            type="text"
            value={row[column.id] || ''}
            onChange={(e) => handleRowChange(row.id, column.id, e.target.value)}
            className="w-full px-2 py-1 border-none outline-none bg-transparent"
          />
        );
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
     

      {/* Invoice Table */}
      <div className="border-2 border-black overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              {columns.map((column) => (
                <th
                  key={column.id}
                  className={`border border-black px-2 py-2 text-sm font-medium text-left ${
                    isSortable(column.id) ? 'cursor-pointer hover:bg-gray-200 select-none' : ''
                  }`}
                  style={{ width: column.width, minWidth: column.width }}
                  onClick={() => isSortable(column.id) && sortRows(column.id)}
                >
                  <div className="flex items-center justify-between">
                    <span>{column.name}</span>
                    {isSortable(column.id) && (
                      <span className="ml-1">
                        {getSortIcon(column.id)}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              <th className="border border-black px-2 py-2 text-sm font-medium w-16">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td
                    key={column.id}
                    className="border border-black px-1 py-1 text-sm"
                    style={{ width: column.width, minWidth: column.width }}
                  >
                    {renderCell(row, column)}
                  </td>
                ))}
                <td className="border border-black px-1 py-1 text-center">
                  <button
                    onClick={() => removeRow(row.id)}
                    className="text-red-600 hover:text-red-800"
                    disabled={rows.length === 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Row Button and Sort Info */}
      <div className="mt-2 flex justify-between items-center">
        <button
          onClick={addRow}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Row
        </button>
        
        {sortConfig.key && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>
              Sorted by: <strong>{columns.find(col => col.id === sortConfig.key)?.name}</strong>
              ({sortConfig.direction === 'asc' ? 'Low to High' : 'High to Low'})
            </span>
            <button
              onClick={() => {
                setSortConfig({ key: null, direction: null });
                // Reset to original order by recreating rows with original serial numbers
                const resetRows = rows.map((row, index) => ({
                  ...row,
                  sr: index + 1
                }));
                setRows(resetRows);
              }}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Clear Sort
            </button>
          </div>
        )}
      </div>

      {/* Discount and Totals Section */}
      <div className="mt-6 flex justify-end gap-4">
        {/* Discount Panel */}
        <div className="border-2 border-black w-80">
          <div className="bg-orange-100 px-4 py-2 border-b border-black">
            <h3 className="font-medium flex items-center gap-2">
              <Percent className="h-4 w-4" />
              DISCOUNT
            </h3>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="discount-enabled"
                checked={discount.enabled}
                onChange={(e) => setDiscount(prev => ({ ...prev, enabled: e.target.checked }))}
                className="rounded"
              />
              <label htmlFor="discount-enabled" className="text-sm">Apply Discount</label>
            </div>
            
            {discount.enabled && (
              <>
                <div className="flex gap-2">
                  <select
                    value={discount.type}
                    onChange={(e) => setDiscount(prev => ({ ...prev, type: e.target.value }))}
                    className="px-2 py-1 border rounded text-sm flex-1"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (₹)</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-2">
                  {discount.type === 'percentage' ? (
                    <Percent className="h-4 w-4 text-orange-600" />
                  ) : (
                    <Calculator className="h-4 w-4 text-orange-600" />
                  )}
                  <input
                    type="number"
                    value={discount.value}
                    onChange={(e) => setDiscount(prev => ({ ...prev, value: parseFloat(e.target.value) || 0 }))}
                    className="px-2 py-1 border rounded text-sm flex-1"
                    min="0"
                    max={discount.type === 'percentage' ? '100' : undefined}
                    step={discount.type === 'percentage' ? '0.1' : '0.01'}
                    placeholder={discount.type === 'percentage' ? '0.0' : '0.00'}
                  />
                  <span className="text-sm text-gray-600">
                    {discount.type === 'percentage' ? '%' : '₹'}
                  </span>
                </div>
                
                <div className="text-sm text-orange-600 font-medium">
                  Discount: ₹{totals.discountAmount}
                </div>
              </>
            )}
          </div>
        </div>

        {/* GST Configuration Panel */}
        <div className="border-2 border-black w-80">
          <div className="bg-green-100 px-4 py-2 border-b border-black">
            <h3 className="font-medium flex items-center gap-2">
              <Receipt className="h-4 w-4" />
              GST SETTINGS
            </h3>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="gst-enabled"
                checked={gst.enabled}
                onChange={(e) => setGst(prev => ({ ...prev, enabled: e.target.checked }))}
                className="rounded"
              />
              <label htmlFor="gst-enabled" className="text-sm">Apply GST</label>
            </div>
            
            {gst.enabled && (
              <>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">GST Rate</label>
                  <select
                    value={gst.rate}
                    onChange={(e) => setGst(prev => ({ ...prev, rate: parseFloat(e.target.value) }))}
                    className="w-full px-2 py-1 border rounded text-sm"
                  >
                    {gstRates.map(rate => (
                      <option key={rate} value={rate}>
                        {rate}% {rate === 0 ? '(Exempt)' : ''}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs text-gray-600 mb-1">GST Type</label>
                  <select
                    value={gst.type}
                    onChange={(e) => setGst(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-2 py-1 border rounded text-sm"
                  >
                    <option value="exclusive">Exclusive (Add GST to total)</option>
                    <option value="inclusive">Inclusive (GST included in prices)</option>
                  </select>
                </div>
                
                <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                  {gst.type === 'exclusive' ? (
                    <>GST will be calculated and added to the final amount</>
                  ) : (
                    <>GST is already included in your item prices</>
                  )}
                </div>
                
                <div className="text-sm text-green-600 font-medium">
                  GST ({gst.rate}%): ₹{totals.tax}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Totals Panel */}
        <div className="border-2 border-black w-80">
          <div className="bg-gray-100 px-4 py-2 border-b border-black">
            <h3 className="font-medium">TOTALS</h3>
          </div>
          <div className="p-4 space-y-2">
            {totals.gstIncluded ? (
              <div className="flex justify-between text-sm text-gray-600">
                <span>Total (incl. GST):</span>
                <span>₹{totals.rawSubtotal}</span>
              </div>
            ) : (
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{totals.subtotal}</span>
              </div>
            )}
            
            {totals.gstIncluded && (
              <div className="flex justify-between">
                <span>Taxable Amount:</span>
                <span>₹{totals.subtotal}</span>
              </div>
            )}
            
            {discount.enabled && parseFloat(totals.discountAmount) > 0 && (
              <>
                <div className="flex justify-between text-orange-600">
                  <span>Discount ({discount.type === 'percentage' ? `${discount.value}%` : '₹' + discount.value}):</span>
                  <span>-₹{totals.discountAmount}</span>
                </div>
                <div className="flex justify-between font-medium border-t border-gray-200 pt-1">
                  <span>After Discount:</span>
                  <span>₹{totals.afterDiscount}</span>
                </div>
              </>
            )}
            
            {gst.enabled && gst.rate > 0 && (
              <div className="flex justify-between text-green-600">
                <span>GST ({gst.rate}%) {gst.type === 'inclusive' ? '(extracted)' : ''}:</span>
                <span>{gst.type === 'inclusive' ? '' : '+'}₹{totals.tax}</span>
              </div>
            )}
            
            <div className="flex justify-between font-bold border-t border-gray-300 pt-2 text-lg">
              <span>Final Total:</span>
              <span>₹{totals.total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



