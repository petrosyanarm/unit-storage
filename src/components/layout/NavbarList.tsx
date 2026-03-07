"use client"
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { useUnits } from '@/src/utils/hooks/useUnits'
import { Button } from '@/src/components/ui/button';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"
import Loader from '../ui/Loader';
import { useFacilities } from '@/src/utils/hooks/useFacilities';
export default function NavbarList() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname();
  const activeFilter = Number(searchParams.get('facilityIds')) || null;
  const { data, isLoading } = useFacilities();
  const units=data
  const sortedUnits = units?.data.sort((a, b) => a.id - b.id);
  console.log({ units })
  const handleClick = (id: number | null) => {
    const params = new URLSearchParams(searchParams.toString());
    console.log(activeFilter)

    if (id === null) {
      params.delete('facilityIds');
    } else {
      params.set('facilityIds', String(id));
    }

    params.set('page', '1')
    router.push(`${pathname}?${params.toString()}`);
  }
  console.log({ isLoading });

  return (
    <div>
      {isLoading ? <Loader/> :
      <div className='w-full px-8 py-5 flex justify-between'>
         <ul className='flex gap-8'>
          <li onClick={() => handleClick(null)} className={twMerge(activeFilter === null ? "text-blue font-bold" : " text-primary font-medium", 'text-base leading-[150%] cursor-pointer border-none')}>All</li>
          {sortedUnits?.slice(0,14).map((item) => {
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
              <Button className='font-semibold text-base leading-[150%] text-primary' variant={'destructive'}>
                More
                <Image src='/assets/images/chevron-down2.svg' width={18} height={18} alt='Down'/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='h-57 w-35 mt-2 mr-4 flex flex-col justify-center'>
              {sortedUnits?.slice(14,20).map((item)=>(
                <DropdownMenuItem className='h-13.75 pt-2 pb-3 cursor-pointer' onClick={() => handleClick(item.id)} key={item.id} variant="destructive">
                    {item.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div> }
    </div>
  )
}
