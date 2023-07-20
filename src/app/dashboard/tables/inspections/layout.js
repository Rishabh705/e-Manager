import React from 'react'
import NavLink from "@/app/components/Navlink/Navlink"
import "@/app/styles/TableLayout.css"
export default function InspectionLayout({children}) {
    return (
        <div>
            <nav className='table-nav'>
                <ul>
                    <li>
                        <NavLink href="/dashboard/tables/inspections" label="Registered Records" />
                    </li>
                    <li>
                        <NavLink href="/dashboard/tables/inspections/add-records" label="Add Record" />
                    </li>
                </ul>
            </nav>
            {children}
        </div>
    )
}
