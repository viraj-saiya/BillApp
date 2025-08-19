import { useForm } from '@tanstack/react-form';
import React, { useState } from 'react'
import type { AnyFieldApi } from '@tanstack/react-form'
import ScreenSizeDisplay from '../../utils/component/ScreenSizeDisplay';
import { PlusIcon, Trash2 } from 'lucide-react';
import { Button } from '../../commoncomponents/buttons/button';

interface UserBusinessInfo {
  name: string;
  tagline: string;
  logo: string;
  bussinessAddress: Array<{
    line1: string;
    line2: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  }>;
  mobileNumber: string;
  telephone: string;
  email: string;
  licenses: Array<{ type: string; number: string, showDeleteButton: boolean }>
}
const defaultBusinessInfo: UserBusinessInfo = {
  name: '', tagline: '', logo: '', bussinessAddress: [{ line1: '', line2: '', city: '', state: '', country: '', pincode: '' }], mobileNumber: '', telephone: '', email: '', licenses: [{
    type: '',
    number: '',
    showDeleteButton: false
  }],
}


function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em>{field.state.meta.errors.join(',')}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  )
}


export default function CreateBusiness() {
  const [formData, setFormData] = useState(defaultBusinessInfo);

const form = useForm({
  defaultValues: defaultBusinessInfo,
  onSubmit: async ({ value}) => {
   
    localStorage.setItem('USER_BUSINESS_INFO_LOCAL_STORAGE_KEY', JSON.stringify(value));
  },
});





  const addMoreLicenseAndRegistrations = (fieldLicense) => {
    fieldLicense.pushValue({ type: "", number: "", showDeleteButton: true });
  };

  const removeLicense = (fieldLicense, index) => {
    const updatedLicenses = [...formData.licenses];
    updatedLicenses.splice(index, 1);
    fieldLicense.removeValue(index);
    setFormData(prev => ({ ...prev, licenses: updatedLicenses }));
  };







  const renderInputsFormFields = (fieldName: keyof UserBusinessInfo, fieldPlaceHolder: string, fieldType?: string) => {
    return (
      <form.Field
        name={`${fieldName}`}
        children={(field) => (
          <>
            <input
              type={fieldType || 'text'}
              value={typeof field.state.value === 'string' || typeof field.state.value === 'number' ? field.state.value : ''}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-base"
              placeholder={fieldPlaceHolder} />
            <FieldInfo field={field} />
          </>
        )}
      />
    )
  }





  const renderBussinessName = () => {
    return (
      <div>
        <label className="block text-sm py-2 font-medium  mb-1">Business Name</label>
        {renderInputsFormFields('name', 'Enter Your Business Name')}

      </div>
    )
  }


  const renderBussinessAddress = () => {
    return (
      <div>
        <label className="block text-sm  py-2 font-medium mb-1">Address</label>

        <form.Field name="bussinessAddress" mode="array">
          {(field) => (
            <div>
              {field.state.value.map((_, index) => {
                return (
                  <div key={index} className="space-y-3 mb-4  ">

                    {/* Address Line 1 */}
                    <form.Field name={`bussinessAddress[${index}].line1`}>
                      {(subField) => (
                        <input
                          type="text"
                          placeholder="Address Line 1"
                          value={subField.state.value}
                          onChange={(e) => subField.handleChange(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
                                   bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                                   transition-all duration-200 text-base"
                        />
                      )}
                    </form.Field>

                    {/* Address Line 2 */}
                    <form.Field name={`bussinessAddress[${index}].line2`}>
                      {(subField) => (
                        <input
                          type="text"
                          placeholder="Address Line 2"
                          value={subField.state.value}
                          onChange={(e) => subField.handleChange(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
                                   bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                                   transition-all duration-200 text-base"
                        />
                      )}
                    </form.Field>

                    {/* Country + State */}
                    <div className="grid grid-cols-2 gap-3">
                      <form.Field name={`bussinessAddress[${index}].country`}>
                        {(subField) => (
                          <input
                            type="text"
                            placeholder="Country"
                            value={subField.state.value}
                            onChange={(e) => subField.handleChange(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
                                     bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                                     transition-all duration-200 text-base"
                          />
                        )}
                      </form.Field>

                      <form.Field name={`bussinessAddress[${index}].state`}>
                        {(subField) => (
                          <input
                            type="text"
                            placeholder="State"
                            value={subField.state.value}
                            onChange={(e) => subField.handleChange(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
                                     bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                                     transition-all duration-200 text-base"
                          />
                        )}
                      </form.Field>
                    </div>

                    {/* City + Pincode */}
                    <div className="grid grid-cols-2 gap-3">
                      <form.Field name={`bussinessAddress[${index}].city`}>
                        {(subField) => (
                          <input
                            type="text"
                            placeholder="City"
                            value={subField.state.value}
                            onChange={(e) => subField.handleChange(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
                                     bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                                     transition-all duration-200 text-base"
                          />
                        )}
                      </form.Field>

                      <form.Field name={`bussinessAddress[${index}].pincode`}>
                        {(subField) => (
                          <input
                            type="text"
                            placeholder="Pincode"
                            value={subField.state.value}
                            onChange={(e) => subField.handleChange(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
                                     bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                                     transition-all duration-200 text-base"
                          />
                        )}
                      </form.Field>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </form.Field>
      </div>
    );
  };



  const renderTelePhoneNumber = () => {
    return (
      <div>
        <label className="block text-sm py-2 font-medium  mb-1">Telephone</label>
        {renderInputsFormFields('telephone', 'Enter Your Tele-Phone Number')}
      </div>
    )
  }



  const renderMobileNumber = () => {
    return (
      <div>
        <label className="block text-sm py-2 font-medium  mb-1">Mobile Numbers</label>
        {renderInputsFormFields('mobileNumber', 'Enter Your Mobile Number')}
      </div>

    )
  }



  const renderLicensesAndRegistrations = () => {
    return (
      <div>
        <label className="block text-sm py-2 font-medium mb-1">
          Licenses & Registrations
        </label>

        {/* Header Row */}
        <div className="flex gap-2 font-medium mb-2">
          <span className="flex-1 text-xs">License Type</span>
          <span className="flex-1 text-xs">License Number</span>
        </div>

        <form.Field name="licenses" mode="array">
          {(field) => (
            <div>
              {field.state.value.map((license, index) => {
                return (
                  <div key={index} className="flex flex-row gap-2 mb-2">
                    {/* License Type */}
                    <div className="flex-1">
                      <form.Field key={index} name={`licenses[${index}].type`}>
                        {(subField) => (
                          <input
                            type="text"
                            placeholder="Eg. (GSTIN Type)"
                            value={subField.state.value}
                            onChange={(e) =>
                              subField.handleChange(e.target.value)
                            }
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
                       bg-white focus:bg-white focus:border-blue-500 
                       focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-base"
                          />
                        )}
                      </form.Field>
                    </div>

                    {/* License Number */}
                    <div className="flex-1">
                      <form.Field name={`licenses[${index}].number`}>
                        {(subField) => (
                          <input
                            type="text"
                            placeholder="Enter Your License Number"
                            value={subField.state.value}
                            onChange={(e) =>
                              subField.handleChange(e.target.value)
                            }
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
                       bg-white focus:bg-white focus:border-blue-500 
                       focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-base"
                          />
                        )}
                      </form.Field>
                    </div>

                    {/* Delete Button */}
                    <form.Field name={`licenses[${index}].showDeleteButton`}>
                      {(subField) =>
                        subField.state.value ? (
                          <div className="w-12 flex items-center justify-center">
                            <Button
                              className="px-3 py-2"
                              size="sm"
                              variant="danger"
                              onClick={() => removeLicense(field, index)}
                            >
                              <Trash2 />
                            </Button>
                          </div>
                        ) : null
                      }
                    </form.Field>
                  </div>
                );
              })}

              {/* Add More Button */}
              <Button
                fullWidth
                onClick={() => addMoreLicenseAndRegistrations(field)}
                variant="outline"
                leftIcon={<PlusIcon />}
              >
                Add More Licenses & Registrations
              </Button>
            </div>
          )}
        </form.Field>
      </div>
    );
  };






  return (

    <div className="bg-brand-light flex items-center justify-center min-h-screen">
      <ScreenSizeDisplay />
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl my-12">
        <h2 className="text-center text-xl font-semibold mb-4 text-gray-800">Complete Your Business Profile</h2>

        <div >
          <div className="space-y-4">
            {renderBussinessName()}
            {renderBussinessAddress()}
            {renderTelePhoneNumber()}
            {renderMobileNumber()}
            {renderLicensesAndRegistrations()}
          </div>
        </div>


        <div className="mt-6 flex items-center justify-center space-x-3">
          <Button size='lg' onClick={form.handleSubmit}>Save</Button>

          <Button size='lg'
            onClick={() => {}}
            variant="outline"
          >
            Cancel
          </Button>


        </div>
      </div>
    </div>

  )

}

