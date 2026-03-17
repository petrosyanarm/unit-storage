type Filter = {
  filterId: number;
  selectedOptions?: Option[];
};
type Facility = { id: number; name: string };
type PricingGroup = { id: number; name: string };
type UnitDimensions = { x: number; y: number; z: number };

export type Unit = {
  id: number;
  name: string;
  facility: Facility;
  pricingGroup: PricingGroup;
  unitDimensions: UnitDimensions;
  rentable: boolean;
  filters?: Filter[];
};

export type VariantProps = {
  id: number;
  name: string;
};

export type Option = {
  value: number | string;
  label: string;
  name: string;
};

export type Val = {
  value: number;
  label: string;
};

export type Dimension = {
  x: number;
  y: number;
  z: number;
  facilityIds: number[];
};
export type DimensionOptions = {
  id: number;
  x: number;
  y: number;
  z: number;
};
