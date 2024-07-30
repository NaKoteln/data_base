import { Input } from "reactstrap";

interface GendersSelectorProps {
    category: string;
    onSelected: (id: number) => void;
}

function CategoriesSelector(props: GendersSelectorProps) {
    return (
        <Input
            type="select"
            value={(props?.category == "child" ? 0 : (props?.category == "shop" ? 1 : (props?.category == "rest" ? 2 : 3))) ?? "Выберите категорию"}
            onChange={(e) => props.onSelected(+e.currentTarget.value)}
        >
            <option value={3} key={3}>Все категории</option>
            <option value={0} key={0}>Child</option>
            <option value={1} key={1}>Shop</option>
            <option value={2} key={2}>Rest</option>
        </Input>
    );
}

export default CategoriesSelector;
