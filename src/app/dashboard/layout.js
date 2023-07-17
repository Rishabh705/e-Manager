"use client"

import React from "react"
import "@/app/styles/Database.css"
import { mulish } from '@/app/fonts'
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import VerticalNav from "../components/Navlink/VerticalNav"
export default function DatabaseLayout({ children }) {

    const session = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/login?callbackUrl=/dashboard')
        }
    })

    const connected_tables = ["Inspections","Routes"] //tables to be connected     
    const tables = connected_tables.map(table => {
        return (
            <VerticalNav href={`/dashboard/${table.toLowerCase()}`} label={<li key={table}>{table}</li>} key={table}/>
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
            {children}
        </div>
    )
}
