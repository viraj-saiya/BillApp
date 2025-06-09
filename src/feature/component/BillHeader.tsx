import { useState } from 'react';
import { Phone, Mail, MapPin, Share2 } from 'lucide-react';

// Default business information
const defaultBusiness = {
  name: "M.G. Medical General Stores",
  tagline: "",
  logo: "/api/placeholder/80/80",
  address: "4, Shahina Co-op Hsg.Soc.,\nPali Mata Road,\nBandra West,\nMumbai 400050",
  mobiles: [
    { number: "9819577451", whatsappEnabled: true },
    { number: "9892343277", whatsappEnabled: false }
  ],
  telephone: "022-26518685 / 022-26401506",
  email: "",
  licenses: [
    { type: "GSTIN No", number: "27AAMPS3747E1ZD" },
    { type: "Drugs License No", number: "Zone-4 20-311107 / 21-311108" }
  ]
};

export default function BillingHeader() {
  const [business, setBusiness] = useState(defaultBusiness);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(defaultBusiness);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMobileChange = (index, field, value) => {
    const updatedMobiles = [...formData.mobiles];
    updatedMobiles[index] = { ...updatedMobiles[index], [field]: value };
    setFormData(prev => ({ ...prev, mobiles: updatedMobiles }));
  };

  const addMobile = () => {
    setFormData(prev => ({
      ...prev,
      mobiles: [...prev.mobiles, { number: "", whatsappEnabled: false }]
    }));
  };

  const removeMobile = (index) => {
    const updatedMobiles = [...formData.mobiles];
    updatedMobiles.splice(index, 1);
    setFormData(prev => ({ ...prev, mobiles: updatedMobiles }));
  };

  const handleLicenseChange = (index, field, value) => {
    const updatedLicenses = [...formData.licenses];
    updatedLicenses[index] = { ...updatedLicenses[index], [field]: value };
    setFormData(prev => ({ ...prev, licenses: updatedLicenses }));
  };

  const addLicense = () => {
    setFormData(prev => ({
      ...prev,
      licenses: [...prev.licenses, { type: "", number: "" }]
    }));
  };

  const removeLicense = (index) => {
    const updatedLicenses = [...formData.licenses];
    updatedLicenses.splice(index, 1);
    setFormData(prev => ({ ...prev, licenses: updatedLicenses }));
  };

  const saveChanges = () => {
    setBusiness(formData);
    setIsEditing(false);
  };

  const currentDate = new Date().toLocaleDateString('en-GB');
  const invoiceNumber = "100";

  return (
    <div className="w-full max-w-4xl mx-auto">
      {!isEditing ? (
        // Display Header - Invoice Style
        <div className="border-2 border-black p-4 mb-6 bg-white relative">
          {/* Edit Button */}
          <button 
            onClick={() => setIsEditing(true)}
            className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition-colors z-10"
          >
            Edit
          </button>

          {/* Header with Business Name and INVOICE */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h1 className="text-lg font-bold text-black leading-tight">{business.name}</h1>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold text-gray-400 tracking-widest">INVOICE</h2>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex justify-between">
            {/* Left Side - Business Details */}
            <div className="flex-1 text-sm text-black leading-relaxed">
              {/* Address */}
              <div className="mb-3">
                {business.address.split('\n').map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>

              {/* Phone Numbers */}
              <div className="mb-1">
                <span className="font-medium">Phone: </span>
                <span>
                  {business.mobiles.map((mobile, index) => (
                    <span key={index}>
                      {mobile.number}
                      {mobile.whatsappEnabled && " (WhatsApp)"}
                      {index < business.mobiles.length - 1 ? " / " : ""}
                    </span>
                  ))}
                </span>
              </div>

              {/* Telephone */}
              {business.telephone && (
                <div className="mb-3">
                  <span className="font-medium">Tel-Phone: </span>
                  <span>{business.telephone}</span>
                </div>
              )}

              {/* Licenses */}
              <div className="space-y-1">
                {business.licenses.map((license, index) => (
                  <div key={index}>
                    <span className="font-medium">{license.type}: </span>
                    <span>{license.number}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Invoice Details */}
            <div className="text-right text-sm text-black">
              <div className="mb-2">
                <div className="font-medium">INVOICE #[{invoiceNumber}]</div>
                <div>DATE: [{currentDate}]</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Edit Form
        <div className="border border-gray-300 rounded-lg p-6 mb-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit Business Information</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address (use line breaks for multiple lines)</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Line 1&#10;Line 2&#10;Line 3&#10;City, Pincode"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telephone</label>
                <input
                  type="text"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="022-26518685 / 022-26401506"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Numbers</label>
                {formData.mobiles.map((mobile, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      placeholder="Mobile Number"
                      value={mobile.number}
                      onChange={(e) => handleMobileChange(index, 'number', e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded-md flex-1"
                    />
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`whatsapp-${index}`}
                        checked={mobile.whatsappEnabled}
                        onChange={(e) => handleMobileChange(index, 'whatsappEnabled', e.target.checked)}
                        className="mr-1"
                      />
                      <label htmlFor={`whatsapp-${index}`} className="text-xs text-gray-600">WhatsApp</label>
                    </div>
                    <button 
                      onClick={() => removeMobile(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button 
                  onClick={addMobile}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm mt-2"
                >
                  Add Mobile
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-medium text-gray-700 mb-2">Licenses & Registrations</h3>
            {formData.licenses.map((license, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  placeholder="License Type (e.g., GSTIN No)"
                  value={license.type}
                  onChange={(e) => handleLicenseChange(index, 'type', e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md w-1/3"
                />
                <input
                  type="text"
                  placeholder="License Number"
                  value={license.number}
                  onChange={(e) => handleLicenseChange(index, 'number', e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md flex-1"
                />
                <button 
                  onClick={() => removeLicense(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
            <button 
              onClick={addLicense}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm mt-2"
            >
              Add License
            </button>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button 
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={saveChanges}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}