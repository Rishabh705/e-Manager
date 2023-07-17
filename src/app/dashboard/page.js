import React from 'react'
import "@/app/styles/dashboard.css"
import { mulish } from '@/app/fonts'

export default function DatabasePage() {
  return (
    <div className={`dashboard ${mulish.className}`}>
      <h2>Welcome to your Dashboard</h2>
      <h3>Select a table and get started</h3>
    </div>
  )
}
