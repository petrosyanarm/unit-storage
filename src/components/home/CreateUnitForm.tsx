'use client';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Select from 'react-select'
import { unitSchema, UnitFormValues } from '@/src/utils/shchema/CreateShchema';
import { Input } from '@/src/components/ui/input';
import { useUnits } from '@/src/utils/hooks/useUnits';
import { useDimensions } from '@/src/utils/hooks/useDimensions';
import { Button } from '@/src/components/ui/button';
import { twMerge } from 'tailwind-merge';
import { usePricingGroup } from '@/src/utils/hooks/usePricingGroup';
import FormSelect from '@/src/components/ui/formSelect';
import { DrawerClose } from '@/src/components/ui/drawer';
import { useCreateUnit } from '@/src/utils/hooks/useCreateUnit';
import CreateDimensionList from '@/src/components/home/CreateDimensionLIst';
import { selectClassNames } from '@/src/components/ui/selectClassNames';
import { useFacilityStore } from '@/src/store/useFacilityStore';
import { Dimension, DimensionOptions } from '@/src/table/Types';
import { VariantProps } from '@/src/table/Types';

export default function CreateUnitForm() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isValid },
    } = useForm<UnitFormValues>({
        resolver: zodResolver(unitSchema),
        defaultValues: {
            rentable: true,
            filters: [
                { filterId: 1, selectedOptions: [] },
                { filterId: 2, selectedOptions: [] },
            ]
        },
    });
    const { mutate } = useCreateUnit()
    const onSubmit = async (data: UnitFormValues) => {
        mutate({
            ...data, rentableReason: data.rentable ?
                "Unit is rentable" :
                "Unit is not rentable"
        });
    };

    const facilityId = useFacilityStore((state) => state.facilityId);
    const facilityIds = facilityId ? [facilityId] : [];
    const { data: dimensions, isLoading: isLoadingDimensions } = useDimensions(facilityIds);
    const dimensionsOptions = dimensions?.data.map((item:DimensionOptions) => ({
        value: item.id,
        label: `${item.x}x${item.y}x${item.z}`
    }))
    const { data } = useUnits();
    const units = data?.facilityList
    const facilityOptions = units?.map((item: VariantProps) => ({
        value: item.id,
        label: item.name,
    }));
    const { data: pricingGroup } = usePricingGroup()
    const pricingGroupOptions = pricingGroup?.data.map((item: VariantProps) => ({
        value: item.id,
        label: item.name,
    }));
    const unitTypeOptions = data?.filterList?.[1]?.filterOptions?.map((item: VariantProps) => ({
        value: item.id,
        label: item.name
    }));
    const featuresOptions = data?.filterList?.[0]?.filterOptions?.map((item: VariantProps) => ({
        value: item.id,
        label: item.name
    }));

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="pt-4 space-y-4  max-h-[calc(100vh-123px)]">
            <div className='space-y-4 max-h-[calc(100vh-227px)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
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
                        components={{ MenuList: CreateDimensionList }}
                        placeholder="Select Dimensions"
                        error={errors.unitDimensionsId}
                        required
                        classNames={selectClassNames}
                        isDisabled={!facilityId}
                        isLoading={facilityId ? isLoadingDimensions : false}
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
                    <label className="font-medium text-sm leading-[160%] text-[rgba(71,85,105,1)]">
                        Unit Types <span className="text-[rgba(237,79,157,1)]">*</span>
                    </label>
                      <Controller name="filters.1.selectedOptions" control={control}
                        render={({ field }) => (
                            <Select
                                options={unitTypeOptions}
                                classNames={selectClassNames}
                                placeholder={'Select Unit Type'}
                                isClearable={false}
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                onChange={(option:{value:number | null; label:string | null}) => {
                                    field.onChange([option.value]);
                                    console.log({option})
                                }}
                            />
                        )}
                    />
                </div>
                <div>
                    <label className="font-medium text-sm leading-[160%] text-[rgba(71,85,105,1)]">
                        Features <span className="text-[rgba(237,79,157,1)]">*</span>
                    </label>
                    <Controller name="filters.0.selectedOptions" control={control}
                        render={({ field }) => (
                            <Select
                                options={featuresOptions}
                                classNames={selectClassNames}
                                placeholder={'Select Features'}
                                isMulti
                                isClearable={false}
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                value={featuresOptions?.find((option:{value:number[]}) => option.value === field.value)}
                                onChange={option => {
                                    console.log({ option });
                                    const values = option.map(({ value }) => value)
                                    field.onChange(values)
                                }}
                            />
                        )}
                    />
                    {errors.filters?.[0]?.selectedOptions && (
                        <p className="text-[rgba(237,79,157,1)] text-sm mt-1">
                            {errors.filters?.[0]?.selectedOptions.message}
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
                            {...register('width', { valueAsNumber: true })}
                            placeholder="Door Width(ft)"
                            className="mt-2 appearance-none! [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield"
                            error={errors.width}
                        />
                    </div>
                    <div>
                        <Input
                            label='Door Height(ft)'
                            required
                            type='number'
                            {...register('height', { valueAsNumber: true })}
                            placeholder="Door Height(ft)"
                            className="mt-2 appearance-none! [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield"
                            error={errors.height}
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <DrawerClose asChild>
                    <Button className="rounded-2xl py-3 px-7 mt-2" type='submit' disabled={!isValid}>Create</Button>
                </DrawerClose>
            </div>
        </form>
    )
}