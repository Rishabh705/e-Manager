import React from "react"
import Link from "next/link"
import "@/app/styles/Error.css"
export default function Error() {

    return (
        <div id="error-occurred">
            <div className="error-occurred">
                <div className="error">
                    <h1>ERROR</h1>
                </div>
                <h2>We are sorry, Page not found!</h2>
                <Link href="/">Back To Homepage</Link>
            </div>
        </div>
    )
}