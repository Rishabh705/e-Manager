import React from 'react'
import "@/app/styles/TableLayout.css"
import NavLink from '@/app/components/Navlink/Navlink'
export default function InspectionLayout({children}) {
  return (
    <div className='table-layout-nav'>
        <nav className='table-nav'>
          <ul>
            <li>
              <NavLink href="/dashboard/inspections" label="Registered Records"/>
            </li>
             <li>
              <NavLink href="/dashboard/inspections/add-records" label="Add Record"/>
            </li>
          </ul>
        </nav>
        {children}
    </div>
  )
}
