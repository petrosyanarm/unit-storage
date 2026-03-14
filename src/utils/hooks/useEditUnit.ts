import { updateUnit } from "@/src/api/Api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UnitFormValues } from "@/src/utils/shchema/CreateShchema";
interface EditUnitParams {
  unitId: number;
  data: UnitFormValues;
}
export const useEditUnit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ unitId, data }: EditUnitParams) => updateUnit(unitId, data),
    onSuccess: (data) => {
      console.log("updated unit", data);
      queryClient.invalidateQueries({ queryKey: ["units"] });
    },
  });
};
