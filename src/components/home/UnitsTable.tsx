'use client';
import { useReactTable, getCoreRowModel, flexRender, } from '@tanstack/react-table';
import { columns } from '@/src/table/Columns';
import { Unit } from '@/src/table/Types';
import { useDeleteUnit } from '@/src/utils/hooks/useDeleteUnit';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/src/lib/utils';

type Props = {
  data?: Unit[];
};

export default function UnitsTable({ data = [] }: Props) {
  const { mutate: deleteUnit } = useDeleteUnit()
  const handleDelete = (unitId: number) => {
    deleteUnit(unitId);
  };
  const table = useReactTable({
    data,
    columns: columns(handleDelete),
    getCoreRowModel: getCoreRowModel(),
  });
  const tableRef = useRef<HTMLDivElement>(null);
  const [scrollL, setScrollLeft] = useState(false);
  const [scrollR, setScrollRight] = useState(false)

  useEffect(() => {
    const table = tableRef.current;
    if (!table) return;
    const handleScroll = () => {
      setScrollLeft(table.scrollLeft > 0);
      setScrollRight(table.scrollWidth > table.scrollLeft + table.offsetWidth)
    };
    handleScroll()
    table.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll)

    return () => {
      table.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, []);
  return (
    <div ref={tableRef} className="w-full overflow-x-auto  min-h-[calc(100vh-400px)] [scrollbar-width:thin] [scrollbar-color:rgba(0,0,0,0.2)_transparent] [-ms-overflow-style:none] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-black/20  [&::-webkit-scrollbar-thumb]:rounded-[3px] [&::-webkit-scrollbar-track]:bg-transparent">
      <table className="w-full table-auto relative">
        <thead className="h-16">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className='relative'>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className={cn(header.id === 'actions' && scrollR ? 'sticky right-0 z-10 bg-[rgb(248,250,252)] shadow-[6px_4px_20px_0px_rgba(0,0,0,0.06)]' : "", header.id === "name" && scrollL ? 'sticky left-0 z-10 bg-[rgb(248,250,252)] shadow-[6px_4px_20px_0px_rgba(0,0,0,0.06)]' : "", "px-3 pr-15 py-3 text-left text-base leading-[150%] border-b font-semibold text-[rgba(15,23,42,1)]")}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              className={cn("h-22.5 border-b hover:bg-[rgba(58,135,235,0.1)]  transition")}
            >
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className={cn(cell.column.id === "actions" && scrollR ? 'sticky right-0 z-10 bg-[rgb(248,250,252)] shadow-[6px_4px_20px_0px_rgba(0,0,0,0.06)]' : "", cell.column.id === "name" && scrollL ? "sticky left-0 z-10 bg-[rgb(248,250,252)] shadow-[6px_4px_20px_0px_rgba(0,0,0,0.06)]" : "", "max-h-22.5 px-4 py-4 text-base font-medium leading-[150%] text-primary")}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}