import { getFacilities } from "@/src/api/Api";
import { useQuery } from "@tanstack/react-query";

export const useFacilities = () => {
  return useQuery({
    queryKey: ["facilities"],
    queryFn: () => getFacilities(),
  });
};
