export type Unit = {
  id: number;
  name: string;
  facility: string;
  features: string;
  pricingGroup: string;
  dimensions: string;
  rentable: boolean;
  doorWidth: number;
  doorHeight: number;
};

export type VariantProps={
  id:number;
  name:string
}

export type Option={
  value:number | string;
  label:string
}

export type Dimension={
    id:number;
    x:number;
    y:number;
    z:number
}