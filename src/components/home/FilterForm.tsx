'use client'
import { Slider } from "@/src/components/ui/slider"
import { Input } from "@/src/components/ui/input"
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Select from 'react-select'
import { filterShchema, FilterFormValues } from '@/src/utils/shchema/FilterShchema';
import { Button } from "@/src/components/ui/button";
import { useUnits } from "@/src/utils/hooks/useUnits";
import { useUnitSizes } from "@/src/utils/hooks/useUnitSizes";
import { twMerge } from "tailwind-merge";
import { usePathname, useRouter } from "next/navigation";
import { DrawerClose, DrawerFooter } from "@/src/components/ui/drawer";
import useFilterParams from "@/src/utils/hooks/useFilterParams";
import { selectClassNames } from "@/src/components/ui/selectClassNames";
import Price from '@/public/assets/images/price.svg'
import CheckboxOption from "./CheckboxOption";
export default function FilterForm() {
    const router = useRouter();
    const pathname = usePathname()
    const { data: unitSizes } = useUnitSizes();
    const unitSizesOptions = unitSizes?.data?.map((item:{id:number;name:string}) => ({
        value: item.id,
        label: item.name
    }))
    const { data: features } = useUnits()
    const { minPriceQuery, maxPriceQuery, sizes, filters } = useFilterParams();
    const featuresOptions = features?.filterList?.[0]?.filterOptions?.map((item:{id:number;name:string}) => ({
        value: item.id,
        label: item.name
    }));
    const unitTypeOptions = features?.filterList?.[1]?.filterOptions?.map((item:{id:number;name:string}) => ({
        value: item.id,
        label: item.name
    }));

    const {
        handleSubmit,
        setValue,
        watch,
        control,
        formState: { errors },
    } = useForm<FilterFormValues>({
        resolver: zodResolver(filterShchema),
        defaultValues: {
            minPrice: minPriceQuery,
            maxPrice: maxPriceQuery,
            unitSizesOptions: sizes || [],
            featuresOptions: filters || [],
            unitTypeId: filters || []
        }
    });
    const onSubmit = (data: FilterFormValues) => {
        const params = new URLSearchParams();

        if (data.minPrice) params.set("minPrice", String(data.minPrice));
        if (data.maxPrice) params.set("maxPrice", String(data.maxPrice));

        data.unitSizesOptions?.forEach(size =>
            params.append("sizes", String(size))
        );
        const uniqueFilters = [...new Set((data.featuresOptions || []).concat(data.unitTypeId || [])
        )]
        uniqueFilters.forEach(id =>
            params.append("filters", String(id))
        )
        router.push(`${pathname}?${params.toString()}`);
    };
    const handleReset = () => {
        router.replace(pathname)
    }
    const minPrice = watch("minPrice");
    const maxPrice = watch("maxPrice");
    console.log({ errors });

    return (
        <div className="max-h-[calc(100vh-168px)]">
            <form className="pt-4 px-4  flex flex-col justify-between" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-6">
                    <label className="font-medium text-sm leading-[160%] text-[rgba(71,85,105,1)]">
                        Unit Price Range
                    </label>
                    <Slider
                        value={[minPrice, maxPrice]}
                        onValueChange={(value) => {
                            setValue("minPrice", value[0]);
                            setValue("maxPrice", value[1]);
                        }}
                        max={120}
                        step={1}
                        className="mx-auto w-full mt-2"
                    />
                    <div className='flex gap-4'>
                        <div className="flex relative">
                            <Controller
                                name="minPrice"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        label="Minimum"
                                        type='number'
                                        {...field}
                                        placeholder=""
                                        className="mt-2 relative appearance-none! [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield"
                                        error={errors.minPrice}
                                    />
                                )} />
                            <Price className="absolute top-10 left-24 size-10" />
                        </div>
                        <div className="flex relative">
                            <Controller
                                name="maxPrice"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        label="Maximum"
                                        type="number"
                                        {...field}
                                        className="mt-2 relative appearance-none! [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield"
                                        error={errors.maxPrice}
                                    />
                                )}
                            />
                            <Price className="absolute top-10 left-24 size-10" />
                        </div>
                    </div>
                    <div>
                        <label className="font-medium text-sm leading-[160%] text-[rgba(71,85,105,1)]">
                            Unit Size
                        </label>
                        <Controller name="unitSizesOptions" control={control}
                            render={({ field }) => (
                                <Select
                                    options={unitSizesOptions}
                                    classNames={selectClassNames}
                                    placeholder={'Select Unit Sizes'}
                                    isMulti
                                    isClearable={false}
                                    components={{ Option: CheckboxOption }}
                                    closeMenuOnSelect={false}
                                    hideSelectedOptions={false}
                                    value={unitSizesOptions?.filter(opt =>
                                        field.value?.includes(opt.value)
                                    )}
                                    onChange={(options) => {
                                        const values = options.map(({ value }) => value)
                                        field.onChange(values)
                                    }}
                                />
                            )}
                        />
                    </div>
                    <div>
                        <label className="font-medium text-sm leading-[160%] text-[rgba(71,85,105,1)]">
                            Features
                        </label>
                        <Controller name="featuresOptions" control={control}
                            render={({ field }) => (
                                <Select
                                    options={featuresOptions}
                                    classNames={selectClassNames}
                                    placeholder={'Select Features'}
                                    isMulti
                                    isClearable={false}
                                    components={{ Option: CheckboxOption }}
                                    closeMenuOnSelect={false}
                                    hideSelectedOptions={false}
                                    value={featuresOptions?.filter(opt =>
                                        field.value?.includes(opt.value)
                                    )}
                                    onChange={(options) =>
                                        field.onChange(options.map(opt => opt.value))
                                    }
                                />
                            )}
                        />
                    </div>
                    <label className="font-medium text-sm leading-[160%] text-[rgba(71,85,105,1)]">
                        Unit Type
                    </label>
                    <div className="flex gap-2 mt-2">
                        <Controller name='unitTypeId' control={control}
                            render={({ field }) => (
                                <div className="flex gap-2">
                                    {unitTypeOptions?.map((item) => (
                                        <Button type="button" key={item.value} onClick={() => {
                                            const newValues = field.value?.includes(item.value)
                                                ? field.value.filter(v => v !== item.value)
                                                : [...(field.value || []), item.value]
                                            field.onChange(newValues)
                                        }} className={twMerge(field.value?.includes(item.value) ? "border border-blue bg-white" : "bg-white border border-gray-200", "px-12.5 py-4 text-blue text-sm font-semibold leading-[150%]")}>{item.label}</Button>
                                    ))}
                                </div>
                            )} />
                    </div>
                </div>
                <DrawerFooter className="py-6 px-4">
                    <div className="flex w-full justify-end gap-4 rounded-b-2xl bg-white fixed z-99 py-6 bottom-1  right-5">
                        <DrawerClose asChild>
                            <Button type="button" onClick={handleReset} className="border border-blue py-3 px-6 rounded-xl text-blue" variant={'destructive'}>Reset</Button>
                        </DrawerClose>
                        <DrawerClose asChild >
                            <Button type="submit" className="py-3 px-6 rounded-xl">Apply</Button>
                        </DrawerClose>
                    </div>
                </DrawerFooter>
            </form>
        </div>
    )
}