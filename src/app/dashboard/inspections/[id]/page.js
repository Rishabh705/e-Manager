'use client'

{/* Record details */ }

import React from 'react'
import { getRecord } from "@/app/utils/api"
import { useRouter } from 'next/navigation'
import success from "@/app/img/success.png"
import fail from "@/app/img/fail.png"
import Image from "next/image"
import "@/app/styles/recorddetails.css"


export default function RecordDetails({ params }) {

  const router = useRouter()
  const [formdata, setFormData] = React.useState({
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

  React.useEffect(() => {
    async function loadRecord() {
      try {
        const data = await getRecord(`${process.env.NEXT_PUBLIC_URL}/api/inspections`,params.id)
        setFormData(prev => ({
          ...prev,
          id: data.id,
          certificate_number: data.certificate_number,
          business_name: data.business_name,
          date: data.date,
          result: data.result,
          sector: data.sector,
          address: {
            ...prev.address,
            city: data.address.city,
            zip: data.address.zip,
            street: data.address.street,
            number: data.address.number
          }
        }))
      } catch (err) {
        console.log(err)
      }
    }
    loadRecord()
  }, [])

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
    router.push("/dashboard/inspections")
  }
  async function handleDelete() {
    try {
      const confirmed = confirm("Are you sure?")
      if (confirmed) {
        const res = await fetch(`/api/inspections?id=${params.id}`, { method: 'DELETE' })
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
      const response = await fetch(`/api/inspections/${params.id}`, {
        method: 'PUT',
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

        <div className='id_no'>
          Enter id:
          <input type="text" name="id" id="username"
            placeholder="ID"
            value={formdata.id}
            disabled
            required
          />
        </div>

        <div className='business'>
          <h3>Company details</h3>
          <div className='bus_name'>
            Business name:
            <input type="text" name="business_name"
              placeholder="Business name"
              value={formdata.business_name}
              disabled
              required
              autoComplete="off"
            />
          </div>
          <div className='bus_legal'>
            <div>
              Certificate number:
              <input type="number" name="certificate_number"
                placeholder="Certificate number"
                value={formdata.certificate_number}
                disabled
                required
                autoComplete="off"
              />
            </div>

            <div>
              Sector:
              <input type="text" name="sector"
                placeholder="Sector"
                value={formdata.sector}
                disabled
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
                placeholder="City"
                value={formdata.address.city}
                disabled
                required
                autoComplete="off"
              />
            </div>

            <div>
              Zip:
              <input type="number" name="zip"
                placeholder="Zip"
                value={formdata.address.zip}
                disabled
                required
                autoComplete="off"
              />
            </div>

            <div>
              Street:
              <input type="text" name="street"
                placeholder="Street"
                value={formdata.address.street}
                disabled
                required
                autoComplete="off"
              />
            </div>

            <div>
              Number:
              <input type="number" name="number"
                placeholder="Number"
                value={formdata.address.number}
                disabled
                required
                autoComplete="off"
              />
            </div>
          </div>
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
