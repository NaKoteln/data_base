import { Input } from "reactstrap";

interface GendersSelectorProps {
    category: string;
    onSelected: (id: number) => void;
}

function CategoriesSelector(props: GendersSelectorProps) {
    return (
        <Input
            type="select"
            value={props?.category == "arrival" ? 0 : (props?.category == "departure" ? 1 : undefined) ?? "Выберите категорию"}
            onChange={(e) => props.onSelected(+e.currentTarget.value)}
        >
            <option value={undefined}>
                Не выбрано
            </option>
            <option value={0} key={0}>Arrival</option>
            <option value={1} key={1}>Departure</option>
        </Input>
    );
}

export default CategoriesSelector;
