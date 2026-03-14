import { getUnitById } from "@/src/api/Api";
import { useQuery } from "@tanstack/react-query";

export const useUnit = (unitId:number) => {
    return useQuery({
      queryKey:['unit',unitId],
      queryFn:()=>getUnitById(unitId),
      enabled:!!unitId
    })
};