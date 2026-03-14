import { Button } from "@/src/components/ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, } from "@/src/components/ui/drawer"
import CreateUnitForm from "@/src/components/home/CreateUnitForm"
import CreateDimensionForm from "@/src/components/home/CreateDimensionForm"
import { useDrawerStore } from "@/src/store/useDrawerStore"
import { twMerge } from "tailwind-merge"
import Close from '@/public/assets/images/close.svg'

export default function DrawerScrollableContent() {
  const { openDimension } = useDrawerStore()
  return (
    <Drawer direction="right" handleOnly>
      <DrawerTrigger asChild>
        <Button className="cursor-pointer">Create</Button>
      </DrawerTrigger>
      <DrawerContent className={twMerge("my-6 mr-6 px-6 pt-6 rounded-2xl flex gap-2", openDimension  ? "data-[vaul-drawer-direction=right]:sm:max-w-253.25 grid grid-cols-2" : "data-[vaul-drawer-direction=right]:sm:max-w-131.25")}>
        <div className="flex flex-col">
        <DrawerHeader className="max-w-131.25 w-full">
          <div className="flex border-b pb-4 justify-between max-w-131.25">
            <DrawerTitle>Create Unit</DrawerTitle>
            <DrawerClose className="cursor-pointer"><Close className="size-6"/></DrawerClose>
          </div>
        </DrawerHeader>
          <div className="">
            <CreateUnitForm />
          </div>
        </div>
        <div className="">
          {openDimension && <CreateDimensionForm />}
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}