import { createItem, updateItem, getItem } from "../services/warehouseItemss-service";
import { useState } from "react";
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "reactstrap";

import { Item } from "../models";
import { jwtDecode } from "jwt-decode";

const defaultItem: Omit<Item, "productId"> = {
    name: "",
    placeNumber: 0,
    weight: 0,
    cost: 0,
    insuranceCost: 0,
    packagingCost: 0,
    receiptDate: new Date(),
    unloadingDate: new Date(),
};

interface EditItemBtnProps {
    productId?: number;
    onChange: () => void;
}

function EditItemBtn(props: EditItemBtnProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const [item, setItem] = useState<Omit<Item, "productId">>();

    const initItem = async () => {
        const initValue = props.productId
            ? await getItem(props.productId)
            : defaultItem;
        setItem(initValue);
    };

    const toggleModalVisibility = () => {
        const visible = !modalVisible;
        setModalVisible(visible);
        if (visible) initItem();
        else setItem(undefined);
    };

    const handleSave = async () => {
        if (!item) return;
        props.productId
            ? await updateItem({ productId: props.productId, ...item })
            : await createItem(item);
        toggleModalVisibility();
        props.onChange();
    };

    const actionLabel = props.productId ? "Update" : "Create";
    const actionColor = props.productId ? "warning" : "secondary";

    const formatDate = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    const token = sessionStorage.getItem("token");
    const user: { role: string } = jwtDecode(token ?? "");
    if (user.role == "reader") return null;

    return (
        <>
            <Button color={actionColor} onClick={toggleModalVisibility}>
                {actionLabel}
            </Button>
            <Modal isOpen={modalVisible} toggle={toggleModalVisibility}>
                <ModalHeader toggle={toggleModalVisibility}>{actionLabel}</ModalHeader>
                <ModalBody>
                    {item ? (
                        <Form>
                            <FormGroup>
                                <Label>Name</Label>
                                <Input value={item.name}
                                    onChange={(e) =>
                                        setItem({ ...item, name: e.target.value })
                                    } />
                            </FormGroup>
                            <FormGroup>
                                <Label>Place number</Label>
                                <Input
                                    type="number"
                                    value={item.placeNumber}
                                    step={5}
                                    onChange={(e) =>
                                        setItem({ ...item, placeNumber: (+e.target.value) })
                                    }
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Weight</Label>
                                <Input
                                    type="number"
                                    value={item.weight}
                                    step={100}
                                    onChange={(e) =>
                                        setItem({ ...item, weight: (+e.target.value) })
                                    }
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Cost</Label>
                                <Input
                                    type="number"
                                    value={item.cost}
                                    step={100}
                                    onChange={(e) =>
                                        setItem({ ...item, cost: (+e.target.value) })
                                    }
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Insurance cost</Label>
                                <Input
                                    type="number"
                                    value={item.insuranceCost}
                                    step={100}
                                    onChange={(e) =>
                                        setItem({ ...item, insuranceCost: (+e.target.value) })
                                    }
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Packaging cost</Label>
                                <Input
                                    type="number"
                                    value={item.packagingCost}
                                    step={100}
                                    onChange={(e) =>
                                        setItem({ ...item, packagingCost: (+e.target.value) })
                                    }
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Receipt date</Label>
                                <Input
                                    type="date"
                                    placeholder="date placeholder"
                                    value={formatDate(new Date(item.receiptDate))}
                                    onChange={(e) =>
                                        setItem({ ...item, receiptDate: new Date(e.target.value) })
                                    }
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Unloadind date</Label>
                                <Input
                                    type="date"
                                    placeholder="date placeholder"
                                    value={formatDate(new Date(item.unloadingDate))}
                                    onChange={(e) =>
                                        setItem({ ...item, unloadingDate: new Date(e.target.value) })
                                    }
                                />
                            </FormGroup>
                        </Form>
                    ) : (
                        "Loading..."
                    )}
                </ModalBody>
                <ModalFooter className="gap-3">
                    <Button color="secondary" onClick={toggleModalVisibility}>
                        Cancel
                    </Button>
                    <Button color="primary" disabled={!item} onClick={handleSave}>
                        {actionLabel}
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default EditItemBtn;
