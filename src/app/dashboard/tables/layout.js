"use client"

import React from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import "@/app/styles/Database.css"
import "@/app/styles/TableLayout.css"
import { mulish } from '@/app/fonts'
import VerticalNav from "@/app/components/Navlink/VerticalNav"
export default function DatabaseLayout({ children }) {

    const session = useSession({
        required: true,
        onUnauthenticated() {
            redirect(`/login?callbackUrl=/dashboard`)
        }
    })
    
    React.useEffect(() => {
        const handleClick = (e) => {
            const database_nav = document.querySelector(".database_nav")
            const btn = document.querySelector(".toggler")
            if (!btn.checked) {
                if (e.target.className === 'toggler') {
                    btn.checked = false
                }
                else{
                    btn.checked=false
                }
            }
            else{
                if(e.target.className==="toggler"){
                    btn.checked = true
                }
                else if(database_nav.contains(e.target)){
                    btn.checked = true
                    if(e.target.tagName==="LI")
                    {
                        btn.checked = false
                    }
                }
                else{
                    btn.checked = false
                }

            }
        }
        document.addEventListener("click", handleClick, false)
        //cleanup
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])
    
    const connected_tables = ["Inspections", "Routes"] //tables to be connected     
    const tables = connected_tables.map(table => {
        return (
            <VerticalNav href={`/dashboard/tables/${table.toLowerCase()}`} label={<li key={table}>{table}</li>} key={table} />
        )
    })


    return (
        <div className={`database ${mulish.className}`}>
            <input type="checkbox" className="toggler" />
            <div className="hamburger"><div></div></div>
            <nav className="database_nav">
                <h2 className={mulish.className}>Sample Training</h2>
                <ul>
                    {tables}
                </ul>
            </nav>
            <div className='table-layout-nav'>
                <div className="menu-div">
                    <h2>Table Name</h2>
                </div>
                {children}
            </div>
        </div>
    )
}
