import { getCreateDimension } from "@/src/api/Api";
import { Dimension } from "@/src/table/Types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
export const useCreateDimension = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Dimension) => getCreateDimension(data),
    onSuccess: () => {
      toast.success("Unit Created Successfully!");
      queryClient.invalidateQueries({ queryKey: ["units"] });
    },
    onError: () => {
      toast.error("Failed to create unit.");
    },
  });
};
