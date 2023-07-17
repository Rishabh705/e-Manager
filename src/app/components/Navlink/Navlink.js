'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
export default function NavLink ({ href, label }){
  const pathname = usePathname()
  const isActive = pathname === href

  const active = {
    fontWeight: 600,
    borderBottom: '4px solid whitesmoke'
  };
  const inactive = {
    fontWeight: 600,
  };

  return (
    <Link href={href} style={isActive?active:inactive}>
      {label}
    </Link>
  )
}
