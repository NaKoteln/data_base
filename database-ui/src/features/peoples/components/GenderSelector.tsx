import { Input } from "reactstrap";

interface GendersSelectorProps {
    gender: boolean;
    onSelected: (id: number) => void;
}

function GendersSelector(props: GendersSelectorProps) {

    return (
        <Input
            type="select"
            value={(props?.gender ? 1 : 0) ?? "Выберите гендер"}
            onChange={(e) => props.onSelected(+e.currentTarget.value)}
        >
            <option value={0} key={0}>Female</option>
            <option value={1} key={1}>Male</option>
        </Input>
    );
}

export default GendersSelector;
