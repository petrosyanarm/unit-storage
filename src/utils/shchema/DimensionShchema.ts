import { z } from "zod";

export const dimensionShchema = z.object({
  x: z.coerce.number().min(1, "Length is required"),
  y: z.coerce.number().min(1, "Width is required"),
  z: z.coerce.number().min(1, "Height is required"),
});

export type DimensionFormValues = z.infer<typeof dimensionShchema>;
