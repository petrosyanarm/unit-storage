'use client'
import Image from "next/image";
import CreateModal from "@/src/components/home/CreateModal";
import FIlterModal from "@/src/components/home/FIlterModal";
import UnitsTable from "@/src/components/home/UnitsTable";
import { useUnits } from "@/src/utils/hooks/useUnits";
import { useRouter, useSearchParams } from 'next/navigation'
import UnitsPaginate from "@/src/components/home/UnitsPaginate";
import Loader from "@/src/components/ui/Loader"
import { useEffect, useState } from "react";
import { useDebounce } from "@/src/utils/hooks/Debounse";
import Search from "@/public/assets/images/Search.svg"

export default function UnitsList() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const facilityIds = Number(searchParams.get('facilityIds'))
    const showPagination = !facilityIds
    const [query, setQuery] = useState(searchParams.get('name') || "")
    const debouncedQuery = useDebounce(query, 500)
    const { data, isLoading } = useUnits();
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        console.log({ debouncedQuery })
        if (debouncedQuery) {
            params.set('name', debouncedQuery);
        } else {
            params.delete('name');
        }
        params.set('page', '1')
        router.replace(`?${params.toString()}`);
    }, [debouncedQuery])

    const units = data?.data
    const totalPages = data?.totalPages || 1;
    const totalUnits = data?.total
    return (
        <div className="px-8 py-8">
            <div className="bg-[rgba(255,255,255,1)] shadow-lg shadow-gray-400 rounded-2xl">
                <div className="px-6 pt-6  ">
                    <div className="border-b border-b-[rgba(225,239,248,1)] flex justify-between">
                        <div className="pl-3 pt-2">
                            <span className="text-primary font-medium leading-[150%]">All {totalUnits} Units</span>
                        </div>
                        <div className="flex gap-4 items-center pb-3">
                            <div className="flex gap-2 px-3">
                                <FIlterModal />
                            </div>
                            <div className="relative">
                                <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." className="max-w-65.75 w-full pl-12 py-1.75 border rounded-xl focus:outline-none border-[rgba(226,232,240,1)] placeholder:text-sm font-normal leading-[160%] text-primary" />
                                <div className="absolute top-3 left-4">
                                    <Search className="size-5" />
                                </div>
                            </div>
                            <div>
                                <CreateModal />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col  min-h-[calc(100vh-310px)] ">
                        {units?.length > 0 && (
                            <div className="w-full">
                                <UnitsTable data={units} />
                            </div>
                        )}
                        {isLoading && (
                            <div className="w-full h-full mt-10">
                                <Loader />
                            </div>
                        )}
                        <div>
                            {totalUnits === 0 &&
                                <div className="px-5 py-20 flex justify-center items-center">
                                    <Image src={'/assets/images/no-data.webp'} width={200} height={200} alt={"NotData"} />
                                </div>
                            }
                            {showPagination &&
                                <UnitsPaginate totalPages={totalPages} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

