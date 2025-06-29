import { useState } from 'react'

import BillingHeader from './feature/component/BillHeader'
import CustomerInfo from './feature/component/CustomerInfo'
import DynamicInvoiceTable from './feature/component/DynamicInvoiceTable'

function App() {


  return (
    <>
      <BillingHeader />
      <CustomerInfo />
      <DynamicInvoiceTable />
    </>
  )
}

export default App
