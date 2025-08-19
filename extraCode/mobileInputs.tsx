   const addMobile = (field) => {
    field.pushValue({ number: "", whatsappEnabled: false })
    setFormData(prev => ({
      ...prev,
      mobiles: [...prev.mobiles, { number: "", whatsappEnabled: false }]
    }));
  };
 
 const renderMobileInputsFormFields = () => {

    const renderMobileAddButton = (field) => {
      return (
        <div className="text-center py-2">

          <button
            onClick={() => addMobile(field)}
            className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-md font-medium transition-all duration-200 hover:-translate-y-1 hover:shadow-xl flex items-center justify-center space-x-3"
          >

            <Plus className="w-5 h-5" />
            <span>Add Your Mobile Number</span>
          </button>
        </div>

      )
    }
    return (
      <form.Field name="mobiles" mode="array">
        {(field) => {
          console.log('field', field.state)
          return (
            <div className=" bg-amber-500 ">
              
              {field.state.value.map((mobile, index) => {
                
                console.log('mobile', mobile)
                return(
                <div key={index} className="flex  items-center space-x-2 mb-2 py-2">
                  <input
                    type="text"
                    placeholder="Mobile Number"
                    value={mobile.number}
                    onChange={(e) => handleMobileChange(index, 'number', e.target.value)}
                    className="w-full c border-2 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-base"
                  />
                  <div className="flex items-center">

                    <div className="relative">
                      <input
                        type="checkbox"
                        id={`whatsapp-${index}`}
                        checked={mobile.whatsappEnabled}
                        onChange={(e) => handleMobileChange(index, 'whatsappEnabled', e.target.checked)}

                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center ${mobile.whatsappEnabled
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 border-blue-500'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                        }`}>
                        {mobile.whatsappEnabled && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>

                    <label htmlFor={`whatsapp-${index}`} className="text-xs text-gray-600">WhatsApp</label>
                  </div>
                  <button
                    onClick={() => removeMobile(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md text-sm"
                  >
                    Remove
                  </button>
                </div>
              )})}
              <div className='block'>



                {renderMobileAddButton(field)}
              </div>


            </div>
          )
        }}
      </form.Field>
    )
  }

  