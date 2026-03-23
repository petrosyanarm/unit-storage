"use client"
import { NAVBAR_LINKS } from '@/src/utils/constants/Layout'
import Image from 'next/image'
import Link from 'next/link'
import Location from '@/public/assets/images/location.svg'
import NavbarUser from '@/public/assets/images/navbarUser.png'
import { useState } from 'react'
import { Button } from '@/src/components/ui/button'
import { cn } from '@/src/lib/utils'
export default function SidebarMenu() {
    const [openDropdown, setOpendropdown] = useState<number | null>(null);
    const [activeOption, setActiveOption] = useState<number | null>(null)
    return (
        <div className='flex flex-col h-[calc(100vh-90px)] justify-between'>
            <ul className='px-3.5 pt-10 flex flex-col gap-3 border-r border-slate-100'>
                {NAVBAR_LINKS.map((item) => (
                    <li key={item.id} className='px-3 py-3 '>
                        <div onClick={() => setOpendropdown(openDropdown === item.id ? null : item.id)} className='flex items-center justify-between cursor-pointer'>
                            <div className='flex gap-4'>
                                <item.icon className="size-5" />
                                <Link href={'/'} className='text-primary text-base font-medium leading-[150%]' >
                                    {item.title}
                                </Link>
                            </div>
                            {item.id !== 1 &&
                                <div>
                                    <Button variant={'destructive'} className='mt-1.5'>
                                        <item.select className={cn('transition-transform duration-300 size-5.5', openDropdown === item.id ? 'rotate-90' : '')} />
                                    </Button>
                                </div>
                            }
                        </div>
                        {item.children && openDropdown === item.id && (
                            <ul className='pl-5 ml-2 border-l-4 border-l-[rgba(241,245,249,1)] '>
                                {item.children.map((item, idx) => (
                                    <li key={idx} onClick={() => setActiveOption(idx)} className={cn(activeOption === idx ? "bg-[rgba(241,245,249,1)] " : 'bg-white', "pl-4 py-3 mt-3 text-base font-medium leading-[150%] text-[rgba(71,85,105,1)] rounded-xl cursor-pointer")}>{item.title}</li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
            <div className='px-6 flex flex-col gap-4'>
                <div className='bg-[rgba(255,255,255,1)] border border-[rgba(226,232,240,1)] rounded-xl pl-3 pr-4 py-2'>
                    <div className='flex gap-4 items-center'>
                        <Location className='size-6' />
                        <div className='max-w-36.5 w-full rounded-lg bg-[rgba(248,250,252,1)] px-2 py-2'>
                            <span className='text-[11px] leading-[160%] font-medium text-primary'>15 facilities</span>
                        </div>
                    </div>
                </div>
                <div className='bg-[rgba(255,255,255,1)] border border-[rgba(226,232,240,1)] rounded-xl px-3 py-3.5'>
                    <Image src={NavbarUser} width={40} height={40} alt={'user'} className='rounded-full' />
                </div>
            </div>
        </div>
    )
}