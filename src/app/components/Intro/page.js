import React from 'react'
import "./Intro.css"
import img from "../../img/hero.jpg"
import Link from "next/link"
import Image from "next/image"
import { quicksand, allerta } from '@/app/fonts'

export default function Intro() {
    return (
        <main>
            <div className="intro_container1">
                <div className="intro_container2">
                    <h1 className='intro_h1'>
                        Welcome to your <span className={`nowrap name ${allerta.className}`}>Personal Manager</span>
                    </h1>
                </div>
                <div className="hero">
                    <figure className='hero_img'>
                        <Image src={img} alt="hero_img" width="100px" height="100px" />
                    </figure>
                </div>
            </div>

            <div className={`intro_container3 ${quicksand.className}`}>
                <p>With the help of this management tool you can perform various operations on tables easily. Operations include -</p>
                <ul className="intro_operlist">
                    <li className="intro_l">Adding a new Record.</li>
                    <li className="intro_l">Updating a Record.</li>
                    <li className="intro_l">Deleting a record.</li>
                    <li className="intro_l">Displaying records as per query.</li>
                </ul>
                <p> This tool allows you to manage your records in an efficient way. Sign in and get started.</p>
                <button className='get_started'>
                    <Link href="/dashboard/">Get Started</Link>
                </button> {/* will take to all databases page after completeion */}
            </div>
        </main>
    )
}
