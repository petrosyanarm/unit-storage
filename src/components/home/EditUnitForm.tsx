'use client';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Select from 'react-select'
import { unitSchema, UnitFormValues } from '@/src/utils/shchema/CreateShchema';
import { Input } from '@/src/components/ui/input';
import { useUnits } from '@/src/utils/hooks/useUnits';
import { useDimensions } from '@/src/utils/hooks/useDimensions';
import { Button } from '../ui/button';
import { twMerge } from 'tailwind-merge';
import { usePricingGroup } from '@/src/utils/hooks/usePricingGroup';
import FormSelect from '@/src/components/ui/formSelect';
import { DrawerClose } from '../ui/drawer';
import { useUnit } from '@/src/utils/hooks/useEditUnit';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
type Props = {
    unitId: number
}
export default function EditUnitForm({ unitId }: Props) {
    const selectClassNames = {
        control: ({ isFocused }: { isFocused: boolean }) =>
            `!h-[56px] !rounded-xl !border-[rgba(226,232,240,1)] ${isFocused && '!border bg-blue'} !shadow-none !hover:border-blue-400 !mt-2`,
        placeholder: () => '!text-base !text-[rgba(148,163,184,1)]',
        singleValue: () => 'text-gray-900 font-medium',
        menu: () => 'rounded-xl mt-2 shadow-lg',
        option: ({ isFocused, isSelected }: { isFocused: boolean, isSelected: boolean }) => `px-4 py-2 cursor-pointer ${isSelected ? 'bg-blue-500 text-white' : ''} ${isFocused && !isSelected ? 'bg-blue-100' : ''}`,
        indicatorSeparator: () => 'hidden',
        dropdownIndicator: ({ isFocused }: { isFocused: boolean }) =>
            isFocused ? 'text-blue-500' : 'text-gray-400',
    };
    const {
        register,
        handleSubmit,
        watch,
        reset,
        control,
        formState: { errors, isValid },
    } = useForm<UnitFormValues>({
        resolver: zodResolver(unitSchema),
        defaultValues: {
            rentable: true,
            filters: [
                { filterId: 1, selectedOptions: [] },
                { filterId: 2, selectedOptions: [] },
            ],
        },
    });

    const onSubmit = async (data: UnitFormValues) => {
        console.log(data)
    }
    const { data: unit } = useUnit(unitId);
    console.log({ unit })
    console.log({ unitId });
    useEffect(() => {
        if (!unit) return;
        reset({
        name: unit[0].name ?? "",
        facilityId: unit[0].facility?.id ?? 0,
        unitDimensionsId: unit[0].unitDimensions?.id ?? 0,
        pricingGroupId: unit[0].pricingGroup?.id ?? 0,
        rentable: unit[0].rentable ?? true,
        width: unit[0].doorWidth,
        height: unit[0].doorHeight,
        rentableReason: unit?.rentableReason ?? "Available for leasing",
        filters: [
    { 
        filterId: 1, 
        selectedOptions: unit[0].filters[0].selectedOptions?.map(opt => opt.id) ?? [] 
    },
    { 
        filterId: 2, 
        selectedOptions: unit[0].filters[1].selectedOptions?.map(opt => opt.id) ?? [] 
    },
]
        })
    }, [unit, reset]);
    const { data: dimensions } = useDimensions();
    const dimensionsOptions = dimensions?.data.map(item => ({
        value: item.id,
        label: `${item.x}x${item.y}x${item.z}`
    }))
    const { data } = useUnits();
    const units = data?.facilityList
    const facilityOptions = units?.map(item => ({
        value: item.id,
        label: item.name,
    }));
    const { data: pricingGroup } = usePricingGroup()
    const pricingGroupOptions = pricingGroup?.data.map(item => ({
        value: item.id,
        label: item.name,
    }));
    console.log({ pricingGroupOptions })
    const unitTypeOptions = data?.filterList?.[1]?.filterOptions?.map(item => ({
        value: item.id,
        label: item.name
    }));
    const featuresOptions = data?.filterList?.[0]?.filterOptions?.map(item => ({
        value: item.id,
        label: item.name
    }));
    // const rentable = watch('rentable')
    console.log({ errors });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="pt-4 space-y-4 overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg--600   [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-blue-700">
            <div>
                <Input
                    label='Unit Name'
                    required
                    {...register('name')}
                    placeholder="Unit Name"
                    className="mt-2"
                    error={errors.name}
                />
            </div>
            <div>
                <FormSelect
                    name="facilityId"
                    control={control}
                    label="Facility"
                    options={facilityOptions}
                    placeholder="Select Facility"
                    error={errors.facilityId}
                    required
                    classNames={selectClassNames}
                />
            </div>
            <div>
                <FormSelect
                    name="unitDimensionsId"
                    control={control}
                    label="Dimensions"
                    options={dimensionsOptions}
                    placeholder="Select Dimensions"
                    error={errors.unitDimensionsId}
                    required
                    classNames={selectClassNames}
                />
            </div>
            <div>
                <FormSelect
                    name="pricingGroupId"
                    control={control}
                    label="Pricing Group"
                    options={pricingGroupOptions}
                    placeholder="Select Pricing Group"
                    error={errors.pricingGroupId}
                    required
                    classNames={selectClassNames}
                />
            </div>
            <div>
                <FormSelect
                    name="filters.selectedOptions"
                    control={control}
                    label="Unit Type"
                    options={unitTypeOptions}
                    placeholder="Select Unit Type"
                    error={errors.filters?.[0]?.selectedOptions}
                    required
                    classNames={selectClassNames}
                />
            </div>
            <div>
                <label className="font-medium text-sm leading-[160%] text-[rgba(71,85,105,1)]">
                    Features <span className="text-[rgba(237,79,157,1)]">*</span>
                </label>
                <Controller name="filters.1.selectedOptions" control={control}
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
                                console.log({ option });
                                const values = option.map(({ value }) => value)
                                console.log({ values });
                                field.onChange(values)
                            }}
                        />
                    )}
                />
                {errors.filters?.[1]?.selectedOptions && (
                    <p className="text-[rgba(237,79,157,1)] text-sm mt-1">
                        {errors.filters?.[1]?.selectedOptions.message}
                    </p>
                )}

            </div>
            <div>
                <Controller
                    name="rentable" control={control}
                    render={({ field }) => (
                        <div>
                            <label className='font-medium text-sm leading-[160%] text-[rgba(71,85,105,1)]'>Rentable
                                <span className="text-[rgba(237,79,157,1)]">*</span>
                            </label>
                            <div className="flex bg-gray-100 rounded-xl p-1 mt-2">
                                <Button
                                    variant={'destructive'}
                                    type='button'
                                    onClick={() => field.onChange(true)}
                                    className={twMerge(field.value === true ? 'bg-white' : '', 'py-3 px-25 rounded-lg text-blue')}>Yes</Button>
                                <Button
                                    type='button'
                                    variant={'destructive'}
                                    onClick={() => field.onChange(false)}
                                    className={twMerge(field.value === false ? 'bg-white' : '', 'py-3 px-25 rounded-lg text-blue')}>
                                    No
                                </Button>
                            </div>
                        </div>)} />
            </div>
            <div className='flex gap-4'>
                <div>
                    <Input
                        label='Door Width(ft)'
                        required
                        type='number'
                        {...register('width')}
                        placeholder="Door Width(ft)"
                        className="mt-2"
                        error={errors.width}
                    />
                </div>
                <div>
                    <Input
                        label='Door Height(ft)'
                        required
                        type='number'
                        {...register('height')}
                        placeholder="Door Height(ft)"
                        className="mt-2"
                        error={errors.height}
                    />
                </div>
            </div>
            <div className="flex justify-end">
                <DrawerClose asChild>
                    <Button className="rounded-2xl py-3 px-7" type='submit' disabled={!isValid}>Update</Button>
                </DrawerClose>
            </div>
        </form>
    )
}