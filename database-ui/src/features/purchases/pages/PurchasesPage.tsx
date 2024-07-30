import { useEffect, useState } from "react";
import { Purchase } from "../models";
import { getPurchases } from "../services/purchase-service";
import PurchasesTable from "../containers/PurchasesTable";
import DeletePurchaseBtn from "../components/DeletePurchaseBtn";
import EditPurchaseBtn from "../components/EditPurchaseBtn";

function PurchasesPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  const initPurchases = () => {
    getPurchases().then((data) => setPurchases(data));
  };

  useEffect(() => {
    initPurchases();
  }, []);

  return (
    <>
      <PurchasesTable
        purchases={purchases}
        actionSlot={(p) => (
          <div className="text-end">
            <EditPurchaseBtn purchaseId={p.purchaseId} onChange={initPurchases} />{" "}
            <DeletePurchaseBtn purchaseId={p.purchaseId} onDeleted={initPurchases} />
          </div>
        )}
      >
        <div className="d-flex justify-content-between">
          <h3>Purchases</h3>
          <EditPurchaseBtn onChange={initPurchases} />
        </div>
      </PurchasesTable>
    </>
  );
}

export default PurchasesPage;
