"use client"
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Button } from '@/src/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/src/components/ui/dropdown-menu"
import { useFacilities } from '@/src/utils/hooks/useFacilities';
import ChevronDown from "@/public/assets/images/chevron-down2.svg"
import LoadingForm from '@/src/components/ui/LoadingForm';
import { Unit } from '@/src/table/Types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/src/lib/utils';
export default function NavbarList() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname();
  const activeFilter = Number(searchParams.get('facilityIds')) || null;
  const { data: units, isLoading } = useFacilities();
  const sortedUnits = (units?.data as Unit[])?.sort((a, b) => a.id - b.id);
  // const sortedUnits = useMemo(() => (units?.data as Unit[])?.sort((a, b) => a.id - b.id), [units?.data]);

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
  const MORE_WIDTH = 70;
  const GAP_WIDTH = 32;
  const LETTER_WIDTH = 9.5;
  const [displayedItems, setDisplayedItems] = useState<Unit[]>([]);
  const [hiddedItems, setHiddedItems] = useState<Unit[]>([])

  useEffect(() => {
    const foo = () => {
      if (!containerRef.current || !sortedUnits) return;
      const containerWidth = containerRef.current?.offsetWidth || 0;
      let totalWidth = 80;
      const newDisplayedItems: Unit[] = []
      const newHiddedItems: Unit[] = []
      sortedUnits?.forEach((item, index) => {
        const itemWidth = item.name.length * LETTER_WIDTH + GAP_WIDTH;
        const notNeedsMore = newHiddedItems.length === 0 && index + 1 === sortedUnits?.length
        const condition = notNeedsMore
          ? containerWidth > itemWidth + totalWidth
          : containerWidth - MORE_WIDTH > itemWidth + totalWidth;
        if (condition && newHiddedItems.length === 0) {
          totalWidth += itemWidth
          newDisplayedItems.push(item)
        }
        else {
          newHiddedItems.push(item)
        }
      })
      setDisplayedItems(newDisplayedItems);
      setHiddedItems(newHiddedItems)
    }
    foo()
    window.addEventListener('resize', foo)

    return () => { window.removeEventListener('resize', foo) }
  }, [sortedUnits])

  return (
    <div>
      {isLoading ?
        <div className='p-4'>
          <LoadingForm />
        </div>
        :
        <div ref={containerRef} className='px-8 py-5 flex-1 flex justify-between shadow-[0_0_25px_rgba(0,0,0,0.04)]'>
          <ul className='flex gap-8 pr-2.5'>
            <li onClick={() => handleClick(null)} className={cn(activeFilter === null ? "text-blue font-semibold" : "text-primary font-medium", 'text-base leading-[150%] cursor-pointer')}>All</li>
            {displayedItems.map((item) => {
              const isActive = item.id === null ? !activeFilter : item.id === activeFilter;
              return (
                <li key={item.id} onClick={() => handleClick(item.id)} className={cn(isActive ? "text-blue font-semibold" : "text-primary font-medium", 'text-base leading-[150%] cursor-pointer')}>
                  {item.name}
                </li>
              );
            })}
          </ul>
          <div>
            {hiddedItems.length > 0 &&
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className='font-semibold text-base leading-[150%] px-1 text-primary' variant={'destructive'}>
                    More
                    <ChevronDown className="size-4.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='overflow-y-auto w-35 mt-2 mr-4 flex flex-col justify-center [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full'>
                  {hiddedItems.map((item) => (
                    <DropdownMenuItem className='max-h-13.75 pt-2 pb-3 cursor-pointer' onClick={() => handleClick(item.id)} key={item.id} variant="destructive">
                      {item.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>}
          </div>
        </div>
      }
    </div>
  )
}
