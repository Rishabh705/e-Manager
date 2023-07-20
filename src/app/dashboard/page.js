import React from 'react'
import "@/app/styles/dashboard.css"
import { mulish } from '@/app/fonts'
import Link from 'next/link'

export default function DatabasePage() {
  return (
    <div className={`dashboard ${mulish.className}`}>
      <h2>Sample Training</h2>
      <section>
        <div className='table-boxes'>
          <Link href="/dashboard/tables/inspections" className="cards">
            <h4>Inspections</h4>
          </Link>
          <Link href="/dashboard/tables/routes" className="cards">
            <h4>Routes</h4>
          </Link>
        </div>
      </section>
    </div>
  )
}
