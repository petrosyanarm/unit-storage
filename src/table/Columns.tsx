import { ColumnDef } from '@tanstack/react-table';
import { Unit } from '@/src/table/Types';
import { Button } from '@/src/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu"
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, } from "@/src/components/ui/drawer"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog"
import Dots from "@/public/assets/images/dots.svg"
import Close from "@/public/assets/images/close.svg"

import EditUnitForm from '@/src/components/home/EditUnitForm';

export const columns = (handleDelete: (unitId: number) => void): ColumnDef<Unit>[] => [
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
      <span className="block max-w-55 truncate">
        {getValue() as string}
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
    cell: ({}) => (
      <div className='w-14 h-8 bg-blue rounded-2xl flex justify-end items-center pr-1 cursor-pointer'>
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
    cell: ({ row }) => (
      <div>
        <Drawer direction="right" handleOnly>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={'destructive'}>
                <Dots className="size-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='border h-22 p-0 top-0 overflow-hidden'>
              <DropdownMenuGroup>
                <DrawerTrigger asChild>
                  <DropdownMenuItem className='top-0 h-11' variant="destructive">
                    Edit
                  </DropdownMenuItem>
                </DrawerTrigger>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="hover:bg-blue-200 px-4 cursor-pointer h-11 text-primary relative flex items-center gap-2 pb-1.5 text-sm outline-hidden w-full" variant="destructive">
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        <div className="w-115.5 flex border-b pb-4 justify-between">
                          <DrawerTitle>Delete Unit</DrawerTitle>
                          <AlertDialogCancel className="cursor-pointer border-none hover:none"><Close className="size-6" /></AlertDialogCancel>
                        </div>
                      </AlertDialogTitle>
                      <AlertDialogDescription className='mt-2 text-base text-black'>
                        Are you sure you want to delete this unit?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className='px-5 py-3 rounded-lg font-semibold border'>Cancel</AlertDialogCancel>
                      <AlertDialogAction className='text-white' onClick={() => handleDelete(row.original.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DrawerContent className="my-6 mr-6 px-6 pt-6 rounded-2xl data-[vaul-drawer-direction=right]:sm:max-w-131.25">
            <DrawerHeader className="">
              <div className="flex border-b pb-4 justify-between">
                <DrawerTitle>Edit Unit</DrawerTitle>
                <DrawerClose className="cursor-pointer"><Close className="size-6" /></DrawerClose>
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

