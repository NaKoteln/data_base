import {
  createPurchase,
  getPurchase,
  updatePurchase,
} from "../services/purchase-service";
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

import { Purchase } from "../models";
import TouristsSelector from "../../tourists/components/ToristsSelector";
import ProductsSelector from "../../warehouseItems/components/ProductsSelector";
import { jwtDecode } from "jwt-decode";

const defaultPurchase: Omit<Purchase, "purchaseId"> = {
  touristId: 0,
  productId: 0,
  count: 0,
};

interface EditPurchaseBtnProps {
  purchaseId?: number;
  onChange: () => void;
}

function EditPurchaseBtn(props: EditPurchaseBtnProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [purchase, setPurchase] = useState<Omit<Purchase, "purchaseId">>();

  const initPurchase = async () => {
    const initValue = props.purchaseId
      ? await getPurchase(props.purchaseId)
      : defaultPurchase;
    setPurchase(initValue);
  };

  const toggleModalVisibility = () => {
    const visible = !modalVisible;
    setModalVisible(visible);
    if (visible) initPurchase();
    else setPurchase(undefined);
  };

  const handleSave = async () => {
    if (!purchase) return;
    props.purchaseId
      ? await updatePurchase({ purchaseId: props.purchaseId, ...purchase })
      : await createPurchase(purchase);
    toggleModalVisibility();
    props.onChange();
  };

  const actionLabel = props.purchaseId ? "Update" : "Create";
  const actionColor = props.purchaseId ? "warning" : "secondary";

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
          {purchase ? (
            <Form>
              <FormGroup>
                <Label>Tourist</Label>
                <TouristsSelector
                  touristId={purchase.touristId}
                  onSelected={(touristId) =>
                    setPurchase({ ...purchase, touristId })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Product</Label>
                <ProductsSelector
                  productId={purchase.productId}
                  onSelected={(productId) =>
                    setPurchase({ ...purchase, productId })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Purchase count</Label>
                <Input
                  value={purchase.count}
                  onChange={(e) =>
                    setPurchase({ ...purchase, count: +e.target.value })
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
          <Button color="primary" disabled={!purchase || !purchase.touristId || !purchase.productId} onClick={handleSave}>
            {actionLabel}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default EditPurchaseBtn;
