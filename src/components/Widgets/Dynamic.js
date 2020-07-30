import ToggleButtonGroup from "./ToggleButtonGroup";
import Input from "./Input";
import { useImportMedia } from "@/util/styles";

export default function DynamicWidget({ state, items, ...props }) {
    const isMobile = useImportMedia(im => im.lessThan('tablet'));
    let Component = ToggleButtonGroup;
    if (items.length > 8 || (isMobile && items.length > 3)) {
        Component = Input;
        props.select = true;
    }
    return <Component state={state} items={items} {...props} />;
}