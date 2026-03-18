import { updateUnit } from "@/src/api/Api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UnitFormValues } from "@/src/utils/shchema/CreateShchema";
type EditUnitParams = {
  unitId: number;
  data: UnitFormValues;
};
export const useEditUnit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ unitId, data }: EditUnitParams) => updateUnit(unitId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
    },
  });
};
