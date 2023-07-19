import React from "react"
import "@/app/styles/Database.css"
import "@/app/styles/TableLayout.css"
import { mulish } from '@/app/fonts'
import NavLink from "@/app/components/Navlink/Navlink"
import VerticalNav from "@/app/components/Navlink/VerticalNav"
export default function DatabaseLayout({ children }) {

    const connected_tables = ["Inspections", "Routes"] //tables to be connected     
    const tables = connected_tables.map(table => {
        return (
            <VerticalNav href={`/dashboard/tables/${table.toLowerCase()}`} label={<li key={table}>{table}</li>} key={table} />
        )
    })

    return (
        <div className={`database ${mulish.className}`}>
            <nav className="database_nav">
                <h2 className={mulish.className}>Sample Training</h2>
                <ul>
                    {tables}
                </ul>
            </nav>
            <div className='table-layout-nav'>
                <div className="hamburger-menu">
                    <input type="checkbox" class="toggler"/>
                    <div class="hamburger"><div></div></div>
                    Table Name
                </div>
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
        </div>
    )
}
