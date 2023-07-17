"use client"

import React from 'react'
import Link from 'next/link'
import './register.css'
import { useRouter } from 'next/navigation'
import { inter } from '@/app/fonts'
export default function Register() {
    const [formData, setFormData] = React.useState({
        username: "",
        pass1: "",
        pass2: ""
    })

    const [err, setErr] = React.useState(false)
    const router = useRouter()

    function handleChange(evt) {
        setFormData(prev => {
            return {
                ...prev,
                [evt.target.name]: evt.target.value
            }
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        let name, password;
        if (formData.pass1 === formData.pass2) {
            name = formData.username
            password = formData.pass1
            try {
                const res = await fetch("/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: formData.username,
                        password: password
                    }),
                });
                res.status === 201 && router.push("/login?success=Account has been created")
            } catch (error) {
                setErr(true)
            }
        }
        else
            alert("Passwords Don't Match")

    }


    return (
        <div className="register_container1">
            <div className="register_page">
                <form className="form" onSubmit={handleSubmit}>
                    <h3 className='register_h3'>Register</h3>
                    <hr className='hr_1' />
                    <div className="userdata">
                        <div className="reg_usrnm">
                            <input type="text" onChange={handleChange} id="uname" name="username" value={formData.username} className="reg_unm" placeholder="Username" required={true}/><br />
                        </div>
                        <div className="reg_pswd">
                            <input type="password" onChange={handleChange} id="passwd1" name="pass1" value={formData.pass1} className="reg_pass" placeholder="Password" required={true}/><br />
                        </div>
                        <div className="reg_pswd">
                            <input type="password" onChange={handleChange} id="passwd2" name="pass2" value={formData.pass2} className="reg_pass" placeholder="Retype Password" required={true}/><br />
                        </div>
                        <button className="reg_submit">
                            Register
                        </button>    
                        {err && "Something went wrong !"}
                    </div>
                    <div className={`register_container2 ${inter.className}`}>
                        <ul>
                            <li>
                                <Link href="/login">Already have an account? Login</Link>
                            </li>
                        </ul>
                    </div>

                </form>
            </div>
        </div>
    )
}
