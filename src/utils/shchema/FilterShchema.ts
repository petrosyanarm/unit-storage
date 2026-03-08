import { z } from "zod";
export const filterShchema = z.object({
  minPrice: z.coerce
    .number()
    .min(0, "Minimum must be greater than 0")
    .optional(),

  maxPrice: z.coerce
    .number()
    .min(0, "Maximum must be greater than 0")
    .optional(),

  unitSizesOptions: z.array(z.number()).optional(),

  unitTypeId:  z.array(z.number()).optional(),

  featuresOptions: z.array(z.number()).optional()
});
export type FilterFormValues = z.infer<typeof filterShchema>;

