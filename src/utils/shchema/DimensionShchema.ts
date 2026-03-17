import { z } from "zod";

// export type DimensionFormValues={
//   x:number;
//   y:number;
//   z:number
// }
export const dimensionShchema = z.object({
  x: z.number().min(1, "Length is required"),
  y: z.number().min(1, "Width is required"),
  z: z.number().min(1, "Height is required"),
});

export type DimensionFormValues = z.infer<typeof dimensionShchema>;
