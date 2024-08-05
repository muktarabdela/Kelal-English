'use client'
import { usePathname } from 'next/navigation';
import React from 'react'
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';

const SidebarItems = ({ label, iconSrc, href }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Button
      variant={isActive ? "sidebarOutline" : "sidebar"}
      className="h-[52px] justify-start"
      asChild
    >

      <Link href={href}>
        <Image
          src={iconSrc}
          alt={label}
          className="mr-5"
          height={32}
          width={32}
        />
        {label}
      </Link>
    </Button>
  )
}

export default SidebarItems