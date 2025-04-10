'use client'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const ToastProvider = () => {
  return (
    <div>
      <ToastContainer
        autoClose={2000}
      />
    </div>
  )
}

export default ToastProvider
