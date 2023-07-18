'use client'

{/* Record details */ }

import React from 'react'
import { getRecord } from "@/app/utils/api"
import { useRouter } from 'next/navigation'
import success from "@/app/img/success.png"
import fail from "@/app/img/fail.png"
import Image from "next/image"
import "@/app/styles/routedetails.css"


export default function RecordDetails({ params }) {

  const router = useRouter()
  const [formdata, setFormData] = React.useState({
    airline: {
      id: "",
      name: "",
      alias: "",
      iata: ""
    },
    src_airport: "",
    dst_airport: "",
    codeshare: "",
    stops: "",
    airplane: "",
  })

  React.useEffect(() => {
    async function loadRecord() {
      try {
        const data = await getRecord(`/api/routes`, params.id)
        setFormData(prev => ({
          ...prev,
          airline: {
            ...prev.airline,
            id: data.airline.id,
            name: data.airline.name,
            alias: data.airline.alias,
            iata: data.airline.iata
          },
          src_airport: data.src_airport,
          dst_airport: data.dst_airport,
          codeshare: data.codeshare,
          stops: data.stops,
          airplane: data.airplane,
        }))
      } catch (err) {
        console.log(err)
      }
    }
    loadRecord()
  }, [params.id])

  const [status, setStatus] = React.useState(null)

  function handleChange(evt) {  //controlled  input
    setFormData(prev => {
      return {
        ...prev,
        [evt.target.name]: evt.target.value
      }
    })
  }

  function change() {
    router.push("/dashboard/routes")
  }
  async function handleDelete() {
    try {
      const confirmed = confirm("Are you sure?")
      if (confirmed) {
        const res = await fetch(`/api/routes?id=${params.id}`, { method: 'DELETE' })
        if (res.ok) {
          setStatus('success')
          setTimeout(change, 1000)
        }
        else {
          setStatus('error')
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`/api/routes/${params.id}`, {
        method: 'PUT',
        headers: { "Content_Type": "application/json" },
        body: JSON.stringify({
          airline: formdata.airline,
          src_airport: formdata.src_airport,
          dst_airport: formdata.dst_airport,
          codeshare: formdata.codeshare,
          stops: formdata.stops,
          airplane: formdata.airplane
        })

      })
      // Set the status based on the response from the API route
      if (response.ok) {
        setStatus('success');
        setTimeout(change, 1000)
      } else {
        setStatus('error');
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='data_form_container'>
      <form className='form' onSubmit={handleSubmit}>

        <div className='extra-input'>
          Airplane:
          <input type="text" name="airplane" id="username"
            placeholder="Airplane number"
            value={formdata.airplane}
            disabled
            onChange={handleChange}
            required
          />
        </div>
        <div className='detail-box'>
          <h3>Airline details</h3>
          <div className="detail-box2">
            <div>
              ID:
              <input type="number" name="id"
                placeholder="Enter ID"
                value={formdata.airline.id}
                onChange={handleChange}
                required
                disabled
                autoComplete="off"
              />
            </div>

            <div>
              Name:
              <input type="text" name="name"
                placeholder="Enter Name"
                value={formdata.airline.name}
                onChange={handleChange}
                disabled
                required
                autoComplete="off"
              />
            </div>

            <div>
              Alias:
              <input type="text" name="alias"
                placeholder="Enter alias"
                value={formdata.airline.alias}
                onChange={handleChange}
                required
                disabled
                autoComplete="off"
              />
            </div>

            <div>
              IATA:
              <input type="text" name="iata"
                placeholder="Enter iata"
                value={formdata.airline.iata}
                onChange={handleChange}
                required
                disabled
                autoComplete="off"
              />
            </div>
          </div>
        </div>


        <div className='detail-box'>
          <div className="detail-box2">
            <h3>Route details</h3>
            <div>
              Source:
              <input type="text" name="src_airport"
                placeholder="Enter source"
                value={formdata.src_airport}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
            <div>
              Destination:
              <input type="text" name="dst_airport"
                placeholder="Enter destination"
                value={formdata.dst_airport}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
            <div>
              Stops:
              <input type="number" name="stops"
                placeholder="Enter stops"
                value={formdata.stops}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
          </div>
        </div>

        <div className='extra-input'>
          Codeshare:
          <input type="text" name="codeshare"
            placeholder="Code shared?"
            value={formdata.codeshare}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>

        <div className='submit_div'>
          <button type="submit" >Submit</button>
          <button onClick={handleDelete} >Delete</button>
          {status === 'success' && <Image src={success} alt="success_img" width={50} height={50} />}
          {status === 'error' && <Image src={fail} alt="failed_img" width={50} height={50} />}
        </div>

      </form>
    </div>
  )
}
