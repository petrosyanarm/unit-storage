import  { components } from "react-select";
export default function CheckboxOption(props: any){
    return (
        <components.Option {...props}>
           <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={props.isSelected}
          className="w-4 h-4"
        />
        <span>{props.label}</span>
      </div>
        </components.Option>
    );
};