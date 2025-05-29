import { useState } from 'react';
import { Phone, Mail, MapPin, Share2 } from 'lucide-react';

const defaultBusiness = {
  name: "ABC Pharmacy",
  tagline: "Your Health, Our Priority",
  logo: "/api/placeholder/80/80",
  address: "123 Main Street, City, State 12345",
  mobiles: [
    { number: "+1 (555) 123-4567", whatsappEnabled: true }
  ],
  telephone: "+1 (555) 987-6543",
  email: "contact@abcpharmacy.com",
  licenses: [
    { type: "GST", number: "GST123456789" },
    { type: "Drug License", number: "DL-123-456-789" }
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

  const handleLicenseChange = (index, field, value) => {
    const updatedLicenses = [...formData.licenses];
    updatedLicenses[index] = { ...updatedLicenses[index], [field]: value };
    setFormData(prev => ({ ...prev, licenses: updatedLicenses }));
  };

  const handleMobileChange = (index, field, value) => {
    const updatedMobiles = [...formData.mobiles];
    updatedMobiles[index] = { ...updatedMobiles[index], [field]: value };
    setFormData(prev => ({ ...prev, mobiles: updatedMobiles }));
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

  const validateForm = () => {
    const errors = [];

    if (!formData.name.trim()) errors.push("Business name is required.");
    if (!formData.logo.trim()) errors.push("Logo URL is required.");
    if (!formData.address.trim()) errors.push("Address is required.");
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errors.push("Valid email is required.");

    formData.mobiles.forEach((mob, i) => {
      if (!mob.number.trim()) errors.push(`Mobile number ${i + 1} is required.`);
    });

    formData.licenses.forEach((lic, i) => {
      if (!lic.type.trim() || !lic.number.trim()) errors.push(`License ${i + 1} must have both type and number.`);
    });

    return errors;
  };

  const saveChanges = () => {
    const errors = validateForm();
    if (errors.length > 0) {
      alert("Please fix the following errors:\n" + errors.join("\n"));
      return;
    }
    setBusiness(formData);
    setIsEditing(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {!isEditing ? (
        <div className="border border-gray-300 rounded-lg p-6 mb-6 bg-white shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <img 
                src={business.logo} 
                alt={`${business.name} Logo`} 
                className="w-16 h-16 rounded-lg mr-4 object-contain border border-gray-200" 
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{business.name}</h1>
                <p className="text-gray-600 italic">{business.tagline}</p>
              </div>
            </div>
            <button 
              onClick={() => {
                setFormData(business);
                setIsEditing(true);
              }}
              className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition-colors"
            >
              Edit
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-gray-500 mr-2 mt-1 flex-shrink-0" />
                <p className="text-gray-600">{business.address}</p>
              </div>

              {business.mobiles.map((mob, index) => (
                <div key={index} className="flex items-center">
                  <Phone className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" />
                  <p className="text-gray-600">
                    Mobile: {mob.number}
                    {mob.whatsappEnabled && (
                      <span className="inline-flex items-center ml-2 text-green-600">
                        <Share2 className="w-4 h-4 mr-1" />
                        WhatsApp Enabled
                      </span>
                    )}
                  </p>
                </div>
              ))}

              {business.telephone && (
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" />
                  <p className="text-gray-600">Tel: {business.telephone}</p>
                </div>
              )}

              {business.email && (
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" />
                  <p className="text-gray-600">{business.email}</p>
                </div>
              )}
            </div>

            <div>
              <h3 className="font-medium text-gray-700 mb-2">Licenses & Registrations</h3>
              <div className="space-y-1">
                {business.licenses.map((license, index) => (
                  <div key={index} className="text-sm text-gray-600">
                    <span className="font-medium">{license.type}: </span>
                    {license.number}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="border border-gray-300 rounded-lg p-6 mb-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit Business Information</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Business Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />

              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                placeholder="Tagline"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />

              <input
                type="text"
                name="logo"
                value={formData.logo}
                onChange={handleChange}
                placeholder="Logo URL"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Mobile Numbers</label>
                {formData.mobiles.map((mob, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={mob.number}
                      placeholder="Mobile Number"
                      onChange={(e) => handleMobileChange(index, 'number', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md flex-1"
                    />
                    <label className="flex items-center space-x-1">
                      <input
                        type="checkbox"
                        checked={mob.whatsappEnabled}
                        onChange={(e) => handleMobileChange(index, 'whatsappEnabled', e.target.checked)}
                      />
                      <span className="text-sm">WhatsApp</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => removeMobile(index)}
                      className="text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addMobile}
                  className="mt-2 text-sm bg-gray-200 px-2 py-1 rounded"
                >
                  Add Mobile
                </button>
              </div>

              <input
                type="text"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                placeholder="Telephone"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-medium text-gray-700 mb-2">Licenses & Registrations</h3>
            {formData.licenses.map((license, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  placeholder="License Type"
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
