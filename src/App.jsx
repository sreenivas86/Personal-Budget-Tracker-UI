import { useState } from 'react'

import AppRoutes from './AppRoutes'
import { ToastContainer } from 'react-toastify'

function App() {
  
  return <>

  <AppRoutes/>

  <ToastContainer position="top-right" autoClose={3000} />
  </>
}

export default App
