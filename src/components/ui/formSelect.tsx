import { useFacilityStore } from "@/src/store/useFacilityStore";
import { Option } from "@/src/table/Types";
import { FieldValues,Controller, Control, FieldError } from "react-hook-form";
import Select, { ClassNamesConfig,ComponentsConfig, GroupBase } from "react-select";

type FormSelectProps<T extends FieldValues,OptionType=Option> = {
    name: keyof T;
    label: string;
    required: boolean;
    control: Control<T>;
    options?: Option[];
    classNames?: ClassNamesConfig<Option, boolean>;
    placeholder: string;
    error?: FieldError | undefined;
    multi?: boolean;
    isLoading?:boolean,
    isDisabled?:boolean
    onFacilityChange?: (value: number | null) => void;
    components?:ComponentsConfig<OptionType, boolean, GroupBase<OptionType>>
}
export default function FormSelect({ name, label, required, control, options, classNames, placeholder, error, multi, onFacilityChange,isLoading,isDisabled, components }: FormSelectProps<T>) {
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
                        onChange={(option:any) => {
                            const value = option?.value ?? null;
                            field.onChange(value);
                            setFacilityId(value);
                            onFacilityChange?.(value);
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