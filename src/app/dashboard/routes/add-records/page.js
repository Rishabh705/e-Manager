'use client'

import React, { useState } from 'react'
import "@/app/styles/addroute.css"
import success from "@/app/img/success.png"
import fail from "@/app/img/fail.png"
import Image from "next/image"

export default function AddRecord() {
  const [formdata, setFormData] = useState({
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

  const [status, setStatus] = useState(null);

  function handleChange(evt) {
    if (evt.target.name === "id" || evt.target.name === "name" || evt.target.name === "alias" || evt.target.name === "iata") {
      setFormData(prev => {
        return {
          ...prev,
          airline: {
            ...prev.airline,
            [evt.target.name]: evt.target.value
          }
        }
      })
    }
    setFormData(prev => {
      return {
        ...prev,
        [evt.target.name]: evt.target.value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/routes', {
        method: 'POST',
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
      if (response.status === 200) {
        setFormData({
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
        setStatus('success');
      } else {
        setStatus('error');
      }

    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='add_form_container'>
      <form className='form' onSubmit={handleSubmit}>
        <div className='extra-input'>
          Airplane:
          <input type="text" name="airplane" id="username"
            placeholder="Airplane number"
            value={formdata.airplane}
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
                autoComplete="off"
              />
            </div>

            <div>
              Name:
              <input type="text" name="name"
                placeholder="Enter Name"
                value={formdata.airline.name}
                onChange={handleChange}
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
          {status === 'success' && <Image src={success} alt="success_img" width={50} height={50} />}
          {status === 'error' && <Image src={fail} alt="failed_img" width={50} height={50} />}
        </div>
      </form>
    </div>
  );
};


