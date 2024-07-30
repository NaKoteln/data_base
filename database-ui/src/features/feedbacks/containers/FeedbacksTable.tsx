import { ReactNode } from "react";
import { Table } from "reactstrap";

import { Feedback } from "../models";
import ExcursionName from "../../excursions/components/ExcursionName";

interface FeedbacksTableProps {
  feedbacks: Feedback[];
  actionSlot?: (p: Feedback) => ReactNode;
  children?: ReactNode;
}

function FeedbacksTable(props: FeedbacksTableProps) {
  return (
    <>
      {props.children}
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Tourist Id</th>
            <th>Excursion Id</th>
            <th>Excursion name</th>
            <th>Estimation</th>
            <th>Description</th>
            {props.actionSlot && <th></th>}
          </tr>
        </thead>
        <tbody>
          {props.feedbacks.map((f) => (
            <tr key={f.recordId}>
              <td>{f.recordId}</td>
              <td>{f.touristId}</td>
              <td>{f.excursionId}</td>
              <td><ExcursionName excursionId={f.excursionId}/></td>
              <td>{f.estimation}</td>
              <td>{f.description}</td>
              {props.actionSlot && <td>{props.actionSlot(f)}</td>}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default FeedbacksTable;
