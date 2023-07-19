'use client'

import React, { useState } from 'react'
import "@/app/styles/addrecord.css"
import success from "@/app/img/success.png"
import fail from "@/app/img/fail.png"
import Image from "next/image"

export default function AddRecord() {
  const [formdata, setFormData] = useState({
    id: "",
    certificate_number: "",
    business_name: "",
    date: "",
    result: "",
    sector: "",
    address: {
      city: "",
      zip: "",
      street: "",
      number: ""
    }
  })

  const [status, setStatus] = useState(null);

  function handleChange(evt) {
    if (evt.target.name === "city" || evt.target.name === "zip" || evt.target.name === "street" || evt.target.name === "number") {
      setFormData(prev => {
        return {
          ...prev,
          address: {
            ...prev.address,
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
      const response = await fetch('/api/inspections', {
        method: 'POST',
        headers: { "Content_Type": "application/json" },
        body: JSON.stringify({
          id: formdata.id,
          certificate_number: formdata.certificate_number,
          business_name: formdata.business_name,
          date: formdata.date,
          result: formdata.result,
          sector: formdata.sector,
          address: formdata.address
        })
      })
      // Set the status based on the response from the API route
      if (response.status === 200) {
        setFormData({
          id: "",
          certificate_number: "",
          business_name: "",
          date: "",
          result: "",
          sector: "",
          address: {
            city: "",
            zip: "",
            street: "",
            number: ""
          }
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
          
          <div className='id_no'>
            Enter id:
            <input type="text" name="id" id="username"
              placeholder="Enter ID"
              value={formdata.id}
              onChange={handleChange}
              required
            />
          </div>

        <div className='business'>
          <h3>Company details</h3>
          <div className='bus_name'>
            Business name:
            <input type="text" name="business_name"
              placeholder="Enter business name"
              value={formdata.business_name}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
          <div className='bus_legal'>
            <div>
              Certificate number:
              <input type="number" name="certificate_number"
                placeholder="Enter certificate number"
                value={formdata.certificate_number}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>

            <div>
              Sector:
              <input type="text" name="sector"
                placeholder="Enter sector"
                value={formdata.sector}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
          </div>
        </div>

        <div className='inspection'>
          <h3>Inspection details</h3>
          <div className='ins_info'>
            <div>
              Inspection Date:
              <input type="text" name="date" rows={1}
                placeholder="Enter date of inspection"
                value={formdata.date}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>

            <div>
              Result:
              <input type="text" name="result"
                placeholder="Enter inspection result"
                value={formdata.result}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className='address'>
          <h3>Address details</h3>
          <div className="addr_info">
            <div>
              City:
              <input type="text" name="city"
                placeholder="Enter city"

                value={formdata.address.city}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>

            <div>
              Zip:
              <input type="number" name="zip"
                placeholder="Enter zip code"

                value={formdata.address.zip}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>

            <div>
              Street:
              <input type="text" name="street"
                placeholder="Enter street"
                value={formdata.address.street}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>

            <div>
              Number:
              <input type="number" name="number"
                placeholder="Enter number"
                value={formdata.address.number}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
          </div>
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


