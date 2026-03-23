import { deletUnitById } from "@/src/api/Api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
export const useDeleteUnit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (unitId: number) => deletUnitById(unitId),
    onSuccess: () => {
      toast.success("Unit deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["units"] });
    },
    onError: () => {
      toast.error("Failed to delete unit.");
    },
  });
};
