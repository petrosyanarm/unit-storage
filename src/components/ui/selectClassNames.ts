export const selectClassNames = {
  control: ({ isFocused }: { isFocused: boolean }) =>
    `!min-h-[56px] !rounded-xl !border-[rgba(226,232,240,1)] !cursor-pointer ${isFocused ? "!border" : null} !shadow-none !hover:border-blue-400 !mt-2`,
  placeholder: () => "!text-base !text-[rgba(148,163,184,1)]",
  singleValue: () => "text-gray-900 font-medium",
  menu: () => "cursor-pointer rounded-xl mt-2 shadow-lg",
  option: ({
    isFocused,
    isSelected,
  }: {
    isFocused: boolean;
    isSelected: boolean;
  }) =>
    `px-4 py-2 !cursor-pointer transition-colors ${isSelected ? "bg-blue text-white" : ""}
          ${!isSelected && isFocused ? "bg-blue-100" : ""}`,
  indicatorSeparator: () => "hidden",
  valueContainer: () => `flex flex-wrap gap-1 !max-h-[150px] overflow-y-auto`,
  multiValue: () => "!text-white !rounded px-2 py-1",
  multiValueLabel: () => "text-base",
  multiValueRemove: () => "!hover:bg-white",
  
  menuList: () =>
    `
  shadow-[0px_10px_25px_rgba(0,0,0,0.12)]
  cursor-pointer
    max-h-60 overflow-y-auto
    [&::-webkit-scrollbar]:w-2
    [&::-webkit-scrollbar-track]:bg-transparent
    [&::-webkit-scrollbar-thumb]:bg-gray-300
    [&::-webkit-scrollbar-thumb]:rounded-full
    hover:[&::-webkit-scrollbar-thumb]:bg-gray-400
    `,
};
