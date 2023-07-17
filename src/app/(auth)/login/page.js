'use client'

import React from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import './login.css'
import GoogleButton from 'react-google-button'
import { inter } from '@/app/fonts'

export default function Login() {

    const callbackUrl = "/"
    const [formData, setFormData] = React.useState({
        username: "",
        pass: ""
    })
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
        await signIn("credentials", { name: formData.username, password: formData.pass, callbackUrl: callbackUrl })
    }

    return (
        <div className="login_container1">
            <div className="login_page">
                <form className="form" onSubmit={handleSubmit}>
                    <h3 className='login_h3'>Login</h3>
                    <hr className='hr_1'/>
                    <div className={`userdata`}>
                        <div className="usrnm">
                            <input type="text" onChange={handleChange} id="uname" name="username" value={formData.username} className="unm" placeholder="Username" required={true} /><br />
                        </div>
                        <div className="pswd">
                            <input type="password" onChange={handleChange} id="passwd" name="pass" value={formData.pass} className="pass" placeholder="**********" required={true} /><br />
                        </div>
                        <button className="submit" >
                            Sign in
                        </button>
                    </div>
                        <hr className="hr_2" />
                        <GoogleButton
                            onClick={() => signIn("google",{callbackUrl:callbackUrl})}
                        />

                    <div className={`login_container2 ${inter.className}`}>
                        <ul>
                            <li>
                                <Link href="/register">No account? Create one.</Link>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
        </div>
    )
}
