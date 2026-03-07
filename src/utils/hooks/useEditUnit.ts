// import { getEditUnit } from "@/src/api/Api";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { UnitFormValues } from "../shchema/CreateShchema";
// interface EditUnitParams {
//   unitId: number;
//   data: UnitFormValues;
// }
// export const useEditUnit = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: ({unitId,data}: EditUnitParams) => getEditUnit(unitId,data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["units"] });
//     },
//   });
// };


import { getUnitById } from "@/src/api/Api";
import { useQuery } from "@tanstack/react-query";

export const useUnit = (unitId:number) => {
    return useQuery({
      queryKey:['unit',unitId],
      queryFn:()=>getUnitById(unitId),
      enabled:!!unitId
    })
};