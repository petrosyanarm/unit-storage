'use client';

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { columns } from '@/src/table/Columns';
import { Unit } from '@/src/table/Types';
import { useDeleteUnit } from '@/src/utils/hooks/useDeleteUnit';

type Props = {
  data?: Unit[];
};

export default function UnitsTable({ data = [] }: Props) {
  const {mutate:deleteUnit}=useDeleteUnit()
    const handleDelete = (unitId: number) => {
      deleteUnit(unitId);
    };
  const table = useReactTable({
    data,
    columns:columns(handleDelete),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="">
      <table className="">
        <thead className="h-16">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className=''>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-3 pr-15 py-3 text-left text-base leading-[150%] font-semibold text-[rgba(15,23,42,1)]"
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
                className="h-22.5 border-t hover:bg-blue-100 transition"
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-4 py-4 text-base font-medium leading-[150%] text-primary">
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