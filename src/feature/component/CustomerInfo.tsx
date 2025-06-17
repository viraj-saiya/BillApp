import { useState } from 'react';
import { User, Phone, Mail, UserCheck } from 'lucide-react';

// Default customer information
const defaultCustomer = {
  name: "",
  doctorName: "",
  mobile: "",
  email: "",
  address: ""
};

export default function CustomerInfo() {
  const [customer, setCustomer] = useState(defaultCustomer);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(defaultCustomer);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveChanges = () => {
    setCustomer(formData);
    setIsEditing(false);
  };

  const resetForm = () => {
    setFormData(customer);
    setIsEditing(false);
  };

  const clearCustomer = () => {
    const emptyCustomer = { ...defaultCustomer };
    setCustomer(emptyCustomer);
    setFormData(emptyCustomer);
    setIsEditing(true);
  };

  const hasCustomerData = customer.name || customer.doctorName || customer.mobile || customer.email || customer.address;

  return (
    <div className="w-full max-w-4xl mx-auto mb-6">
      {!isEditing ? (
        // Display Customer Info
        <div className="border-2 border-gray-300 p-4 bg-white relative">
          {/* Action Buttons */}
          <div className="absolute top-2 right-2 flex space-x-2 z-10">
            <button 
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition-colors"
            >
              {hasCustomerData ? 'Edit' : 'Add Customer'}
            </button>
            {hasCustomerData && (
              <button 
                onClick={clearCustomer}
                className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          {/* Customer Header */}
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-700 flex items-center">
              <User className="mr-2 h-5 w-5" />
              CUSTOMER INFORMATION
            </h2>
          </div>

          {hasCustomerData ? (
            <div className="grid md:grid-cols-2 gap-4 text-sm text-black">
              {/* Left Column */}
              <div className="space-y-2">
                {customer.name && (
                  <div>
                    <span className="font-medium">Customer Name: </span>
                    <span>{customer.name}</span>
                  </div>
                )}
                
                {customer.doctorName && (
                  <div>
                    <span className="font-medium">Doctor Name: </span>
                    <span>{customer.doctorName}</span>
                  </div>
                )}
                
                {customer.mobile && (
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4" />
                    <span className="font-medium">Mobile: </span>
                    <span>{customer.mobile}</span>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-2">
                {customer.email && (
                  <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4" />
                    <span className="font-medium">Email: </span>
                    <span>{customer.email}</span>
                  </div>
                )}
                
                {customer.address && (
                  <div>
                    <span className="font-medium">Address: </span>
                    <div className="mt-1">
                      {customer.address.split('\n').map((line, index) => (
                        <div key={index}>{line}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <User className="mx-auto h-12 w-12 mb-4 text-gray-300" />
              <p>No customer information added yet</p>
              <p className="text-sm">Click "Add Customer" to get started</p>
            </div>
          )}
        </div>
      ) : (
        // Edit Form
        <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <User className="mr-2 h-6 w-6" />
            {hasCustomerData ? 'Edit Customer Information' : 'Add Customer Information'}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter customer name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor Name
                </label>
                <input
                  type="text"
                  name="doctorName"
                  value={formData.doctorName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter doctor name (if applicable)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter mobile number"
                />
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>
              
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter customer address&#10;Line 1&#10;Line 2&#10;City, Pincode"
                />
              </div> */}
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-6 flex justify-end space-x-3">
            <button 
              onClick={resetForm}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={saveChanges}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              disabled={!formData.name.trim() || !formData.mobile.trim()}
            >
              Save Customer
            </button>
          </div>
          
          {/* Required Fields Note */}
          <p className="text-xs text-gray-500 mt-2">
            * Required fields
          </p>
        </div>
      )}
    </div>
  );
}