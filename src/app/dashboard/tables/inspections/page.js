'use client'

import React, { useState } from 'react'
import Record from '@/app/components/Record/Record'
import Link from 'next/link'
import Delete from '@/app/components/Delete/Delete'
import Menuitems from '@/app/components/Dropdown/MenuItems'
import { useFetchedData } from '@/app/hooks/useFetch'
import "@/app/styles/records.css"

export default function AllRecords() {

  //will contain search query
  const [filter, setFilter] = useState({
    filter: { search: '', filterValue: 'id' },
    tableQuery: { query: '', queryValue: '' }
  })

  //filtered data from hook afer passing URL and filter function
  const [filterdData,setData] = useFetchedData(`/api/inspections`, filter)
  
  //search controlled input
  const handleFilterChange = (e) => {
    setFilter(prevState => ({
      ...prevState,
      filter: {
        ...prevState.filter,
        [e.target.name]: e.target.value,
      },
      tableQuery: {
        ...prevState.tableQuery,
        [e.target.name]: e.target.value,
      }
    }))
  }

  //displaying records
  const cards = filterdData ? filterdData.map((item) => (
    <div className="record-tile" key={item._id}>
      <Link href={`/dashboard/tables/inspections/${item._id}`}>
        <Record col1={item.id} col2={item.business_name} col3={item.certificate_number} />
      </Link>
      <Delete id={item._id} path="inspections" setData={setData}/>
    </div>
  )) : null

  //options to be displayed when user clicks on dropdown for search
  //title is value to be displayed
  //value is the value to be used in place of title (must match from database and should be on first level)

  const types = [
    {
      title: "ID",
      value: "id"
    },
    {
      title: "Business",
      value: "business_name"
    },
    {
      title: "Certificate",
      value: "certificate_number"
    },
  ]
  const filterType = types.map((item) => (
    <option key={item.title} value={item.value}>
      {item.title}
    </option>
  )) || []

  const option = [
    {
      title: "Result",
      value: ["Pass", "Fail", 'No Violation Issued', 'Out of Business', 'Violation Issued', 'Closed', 'Samples Obtained', 'No Evidence of Activity']
    },
    {
      title: "Sector",
      value: ['Auto Rental - 213',
        'Commercial Lessor (Bingo/Games Of Chance) - 091',
        'Dealer in Products for the Disabled - 119',
        'Debt Collection Agency - 122',
        'Games Of Chance - 088',
        'Gaming Cafe - 129',
        'Gasoline Truck-Retail - 822',
        'Health Spa - 839',
        'Home Improvement Salesperson - 101',
        'Laser Pointer Sales - 834',
        'Mailorder Misc - 319',
        'Megastore - 821',
        'Mini-Storage Company - 830',
        'Pool Or Billiard Room - 046',
        'Secondhand Dealer - Firearm - 006A',
        'Temporary Street Fair Vendor Permit - 111',
        'Wholesale Food Market - 718']
    },
  ]

  return (
    <div className="query-main-container">
      <div className="query-container1">
        <Menuitems
          query={filter.tableQuery.query}
          value={filter.tableQuery.queryValue}
          onQueryChange={handleFilterChange}
          option={option}
        />
        <div className="table_input_div">
          <input
            type="text"
            placeholder="Search"
            name="search"
            onChange={handleFilterChange}
            value={filter.filter.search}
          />
          <div className="select-container">
            <select value={filter.filter.filterValue} name="filterValue" onChange={handleFilterChange}>
              {filterType}
            </select>
          </div>
        </div>
      </div>
      <div className="query-container2">
        <div className="query-container4">
          <section>
            <h3>ID</h3>
            <h3>Business name</h3>
            <h3>Certificate</h3>
          </section>
        </div>
        <div className="query-container3">{cards}</div>
      </div>
    </div>
  )
}