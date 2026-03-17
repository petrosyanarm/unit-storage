import { z } from "zod";

export const unitSchema = z.object({
  name: z.string().min(1, "Unit name is required"),

  facilityId: z.number().min(1, "Facility is required"),

  unitDimensionsId: z.number().min(1, "Dimension is required"),

  pricingGroupId: z.number().min(1, "Pricing group is required"),

  rentable: z.boolean(),

  width: z.number().min(1, "Width is required"),

  height: z.number().min(1, "Height is required"),

  filters: z.tuple([
    z.object({
      filterId: z.number(),
      selectedOptions: z
        .array(z.number())
        .min(1, "At least one option must be selected"),
    }),
    z.object({
      filterId: z.number(),
       selectedOptions: z
        .array(z.number())
        .min(1, "At least one option must be selected"),
    }),
  ]),
});

export type UnitFormValues = z.infer<typeof unitSchema>;

