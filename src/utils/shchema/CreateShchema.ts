import { z } from "zod";

export const unitSchema = z.object({
  name: z.string().min(1, "Unit name is required"),

  facilityId: z.coerce.number().min(1, "Facility is required"),

  unitDimensionsId: z.coerce.number().min(1, "Dimension is required"),

  pricingGroupId: z.coerce.number().min(1, "Pricing group is required"),

  rentable: z.coerce.boolean(),

  rentableReason: z.string().optional().default(""),

  width: z.coerce.number().min(1, "Width is required"),

  height: z.coerce.number().min(1, "Height is required"),

  filters: z
    .array(
      z.object({
        filterId: z.coerce.number(),
        selectedOptions: z
          .union([
            z.coerce.number().transform((val) => [val]),
            z.array(z.number()),
          ])
          .refine((arr) => arr.length > 0, {
            message: "At least one option must be selected",
          }),
      }),
    )
    .min(1, "At least one filter is required"),
});

export type UnitFormValues = z.infer<typeof unitSchema>;
