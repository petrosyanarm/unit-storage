import { getDimensions } from "@/src/api/Api";
import { useQuery } from "@tanstack/react-query";
export const useDimensions = (facilityIds: number[]) => {
  return useQuery({
    queryKey: ["dimensions", facilityIds],
    queryFn: () => getDimensions(facilityIds),
    enabled: facilityIds?.length > 0,
  });
};
