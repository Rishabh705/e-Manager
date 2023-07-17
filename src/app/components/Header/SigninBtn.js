'use client'
import React from 'react'
import img from "../../img/img_411076.png"
import Image from 'next/image'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { mulish } from '@/app/fonts'
export default function SigninBtn() {
    const session = useSession()
    return (
        <>
            {
                session && session.data ? (
                    <div className='user-profile'>
                        <div className='profile-btn'>
                            <button>
                                {session?.data?.user?.image ? (
                                    <div className='profile_icon'>
                                        <Image
                                            src={session.data.user.image}
                                            alt={session.data.user.name}
                                            width={50} height={50}
                                        />
                                    </div>
                                ) : (
                                    <Image src={img} alt="Profile-icon" width="52" height="52" />
                                )}
                            </button>
                        </div>

                        <nav className='navlist'>
                            <div className='navlist_user_info'>
                                {session?.data?.user?.image ? (
                                    <div className='profile_icon'>
                                        <Image
                                            src={session.data.user.image}
                                            alt={session.data.user.name}
                                            width="52" height="52"
                                        />
                                    </div>
                                ) : (
                                    <span>
                                        <Image src={img} alt="Profile-icon" width="52" height="52" />
                                    </span>
                                )}
                                <div className={`user_info ${mulish.className}`}>
                                    <p>{session.data.user.name || 'User name'}</p>
                                    <p>{session.data.user.email}</p>
                                </div>
                            </div>

                            <div className="navlist-links">
                                <button onClick={() => signOut()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 -960 960 960" width="25"><path d="M201.54-120q-23.529 0-40.61-17.082-17.082-17.081-17.082-40.61v-584.614q0-23.529 17.082-40.611 17.081-17.082 40.61-17.082h276.384v45.384H201.54q-4.616 0-8.462 3.846-3.847 3.847-3.847 8.463v584.614q0 4.616 3.847 8.462 3.846 3.846 8.462 3.846h276.384V-120H201.54Zm462.921-197.693-32.999-32.23 97.384-97.384H375.769v-45.384h351.847l-97.385-97.384 32.615-32.615 153.306 153.498-151.691 151.499Z" /></svg>
                                    <p className={mulish.className}>Logout</p>
                                </button>
                            </div>
                        </nav>
                    </div>
                )
                    : (
                        <button className="loginbtn" id="btn2">
                            <Link href="/login">Sign in</Link>
                        </button>
                    )

            }
        </>
    )
}
