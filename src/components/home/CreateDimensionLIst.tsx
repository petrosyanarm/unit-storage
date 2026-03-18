import { components, MenuListProps } from "react-select";
import { Button } from "@/src/components/ui/button";
import { useDrawerStore } from "@/src/store/useDrawerStore";
export default function CreateDimensionList<OptionType = unknown>(
  props: MenuListProps<OptionType, false>) {
  const { setOpenDimension } = useDrawerStore()
  return (
    <components.MenuList {...props}>
      <div onClick={() => setOpenDimension(true)} className="px-3 py-2 cursor-pointer hover:bg-blue-100">
        <Button
          type="button"
          variant={'destructive'}
          className="text-blue font-semibold "
        >
          Create New Dimensions
        </Button>
      </div>
      {props.children}
    </components.MenuList>
  );
};

