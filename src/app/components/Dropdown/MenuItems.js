import React from 'react'
import "./Menuitems.css"
export default function Menuitems(props) {

  //display queries
  const queries = props.option.map((item) => (
    <option key={item.title} value={item.title}>
      {item.title}
    </option>
  )) || []

  //display choices of the selected queries
  const values = props.option.find(item => item.title === props.query)?.value.map((subitem) => (
    <option key={subitem} value={subitem}>
      {subitem}
    </option>
  )) || []



  return (
    <div className='query-drop'>
      <h5>Query:</h5>
      <div className="select-cont">
        <select value={props.query} onChange={props.onQueryChange} name='query' >
          <option value="">--Choose Query--</option>
          {queries}
        </select>
        <select value={props.value} onChange={props.onQueryChange} name='queryValue' >
          <option value="">--Choose Value--</option>
          {values}
        </select>
      </div>
    </div>
  )
}
