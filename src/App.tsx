import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import BillingHeader from './feature/component/BillHeader'
import CustomerInfo from './feature/component/CustomerInfo'
import DynamicInvoiceTable from './feature/component/DynamicInvoiceTable'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BillingHeader />
      <CustomerInfo />
      <DynamicInvoiceTable />
    </>
  )
}

export default App
