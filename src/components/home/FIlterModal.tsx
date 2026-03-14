import { Button } from "@/src/components/ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger, } from "@/src/components/ui/drawer"
import FilterForm from "@/src/components/home/FilterForm"
import FilterIcon from '@/public/assets/images/filter.svg'
import useFilterParams from "@/src/utils/hooks/useFilterParams"
import CloseFilter from '@/public/assets/images/closeFilter.svg'
export default function DrawerScrollableContent() {
    const defaultMinPrice = 0;
    const defaultMaxPrice = 120;
    const { minPriceQuery, maxPriceQuery, sizes, filters } = useFilterParams()
    const filterCount = (minPriceQuery && minPriceQuery !== defaultMinPrice ? 1 : 0) +
        (maxPriceQuery && maxPriceQuery !== defaultMaxPrice ? 1 : 0) +
        (sizes?.length || 0) +
        (filters?.length || 0);
    console.log({ filterCount });
    return (
        <Drawer direction="right" handleOnly>
            <DrawerTrigger asChild>
                {filterCount > 0 ?
                    <Button className="cursor-pointer bg-[rgba(238,249,255,1)] py-1.5 px-3" variant={'destructive'}>
                        <FilterIcon className="size-6 text-blue-500 mt-1" />
                        <span className="text-sm font-bold leading-[160%] text-blue">Filter ({filterCount}) </span>
                    </Button>
                    :
                    <Button className="cursor-pointer" variant={'destructive'}>
                        <FilterIcon className="size-6 mt-1" />
                        <span className="text-sm font-medium leading-[160%] text-primary">Filter</span>
                    </Button>}
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