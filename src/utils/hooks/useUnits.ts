import { getUnits } from "@/src/api/Api";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
export const useUnits = () => {
  const searchParams = useSearchParams();
  const getParams = () => {
    const page = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;
    const facilityIds =
      searchParams.get("facilityIds") &&
      Number(searchParams.get("facilityIds"));
    const name = searchParams.get("name") || undefined;
    const filters = searchParams.getAll("filters").map(Number);
    const minPrice = searchParams.get("minPrice") || undefined;
    const maxPrice = searchParams.get("maxPrice") || undefined;
    const sizes = searchParams.getAll("sizes").map(Number);
    return {
      page,
      pageSize,
      facilityIds: facilityIds ?? undefined,
      name,
      filters: filters.length ? filters : undefined,
      minPrice,
      maxPrice,
      sizes: sizes.length ? sizes : undefined,
    };
  };

  const keys = searchParams.toString() || 1;
  return useQuery({
    queryKey: ["units", keys],
    queryFn: () => {
      const params = getParams();
      console.log({ params });
      return getUnits(params);
    },
  });
};
