import { Button } from "@/src/components/ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger, } from "@/src/components/ui/drawer"
import FilterForm from "@/src/components/home/FilterForm"
import FilterIcon from '@/public/assets/images/filter.svg'
import useFilterParams from "@/src/utils/hooks/useFilterParams"
import CloseFilter from '@/public/assets/images/closeFilter.svg'
import { cn } from "@/src/lib/utils"
export default function DrawerScrollableContent() {
    const defaultMinPrice = 0;
    const defaultMaxPrice = 120;
    const { minPriceQuery, maxPriceQuery, sizes, filters } = useFilterParams()
    const filterCount = (minPriceQuery && minPriceQuery !== defaultMinPrice ? 1 : 0) +
        (maxPriceQuery && maxPriceQuery !== defaultMaxPrice ? 1 : 0) +
        (sizes?.length || 0) +
        (filters?.length || 0);
    return (
        <Drawer direction="right" handleOnly>
            <DrawerTrigger asChild>
                <Button className={cn(filterCount > 0 ? "cursor-pointer bg-[rgba(238,249,255,1)] py-1.5 px-3" : "cursor-pointer bg-white")} variant={'destructive'}>
                    <FilterIcon className={cn(filterCount > 0 ? "size-6 [&_path]:stroke-blue" : "size-6")} />
                    <span className={cn(filterCount > 0 ? " text-blue font-bold" : "text-primary font-medium", "text-sm leading-[160%]")}>Filter {filterCount > 0 ? `(${filterCount})` : null} </span>
                </Button>
            </DrawerTrigger>
            <DrawerContent className="my-6 mr-6 rounded-2xl data-[vaul-drawer-direction=right]:sm:max-w-90">
                <DrawerHeader className="px-4 pt-3 pb-2 bg-blue">
                    <div className="flex justify-between">
                        <DrawerTitle className="text-sm leading-[160%] text-white font-semibold">Unit Filters</DrawerTitle>
                        <DrawerClose className="cursor-pointer"><CloseFilter className="size-6" /></DrawerClose>
                    </div>
                    <DrawerDescription></DrawerDescription>
                </DrawerHeader>
                <div className=" flex flex-col justify-between overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg--600 [&::-webkit-scrollbar-thumb]:rounded-full">
                    <FilterForm />
                </div>
            </DrawerContent>
        </Drawer>
    )
}