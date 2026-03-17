'use client';
import { useForm, Controller, FieldError } from 'react-hook-form';
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
import { useUnit } from '@/src/utils/hooks/useUnit';
import { selectClassNames } from '@/src/components/ui/selectClassNames';
import { useFacilityStore } from '@/src/store/useFacilityStore';
import LoadingForm from '@/src/components/ui/LoadingForm';
import { Dimension, DimensionOptions, Option, Val } from '@/src/table/Types';

type Props = {
    unitId: number
}
export default function EditUnitForm({ unitId }: Props) {
    const { data: unit, isLoading } = useUnit(unitId);
    const { data } = useUnits();
    const units = data?.facilityList
    const facilityOptions = units?.map((item: { id: number; name: string }) => ({
        value: item.id,
        label: item.name,
    }));
    const { data: pricingGroup } = usePricingGroup()
    const pricingGroupOptions = pricingGroup?.data.map((item: { id: number; name: string }) => ({
        value: item.id,
        label: item.name,
    }));
    const unitTypeOptions = data?.filterList?.[1]?.filterOptions?.map((item: { id: number; name: string }) => ({
        value: item.id,
        label: item.name
    }));
    const featuresOptions = data?.filterList?.[0]?.filterOptions?.map((item: { id: number; name: string }) => ({
        value: item.id,
        label: item.name
    }));

    const {
        register,
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
        values: {
            name: unit ? unit[0]?.name : "",
            facilityId: unit ? unit[0]?.facility?.id : 0,
            unitDimensionsId: unit ? unit[0]?.unitDimensions?.id : 0,
            pricingGroupId: unit ? unit[0]?.pricingGroupId : 0,
            rentable: unit ? unit[0]?.rentable : true,
            width: unit ? unit[0]?.doorWidth : 0,
            height: unit ? unit[0]?.doorHeight : 0,
            filters: [
                {
                    filterId: 1,
                    selectedOptions: unit ? unit[0]?.filters?.[0]?.selectedOptions?.map((item: { id: number }) => item.id) : []
                },
                {
                    filterId: 2,
                    selectedOptions: unit ? unit[0]?.filters?.[1]?.selectedOptions[0].id : []
                },
            ]
        }
    });
    const facilityId = useFacilityStore((state) => state.facilityId);
    const facilityIds = facilityId ? [facilityId] : []
    const { data: dimensions } = useDimensions(facilityIds);
    const dimensionsOptions = dimensions?.data.map((item: DimensionOptions) => ({
        value: item.id,
        label: `${item.x}x${item.y}x${item.z}`
    }))

    return (
        <form className="pt-4 space-y-4 max-h-[calc(100vh-123px)]">
            {isLoading ? <div className='h-[77vh] flex justify-center items-center'>
                <LoadingForm />
            </div> :
                <div>
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
                                name="filters.1.selectedOptions"
                                control={control}
                                label="Unit Type"
                                options={unitTypeOptions}
                                placeholder="Select Unit Type"
                                error={errors.filters?.[1]?.selectedOptions as FieldError}
                                required
                                classNames={selectClassNames}
                            />
                        </div>
                        <div>
                            <label className="font-medium text-sm leading-[160%] text-[rgba(71,85,105,1)]">
                                Features <span className="text-[rgba(237,79,157,1)]">*</span>
                            </label>
                            <Controller
                                name={`filters.0.selectedOptions`}
                                control={control}
                                render={({ field }) => {
                                    const selected: Option[] = featuresOptions.filter((opt: Val) => field.value?.includes(opt.value));
                                    return (
                                        <Select
                                            options={featuresOptions}
                                            isMulti
                                            isClearable={false}
                                            classNames={selectClassNames}
                                            placeholder="Select Features"
                                            value={selected}
                                            onChange={(options) => {
                                                const values = options.map(opt => opt.value)
                                                field.onChange(values);
                                            }} />
                                    )
                                }}
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
                                    {...register('width')}
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
                                    {...register('height')}
                                    placeholder="Door Height(ft)"
                                    className="mt-2 appearance-none! [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield"
                                    error={errors.height}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <DrawerClose asChild>
                            <Button className="rounded-2xl py-3 px-7 mt-4" type='submit' disabled={!isValid}>Update</Button>
                        </DrawerClose>
                    </div>
                </div>}
        </form>
    )
}