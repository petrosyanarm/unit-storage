import { Controller, Control, FieldError } from "react-hook-form";
import Select from "react-select";
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
    multi?: boolean
}
export default function FormSelect({ name, label, required, control, options, classNames, placeholder, error, multi }: FormSelectProps) {
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
                        onChange={option => field.onChange(option?.value ?? null)}
                        isMulti={multi}
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