import { getDimensions } from "@/src/api/Api";
import { useQuery } from "@tanstack/react-query";
export const useDimensions = () => {
  return useQuery({
    queryKey: ["dimensions"],
    queryFn: () => getDimensions(),
  });
};