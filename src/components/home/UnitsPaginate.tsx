'use client'
import { useSearchParams, useRouter } from "next/navigation";
import ReactPaginate from "react-paginate";
import ChevronLeft from "@/public/assets/images/chevron-left.svg"
import ChevronRight from "@/public/assets/images/chevron-right.svg"
import Image from "next/image";

export default function UnitsPaginate({ totalPages }: {
  totalPages: number
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get('page')) || 1
  const handlePageChange = ({ selected }: { selected: number }) => {
    router.push(`?page=${selected + 1}`)
  }
  return (
    <div className="flex justify-end pb-10">
      {totalPages>1 && (
        <ReactPaginate
          breakLabel="..."
          onPageChange={handlePageChange}
          pageCount={totalPages}
          forcePage={page - 1}
          containerClassName="flex gap-2 mt-8"
          pageClassName="rounded-lg border cursor-pointer flex"
          pageLinkClassName="text-primary text-lg leading-[140%] font-bold px-5 py-3"
          activeLinkClassName="!text-[rgba(19,109,162,1)]"
          previousLabel={<Image src={ChevronLeft} alt="Prev" width={24} height={24} />}
          nextLabel={<Image src={ChevronRight} alt="Next" width={24} height={24} />}
          previousClassName="px-3 py-1 rounded-lg border cursor-pointer flex justify-center items-center"
          nextClassName="px-3 py-1 rounded-lg border cursor-pointer flex justify-center items-center"
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      )}
    </div>
  );
}