import { useEffect, useState } from "react";
import { Feedback } from "../models";
import { getFeedbacks } from "../services/feedback-service";
import FeedbacksTable from "../containers/FeedbacksTable";
import DeleteFeedbackBtn from "../components/DeleteFeedbackBtn";
import EditFeedbackBtn from "../components/EditFeedbackBtn";

function FeedbacksPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  const initFeedbacks = () => {
    getFeedbacks().then((data) => setFeedbacks(data));
  };

  useEffect(() => {
    initFeedbacks();
  }, []);

  return (
    <>
      <FeedbacksTable
        feedbacks={feedbacks}
        actionSlot={(f) => (
          <div className="text-end">
            <EditFeedbackBtn recordId={f.recordId} onChange={initFeedbacks} />{" "}
            <DeleteFeedbackBtn recordId={f.recordId} onDeleted={initFeedbacks} />
          </div>
        )}
      >
        <div className="d-flex justify-content-between">
          <h3>Feedbacks about excursions</h3>
          <EditFeedbackBtn onChange={initFeedbacks} />
        </div>
      </FeedbacksTable>
    </>
  );
}

export default FeedbacksPage;
