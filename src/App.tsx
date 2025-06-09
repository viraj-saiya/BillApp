import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import BillingHeader from './feature/component/BillHeader'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BillingHeader />
    </>
  )
}

export default App
