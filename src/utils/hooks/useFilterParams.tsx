'use client'
import { useSearchParams } from "next/navigation";

export default function useFilterParams() {
    const searchParams = useSearchParams();
    const minPriceQuery = Number(searchParams.get("minPrice")) || 0;
    const maxPriceQuery = Number(searchParams.get("maxPrice")) || 120;
    const sizes = searchParams.getAll("sizes").map(Number);
    const filters = searchParams.getAll("filters").map(Number);
    return { minPriceQuery, maxPriceQuery, sizes, filters }
}