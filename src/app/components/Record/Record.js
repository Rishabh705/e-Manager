import React from 'react'
import "@/app/styles/records.css"
export default function Record(props) {
    return (
        <div className='record-tile-div'>
            <h3>{props.col1}</h3>
            <h3>{props.col2}</h3>
            <h3>{props.col3}</h3>
        </div>
    )
}
