// import * as React from "react"
import { FieldError } from "react-hook-form";

import { cn } from "@/src/lib/utils"
type FormInputProps =  {
  label: string;
  error?: FieldError;
  required?:boolean
};
function Input({ className, type,label,error,required, ...props }: React.ComponentProps<"input"> & FormInputProps) {
  return (
    <div>
      <label className="font-medium text-sm leading-[160%] text-[rgba(71,85,105,1)]">
          {label}{required && <span className="text-[rgba(237,79,157,1)]">*</span>}
        </label>
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground h-14 border-[rgba(226,232,240,1)] placeholder:text-[rgba(148,163,184,1)] selection:bg-primary selection:text-primary-foreground dark:bg-input/30 w-full min-w-0 rounded-xl border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-base",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
        {error && (
          <p className="text-red-500 text-sm mt-1">{error.message}</p>
         )}
    </div>
  )
}

export { Input }
