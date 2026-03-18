import { useDrawerStore } from "@/src/store/useDrawerStore"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { useForm } from "react-hook-form"
import { DimensionFormValues, dimensionShchema } from "@/src/utils/shchema/DimensionShchema"
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateDimension } from "@/src/utils/hooks/useCreateDimension"
import Close from '@/public/assets/images/close.svg'
import { useFacilityStore } from "@/src/store/useFacilityStore"
export default function CreateDimensionForm() {
    const { setOpenDimension } = useDrawerStore();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<DimensionFormValues>({
        resolver: zodResolver(dimensionShchema)
    });
    const { facilityId } = useFacilityStore()
    const { mutate } = useCreateDimension()
    const onSubmit = async (data: DimensionFormValues) => {
        if (!facilityId) return
        mutate({
            ...data,
            facilityIds: facilityId ? [facilityId] : []
        });
    };
    return (
        <div className="h-[89vh] pt-5 px-5 ml-4 bg-[rgba(248,250,252,1)] rounded-2xl shadow-[0px_4px_12px_rgba(0,0,0,0.12)]">
            <div className="flex border-b pb-4 justify-between">
                <span className="text-[rgba(15,23,42,1)] text-sm font-semibold leading-[160%]">Create Dimension</span>
                <Button variant={'destructive'} onClick={() => setOpenDimension(false)} className="cursor-pointer"><Close className="size-6" /></Button>
            </div>
            <div className="p-4 border border-[rgb(182,226,252)] mt-4 rounded-xl bg-[rgb(238,249,255)]">
                <p className="text-sm"><span className="font-semibold">Note:</span> This Dimension will belong to  facility.</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="h-[70vh] flex flex-col pt-4 justify-between">
                <div className="flex flex-col space-y-4">
                    <div className="relative">
                        <Input
                            label='Length (X)'
                            required
                            type='number'
                            {...register('x', { valueAsNumber: true })}
                            placeholder="Enter length..."
                            className="mt-2 bg-white appearance-none! [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield"
                            error={errors.x}
                        />
                        <div className="absolute top-10 right-3 size-10 pr-2 border-l flex justify-end items-center">
                            <span className="text-base text-primary font-medium">ft</span>
                        </div>
                    </div>
                    <div className="relative">
                        <Input
                            label='Width (Y)'
                            required
                            type='number'
                            {...register('y', { valueAsNumber: true })}
                            placeholder="Enter width..."
                            className="mt-2 bg-white appearance-none! [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield"
                            error={errors.y}
                        />
                        <div className="absolute top-10 right-3 size-10 pr-2 border-l flex justify-end items-center">
                            <span className="text-base text-primary font-medium">ft</span>
                        </div>
                    </div>
                    <div className="relative">
                        <Input
                            label='Height (Z)'
                            required
                            type='number'
                            {...register('z', { valueAsNumber: true })}
                            placeholder="Enter height..."
                            className="mt-2 bg-white appearance-none! [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield"
                            error={errors.z}
                        />
                        <div className="absolute top-10 right-3 size-10 pr-2 border-l flex justify-end items-center">
                            <span className="text-base text-primary font-medium">ft</span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button className="rounded-2xl py-3 px-7" type='submit' disabled={!isValid}>Create</Button>
                </div>
            </form>
        </div>
    )
}