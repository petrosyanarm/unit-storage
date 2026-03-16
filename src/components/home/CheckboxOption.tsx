import { Option } from "@/src/table/Types";
import { components,OptionProps } from "react-select";
export default function CheckboxOption(props: OptionProps<Option, true>) {
  return (
    <components.Option {...props}>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          readOnly
          checked={props.isSelected}
          className="w-4 h-4"
        />
        <span>{props.label}</span>
      </div>
    </components.Option>
  );
};