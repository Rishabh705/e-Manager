import React from 'react'
import "@/app/styles/TableLayout.css"
import NavLink from '@/app/components/Navlink/Navlink'
export default function RouteLayout({children}) {
  return (
    <div className='table-layout-nav'>
        <nav className='table-nav'>
          <ul>
            <li>
              <NavLink href="/dashboard/routes" label="Registered Records"/>
            </li>
             <li>
              <NavLink href="/dashboard/routes/add-records" label="Add Record"/>
            </li>
          </ul>
        </nav>
        {children}
    </div>
  )
}
