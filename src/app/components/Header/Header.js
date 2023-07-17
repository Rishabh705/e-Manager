import React from 'react';
import SigninBtn from "./SigninBtn"
import './Header.css';
import Link from 'next/link'
import { zen_dots } from '@/app/fonts';
export default function Header(props) {
    return (
        <div>
            <div className="hdr">
                <Link href="/" className="hdt"><h3 className={zen_dots.className}>e-Manager</h3></Link>
                <SigninBtn />
            </div>
        </div>
    )
}
