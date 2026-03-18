'use client'
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import ReactPaginate from "react-paginate";
import ChevronLeft from "@/public/assets/images/chevron-left.svg"
import ChevronRight from "@/public/assets/images/chevron-right.svg"
import { useForm } from "react-hook-form";
import Select from "react-select";
export const selectPageClassNames = {
  control: ({ isFocused }: { isFocused: boolean }) =>
    `!h-[56px] !w-[123px] !rounded-xl !border-[rgba(226,232,240,1)] !cursor-pointer ${isFocused ? "!border" : null} !shadow-none !hover:border-blue-400 !mt-2`,
  indicatorSeparator: () => "hidden",
}
export default function UnitsPaginate({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname()
  const page = Number(searchParams.get('page')) || 1
  const handlePageChange = ({ selected }: { selected: number }) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', (selected + 1).toString());
    router.replace(`?${params.toString()}`);
  }
  const pageSizeQuery = Number(searchParams.get('pageSize')) || 10
  const pageSizeOptions = [
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 30, label: "30" },
  ]
  const { setValue } = useForm({
    defaultValues: {
      pageSize: pageSizeQuery
    }
  })
  return (
    <div className="flex justify-between items-center pb-10">
      <div className="flex justify-center items-center gap-2 mt-9">
        <span className="text-[rgba(15,23,42,1)] text-base font-semibold leading-[150%]">Show Rows : </span>
        <Select
          options={pageSizeOptions}
          classNames={selectPageClassNames}
          menuPlacement="top"
          value={pageSizeOptions.find(opt => opt.value === pageSizeQuery)}
          onChange={(option) => {
            setValue("pageSize", option?.value ?? 0)
            const params = new URLSearchParams(searchParams.toString());
            params.set("pageSize", String(option?.value));
            router.replace(`${pathname}?${params.toString()}`);
          }}
          instanceId="pageSize" 
        />
      </div>
      {totalPages > 1 && (
        <ReactPaginate
          breakLabel="..."
          onPageChange={handlePageChange}
          pageCount={totalPages}
          forcePage={page - 1}
          containerClassName="flex gap-2 mt-8"
          pageClassName="rounded-xl !h-[48px] border cursor-pointer flex justify-center items-center"
          pageLinkClassName="text-primary text-lg leading-[140%] font-bold px-5 py-3"
          activeLinkClassName="!text-[rgba(19,109,162,1)]"
          previousLabel={<ChevronLeft className='size-6' />}
          nextLabel={<ChevronRight className='size-6' />}
          previousClassName="!h-[48px] px-3 py-1 rounded-xl border cursor-pointer flex justify-center items-center"
          nextClassName="!h-[48px] px-3 py-1 rounded-xl border cursor-pointer flex justify-center items-center"
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      )}
    </div>
  );
}