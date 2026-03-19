"use client"
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { Button } from '@/src/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/src/components/ui/dropdown-menu"
import { useFacilities } from '@/src/utils/hooks/useFacilities';
import ChevronDown from "@/public/assets/images/chevron-down2.svg"
import LoadingForm from '@/src/components/ui/LoadingForm';
import { Unit } from '@/src/table/Types';
import { useEffect, useRef, useState } from 'react';
export default function NavbarList() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname();
  const activeFilter = Number(searchParams.get('facilityIds')) || null;
  const { data: units, isLoading } = useFacilities();
  const sortedUnits = (units?.data as Unit[])?.sort((a, b) => a.id - b.id);
  console.log({ sortedUnits })
  const handleClick = (id: number | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (id === null) {
      params.delete('facilityIds');
    } else {
      params.set('facilityIds', String(id));
    }

    params.set('page', '1')
    router.push(`${pathname}?${params.toString()}`);
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLButtonElement>(null)
  const ulRef = useRef<HTMLUListElement>(null)
  const [visibleCount, setVisibleCount] = useState(0);
  useEffect(() => {
    const calculate = () => {
      if (!containerRef.current || !ulRef.current || !moreRef.current || !sortedUnits) return;
      const containerWidth = containerRef.current?.offsetWidth;
      console.log({ containerWidth })
      const items = ulRef.current.children
      let totalWidth = 0;
      let count = 0;
      const moreWidth = (moreRef.current?.offsetWidth || 0) + 30
      const avaliableWidth = containerWidth - moreWidth;
      console.log({ avaliableWidth })
      const style = window.getComputedStyle(ulRef.current);
      const gap = parseInt(style.gap || '0');
      for (const item of items) {
        // console.log({items})
        totalWidth += (item as HTMLElement).offsetWidth + gap + 10;
        console.log({ totalWidth })
        if (avaliableWidth > totalWidth) {
          count++;
          // console.log({totalWidth,avaliableWidth})
        }
      }
      setVisibleCount(count);
    }
    // calculate();
    const observer = new ResizeObserver(calculate);
    if (containerRef.current) observer.observe(containerRef.current)
    if (ulRef.current) observer.observe(ulRef.current);
    return () => {
      observer.disconnect()
    }
  }, [sortedUnits])
  console.log(sortedUnits?.slice(visibleCount))
  console.log({ visibleCount })
  return (
    <div>
      {isLoading ?
        <div className='p-4'>
          <LoadingForm />
        </div>
        :
        <div ref={containerRef} className='px-8 py-5 flex-1 flex justify-between shadow-[0_0_25px_rgba(0,0,0,0.04)]'>
          <ul ref={ulRef} className='flex gap-3 md:gap-8 pr-2.5'>
            <li onClick={() => handleClick(null)} className={twMerge(activeFilter === null ? "text-blue font-bold" : " text-primary font-medium", 'text-base leading-[150%] cursor-pointer border-none')}>All</li>
            {sortedUnits?.slice(0, visibleCount).map((item) => {
              const isActive = item.id === null
                ? !activeFilter : item.id === activeFilter;
              return (
                <li onClick={() => handleClick(item.id)} key={item.id} className={twMerge(isActive ? "text-blue font-bold" : " text-primary font-medium", 'text-base leading-[150%] cursor-pointer border-none')}>{item.name}</li>
              )
            })}
          </ul>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button ref={moreRef} className='font-semibold text-base leading-[150%] px-1 text-primary' variant={'destructive'}>
                  More
                  <ChevronDown className="size-4.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='overflow-y-auto w-35 mt-2 mr-4 flex flex-col justify-center'>
                {sortedUnits?.slice(visibleCount).map((item) => (
                  <DropdownMenuItem className='max-h-13.75 pt-2 pb-3 cursor-pointer' onClick={() => handleClick(item.id)} key={item.id} variant="destructive">
                    {item.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>}
    </div>
  )
}
