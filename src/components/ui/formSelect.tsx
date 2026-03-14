import { useFacilityStore } from "@/src/store/useFacilityStore";
import { Controller, Control, FieldError } from "react-hook-form";
import Select from "react-select";
import { components } from 'react-select';
type Option = {
    value: number | string;
    label: string;
};
type FormSelectProps = {
    name: string;
    label: string;
    required: boolean;
    control: Control;
    options?: Option[];
    classNames?: any;
    placeholder: string;
    error?: FieldError;
    multi?: boolean;
    isLoading?:boolean,
    isDisabled?:boolean
    onFacilityChange?: (value: number | null) => void;
}
export default function FormSelect({ name, label, required, control, options, classNames, placeholder, error, multi, onFacilityChange,isLoading,isDisabled, components }: FormSelectProps) {
    const setFacilityId = useFacilityStore((state) => state.setFacilityId);
    return (
        <div>
            <label className="font-medium text-sm leading-[160%] text-[rgba(71,85,105,1)]">
                {label}{required && <span className="text-[rgba(237,79,157,1)]">*</span>}
            </label>
            <Controller name={name} control={control}
                render={({ field }) => (
                    <Select
                        options={options}
                        classNames={classNames}
                        placeholder={placeholder}
                        value={options?.find(
                            option => option.value === field.value
                        )}
                        onChange={(option: any) => {
                            const value = option?.value ?? null;
                            field.onChange(value);
                            setFacilityId(value);
                            onFacilityChange?.(value);
                            console.log("Selected facilityId:", value);
                        }}
                        isMulti={multi}
                        components={components}
                        isLoading={isLoading}
                        isDisabled={isDisabled}
                    />
                )}
            />
            {error && (
                <p className="text-red-500 text-sm mt-1">
                    {error.message}
                </p>
            )}
        </div>
    )
}