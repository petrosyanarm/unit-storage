import { ColumnDef } from '@tanstack/react-table';
import { Unit } from '@/src/table/Types';
import Image from 'next/image';
import { Button } from '@/src/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog"

import EditUnitForm from '@/src/components/home/EditUnitForm';

export const columns=(handleDelete:(unitId:number)=>void): ColumnDef<Unit>[] => [
  {
    accessorKey: 'name',
    header: 'Unit Name',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'facility',
    header: 'Facility',
    accessorFn: (row) => row.facility.name,
  },
  {
    accessorKey: 'Features',
    header: 'Features',
    cell: ({ getValue }) => (
      <span className="block max-w-[220px] truncate">
        {getValue()}
      </span>
    ),
    accessorFn: (row) =>
      row.filters?.[0]?.selectedOptions
        ?.map(option => option.name)
        .join(",") ?? "-"
  },
  {
    accessorKey: 'pricingGroup',
    header: 'Pricing Group',
    accessorFn: (row) => row.pricingGroup.name,
  },
  {
    accessorKey: 'unitDimensions',
    header: 'Dimensions',
    accessorFn: (row) =>
      `${row.unitDimensions.x}x${row.unitDimensions.y}x${row.unitDimensions.z}`,
  },
  {
    accessorKey: 'rentable',
    header: 'Rentable',
    cell: ({ getValue }) => (
      <div className='w-14 h-8 bg-[rgba(19,109,162,1)] rounded-2xl flex justify-end items-center pr-1 cursor-pointer'>
        <div className='size-6 bg-white rounded-full'></div>
      </div>
    ),
  },
  {
    accessorKey: 'doorWidth',
    header: 'Door Width (ft)',
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return value.toFixed(2);
    },
  },
  {
    accessorKey: 'doorHeight',
    header: 'Door Height',
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return value.toFixed(2);
    },
  },
  {
    id: 'actions',
    header: '',
    cell: ({ getValue, row }) => (
      <div>
        <Drawer direction="right" handleOnly>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={'destructive'}>
                <Image src={'/assets/images/dots.svg'} width={24} height={24} alt={"Dots"} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='border h-22 p-0 top-0 overflow-hidden'>
              <DropdownMenuGroup>
                <DrawerTrigger asChild>
                  <DropdownMenuItem className='top-0' variant="destructive">
                    Edit
                  </DropdownMenuItem>
                </DrawerTrigger>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    {/* <DropdownMenuItem className='top-0' variant="destructive"> */}
                    <Button className= "hover:bg-blue-200 cursor-pointer data-[variant=destructive] text-primary dark:data-[variant=destructive]:focus:bg-blue-200 data-[variant=destructive]:focus:text-primary data-[variant=destructive]:*:[svg]:!text-primary [&_svg:not([class*='text-'])]:text-primary relative flex items-center gap-2 rounded-sm px-0 py-1.5 text-sm outline-hidden w-full" variant="destructive">
                      Delete
                    </Button>
                    {/* </DropdownMenuItem> */}
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        <div className="w-[462px] flex border-b pb-4 justify-between">
                          <DrawerTitle>Delete Unit</DrawerTitle>
                          <AlertDialogCancel className="cursor-pointer border-none hover:none"><Image src={'/assets/images/close.svg'} width={24} height={24} alt={"Logo"} /></AlertDialogCancel>
                        </div>
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this unit?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className='px-4 py-2 rounded-2xl'>Cancel</AlertDialogCancel>
                      <AlertDialogAction className='px-4 py-2 rounded-lg bg-[rgba(237,79,157,1)]' onClick={()=>handleDelete(row.original.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DrawerContent className="my-6 mr-6 px-6 pt-6 rounded-2xl">
            <DrawerHeader className="">
              <div className="flex border-b pb-4 justify-between">
                <DrawerTitle>Edit Unit</DrawerTitle>
                <DrawerClose className="cursor-pointer"><Image src={'/assets/images/close.svg'} width={24} height={24} alt={"Logo"} /></DrawerClose>
              </div>
            </DrawerHeader>
            <EditUnitForm unitId={row.original.id} />
            <DrawerFooter>
              <DrawerClose asChild>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    ),
  },
];

