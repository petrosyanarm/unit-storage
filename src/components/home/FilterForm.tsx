'use client'
import { Slider } from "@/src/components/ui/slider"
import { Input } from "@/src/components/ui/input"
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Select from 'react-select'
import { filterShchema, FilterFormValues } from '@/src/utils/shchema/FilterShchema';
import { Button } from "@/src/components/ui/button";
import { useUnits } from "@/src/utils/hooks/useUnits";
import { useEffect, useState } from "react";
import { useUnitSizes } from "@/src/utils/hooks/useUnitSizes";
import { twMerge } from "tailwind-merge";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DrawerClose } from "../ui/drawer";
export default function FilterForm() {
    
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname()
    const selectClassNames = {
        control: ({ isFocused }) =>
            `!h-[56px] !rounded-xl !border-[rgba(226,232,240,1)] ${isFocused && '!border'} !shadow-none !hover:border-blue-400 !mt-2`,
        placeholder: () => '!text-base !text-[rgba(148,163,184,1)]',
        singleValue: () => 'text-gray-900 font-medium',
        menu: () => 'rounded-xl mt-2 shadow-lg',
        option: ({ isFocused, isSelected }) => `px-4 py-2 cursor-pointer ${isSelected ? 'bg-blue-500 text-white' : ''} ${isFocused && !isSelected ? 'bg-blue-100' : ''}`,
        indicatorSeparator: () => 'hidden',
        dropdownIndicator: ({ isFocused }) =>
            isFocused ? 'text-blue-500' : 'text-gray-400',
    };
    const  defaultValues = {
            minPrice: 0,
            maxPrice: 120,
            featuresOptions: [],
            unitSizesOptions: [],
            unitTypeId: []
        }
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        control,
        formState: { errors, isValid },
    } = useForm<FilterFormValues>({
        resolver: zodResolver(filterShchema),
        defaultValues
    });
    const onSubmit = (data: FilterFormValues) => {
        const params = new URLSearchParams();
        if (data.minPrice) {
            params.set("minPrice", String(data.minPrice));
        }
        if (data.maxPrice) {
            params.set("maxPrice", String(data.maxPrice));
        }
        if (data.unitSizesOptions) {
            data?.unitSizesOptions?.forEach((size) => {
                params.append("sizes", String(size));
            });
        }
        if(data.unitTypeId){
            data?.unitTypeId.forEach((id)=>{
                params.append('filters',String(id))
            })
        }
        if (data.featuresOptions) {
            data?.featuresOptions?.forEach((id) => {
                params.append("filters", String(id));

            });
        }
        router.push(`${pathname}?${params.toString()}`);
        console.log({ data });
    }
    const handleReset = () => {
        reset(defaultValues)
        console.log({reset})
        router.replace(pathname)
    }

    const { data: unitSizes } = useUnitSizes();
    const unitSizesOptions = unitSizes?.data?.map(item => ({
        value: item.id,
        label: item.name
    }))
    const { data: features } = useUnits()
    const featuresOptions = features?.filterList?.[0]?.filterOptions?.map(item => ({
        value: item.id,
        label: item.name
    }));
    const unitTypeOptions = features?.filterList?.[1]?.filterOptions?.map(item => ({
        value: item.id,
        label: item.name
    }));
    const minPrice = watch("minPrice");
    const maxPrice = watch("maxPrice");
    console.log({errors})

    return (
        <div>
            <form className="pt-4 px-4 h-screen flex flex-col justify-between" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-6 ">
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
                        className="mx-auto w-full mt-4"
                    />
                    <div className='flex gap-4'>
                        <div>
                            <Controller
                            name="minPrice"
                            control={control}
                            render={({field})=>(
                                <Input
                                    label="Minimum"
                                    type='number'
                                    {...field}
                                    placeholder=""
                                    className="mt-2"
                                    error={errors.minPrice}
                                />
                            )}/>
                        </div>
                        <div>
                            <Controller
                                name="maxPrice"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        label="Maximum"
                                        type="number"
                                        {...field}
                                        className="mt-2"
                                        error={errors.maxPrice}
                                    />
                                )}
                            />
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
                                    placeholder={'Select Unit Size'}
                                    value={unitSizesOptions?.find(
                                        option => option.value === field.value
                                    )}
                                    isMulti
                                    onChange={option => {
                                        const values = option.map(({ value }) => value)
                                        field.onChange(values)
                                    }}
                                />
                            )}
                        />
                        {/* {errors.filters?.[1]?.selectedOptions && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.filters?.[1]?.selectedOptions.message}
                    </p>
                )} */}

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
                                    value={featuresOptions?.find(
                                        option => option.value === field.value
                                    )}
                                    isMulti
                                    onChange={option => {
                                        const values = option.map(({ value }) => value)
                                        console.log({ values })
                                        field.onChange(values)
                                    }}
                                />
                            )}
                        />
                        {/* {errors.filters?.[1]?.selectedOptions && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.filters?.[1]?.selectedOptions.message}
                    </p>
                )}  */}
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
                                            const newValues = field.value
                                            newValues?.push(item.value)
                                            console.log({ sdd: newValues });
                                            { field.onChange(newValues) }
                                        }} className={twMerge(field.value?.includes(item.value) ? "border-blue bg-white" : "bg-white", " border px-11.5 py-4 text-blue text-base font-semibold leading-[150%]")}>{item.label}</Button>
                                    ))}
                                </div>
                            )} />
                    </div>
                </div>
                <div className="flex gap-4 justify-end">
                    <DrawerClose asChild>
                    <Button type="button" onClick={handleReset} className="border border-blue py-3 px-6 rounded-xl text-blue" variant={'destructive'}>Reset</Button>
                    </DrawerClose>
                    <DrawerClose asChild>
                        <Button type="submit" className="py-3 px-6 rounded-xl">Apply</Button>
                    </DrawerClose>
                </div>
            </form>
        </div>
    )
}