import React from 'react'
import './Contact.css';
import Link from 'next/link'
import Image from 'next/image'
import git from '../../img/icons8-github-64.png';
import LIn from '../../img/icons8-linkedin-2-96.png';
import { quicksand } from '@/app/fonts';
export default function Contact() {
    return (
        <div className="footer-contact">
            <h3 className={`${quicksand.className}`}>Feel free to contact</h3>
            <section className="contact">
                <Link href="https://github.com/Rishabh705"><Image src={git} alt="Github Icon"
                    height="40" width="40" /></Link>
                <Link href="https://www.linkedin.com/in/rishabh-singh-93b68223a/"><Image src={LIn}
                    alt="LinkedIn Icon" height="40" width="40" /></Link>
            </section>
        </div>
    )
}
