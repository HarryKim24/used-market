'use client'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'

const ToastProvider = () => {
  return (
    <ToastContainer autoClose={2000} />
  )
}

export default ToastProvider
