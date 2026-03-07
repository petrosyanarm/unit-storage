import {getUnits } from "@/src/api/Api";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
export const useUnits = () => {
  const searchParams = useSearchParams();
  const getParams = () => {
    const page = Number(searchParams.get("page")) || 1;
    const facilityIds =
      searchParams.get("facilityIds") &&
      Number(searchParams.get("facilityIds"));
    const name =searchParams.get('name') || undefined
    const filters=searchParams.getAll('filters').map(Number)
    const minPrice=searchParams.get('minPrice');
    const maxPrice=searchParams.get('maxPrice');
    const sizes=searchParams.getAll('sizes').map(Number)
    return {
      page,
      facilityIds: facilityIds ?? undefined,
      name,
      filters:filters.length ? filters : undefined,
      minPrice,
      maxPrice,
      sizes:sizes.length ? sizes : undefined
    };
  };

  const keys = searchParams.toString() || 1;
  return useQuery({
    queryKey: ["units", keys],
    queryFn: () => {
      const params = getParams();
      return getUnits(params);
    },
  });
};
