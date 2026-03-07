import { Button } from "@/src/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/src/components/ui/drawer"
import Image from "next/image"
import FilterForm from "./FilterForm"
export default function DrawerScrollableContent() {
    return (
        <Drawer direction="right" handleOnly>
            <DrawerTrigger asChild>
                <Button className="cursor-pointer" variant={'destructive'}>
                    <Image src={'/assets/images/filter.svg'} width={20} height={20} alt={"Logo"} />
                    <span className="text-sm font-medium leading-[160%] text-primary">Filter</span>
                </Button>
            </DrawerTrigger>
            <DrawerContent className="my-6 mr-6 rounded-2xl data-[vaul-drawer-direction=right]:sm:max-w-90">
                <DrawerHeader className="px-4 pt-3 pb-2 bg-blue">
                    <div className="flex justify-between">
                        <DrawerTitle className="text-sm leading-[160%] text-white font-semibold">Unit Filters</DrawerTitle>
                        <DrawerClose className="cursor-pointer"><Image src={'/assets/images/closeFilter.svg'} width={24} height={24} alt={"Logo"} /></DrawerClose>
                    </div>
                    <DrawerDescription></DrawerDescription>
                </DrawerHeader>
                <div className="h-screen flex flex-col justify-between overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent
    [&::-webkit-scrollbar-thumb]:bg--600
    [&::-webkit-scrollbar-thumb]:rounded-full">
                <FilterForm />
                <DrawerFooter className="pb-5 flex justify-end">
                    {/* <div className="flex justify-end">
                    <Button className="border border-blue-300" variant={'destructive'}>Reset</Button>
                    <Button>Apply</Button>
                </div> */}
                </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}