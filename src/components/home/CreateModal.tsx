import { Button } from "@/src/components/ui/button"
import Image from "next/image"
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
import CreateUnitForm from "./CreateUnitForm"
export default function DrawerScrollableContent() {
  return (
    <Drawer direction="right" handleOnly>
      <DrawerTrigger asChild>
        <Button className="cursor-pointer">Create</Button>
      </DrawerTrigger>
      <DrawerContent className="my-6 mr-6 px-6 pt-6 rounded-2xl">
        <DrawerHeader className="">
          <div className="flex border-b pb-4 justify-between">
            <DrawerTitle>Create Unit</DrawerTitle>
            <DrawerClose className="cursor-pointer"><Image src={'/assets/images/close.svg'} width={24} height={24} alt={"Logo"} /></DrawerClose>
          </div>
        </DrawerHeader>
        <CreateUnitForm />
        <DrawerFooter>
          <DrawerClose asChild>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}