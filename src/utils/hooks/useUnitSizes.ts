import { getUnitSizes } from "@/src/api/Api";
import { useQuery } from "@tanstack/react-query";

export const useUnitSizes = () => {
  return useQuery({
    queryKey: ["unitSizes"],
    queryFn: () => getUnitSizes(),
  });
};
