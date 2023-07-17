'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
export default function VerticalNav ({ href, label }){
  const pathname = usePathname()
  const isActive = pathname === href

  const active = {
    fontWeight:600,
    backgroundColor:"#c1c1c1"
  };
  const inactive = {

  };

  return (
    <Link href={href} style={isActive?active:inactive}>
      {label}
    </Link>
  )
}
