"use client"

import React from "react"
import "@/app/styles/Database.css"
import { mulish } from '@/app/fonts'
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
export default function DatabaseLayout({ children }) {

    const session = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/login?callbackUrl=/dashboard')
        }
    })

    return (
        <div>
            {children}
        </div>
    )
}
