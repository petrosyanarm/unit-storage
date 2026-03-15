'use client'
import axios from "axios";
import { UnitFormValues } from "@/src/utils/shchema/CreateShchema";
import qs from "qs";
import { DimensionFormValues } from "@/src/utils/shchema/DimensionShchema";
const API_URL = process.env.NEXT_PUBLIC_URL!;
const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN!;
export const api = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    'Content-Type': 'application/json'
  }
})


api.interceptors.request.use((config) => {
  if (TOKEN) {
    config.headers.Authorization = `Bearer ${TOKEN}`;
  }
  return config;
});

export const getUnits = async (params: {
  page: number;
  pageSize:number
  facilityIds?: number | undefined;
  name?: string;
  filters?: string[];
  sizes?: number[];
  minPrice?: number;
  maxPrice?: number
}) => {
  const res = await api.get('/units/1', {
    params,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
  return res.data || [];
};

export const getFacilities = async () => {
  const res = await api.get('/facilities/1',{
    params:{
      pageSize:20
    }
  })
  return res.data
}
export const getDimensions = async (facilityIds:number[]) => {
  const res = await api.get('/unit-dimensions/1',{
    params:{facilityIds},
    paramsSerializer: params => qs.stringify(params, { arrayFormat: "repeat" }),
  })
  return res.data
}

export const getPricingGroup = async () => {
  const res = await api.get('/pricing/1?pageSize=21')
  return res.data
}

export const getCreateUnit = async (data: UnitFormValues) => {
  const res = await api.post('/units/create/1', data)
  return res.data
}

export const getUnitSizes = async () => {
  const res = await api.get('/unit-sizes/1')
  return res.data
}

export const getUnitById = async (unitId: number) => {
  const res = await api.get(`/units/1/${unitId}`)
  return res.data
}

export const deletUnitById = async (unitId: number) => {
  const res = await api.delete(`/units/1/${unitId}`)
  return res.data
}

export const getCreateDimension = async (data: DimensionFormValues) => {
  const res = await api.post('/unit-dimensions/create/1', data)
  return res.data
}

export const updateUnit=async (unitId:number ,data:UnitFormValues)=>{
  const res = await api.patch(`/units/1/${unitId}`,data)
  return res.data 
}
