import { getPricingGroup } from "@/src/api/Api"
import { useQuery } from "@tanstack/react-query"

export const usePricingGroup=()=>{
    return useQuery({
        queryKey:['pricingGroup'],
        queryFn:()=>getPricingGroup()
    })
}