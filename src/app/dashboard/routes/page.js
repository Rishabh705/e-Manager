'use client'

import React from 'react'
import Record from '@/app/components/Record/Record';
import Link from 'next/link';
import Delete from '@/app/components/Delete/Delete';
import Menuitems from '@/app/components/Dropdown/MenuItems'
import { useFetchedData } from '@/app/hooks/useFetch'
import "@/app/styles/records.css"

export default function AllRoutes() {

    //will contain search query
    const [filter, setFilter] = React.useState({
        filter: { search: '', filterValue: 'airline' },
        tableQuery: { query: '', queryValue: '' }
    })

    //filtered data from hook afer passing URL and filter function
    const [filteredData,setData] = useFetchedData(`${process.env.NEXT_PUBLIC_URL}/api/routes`, filter)

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
    const cards = filteredData ? filteredData.map((item) => (
        <div className='record-tile' key={item._id}>
            <Link href={`/dashboard/routes/${item._id}`}>
                <Record
                    col1={item.airline.name}
                    col2={item.src_airport}
                    col3={item.dst_airport}
                />
            </Link>
            <Delete id={item._id} path="routes" setData={setData}/>
        </div>
    )) : null

    //options to be displayed when user clicks on dropdown for search
    //title is value to be displayed
    //value is the value to be used in place of title (must match from database and should be on first level)

    const types = [
        {
            title: "Airline",
            value: "airline.name"
        },
        {
            title: "Source",
            value: "src_airport"
        },
        {
            title: "Destination",
            value: "dst_airport"
        },
    ]
    const filterType = types.map((item) => (
        <option key={item.title} value={item.value}>
            {item.title}
        </option>
    )) || []

    const option = [
        {
            title: "Stops",
            value: [0, 4, 8]
        },
        {
            title: "Airplane",
            value: [
                '320 319', '320 332',
                '321 320', '32S',
                '332 321 738', '332 333', '332 M90',
                '333 343', '737 ER4', '737 M80', '738 321',
                '738 74E', '73M', '73W 73G',
                '74E 738', 'AR1 319',
                'AT5', 'ER4 737', 'M80 737'
            ]
        },
        {
            title: "Codeshare",
            value: ['Y', 'N']
        },
    ]

    return (
        <div className='query-main-container' >
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
            <div className='query-container2'>
                <div className="query-container4">
                    <section>
                        <h3>Airline</h3>
                        <h3>Source</h3>
                        <h3>Destination</h3>
                    </section>
                </div>
                <div className="query-container3">
                    {cards}
                </div>
            </div>
        </div>
    )
}


