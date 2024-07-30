import { ReactNode } from "react";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";

import { Hotel } from "../models";

interface HotelsTableProps {
  hotels: Hotel[];
  actionSlot?: (h: Hotel) => ReactNode;
  children?: ReactNode;
}

function HotelsCard(props: HotelsTableProps) {
  return (
    <>
      {props.children}
      {props.hotels.map((h) => (
        <Card key={h.hotelId} className="mb-3">
          <CardBody>
            <CardTitle tag="h5">{h.name}</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              {h.nightCost}
            </CardSubtitle>
            {props.actionSlot?.(h)}
          </CardBody>
        </Card>
      ))}
    </>
  );
}

export default HotelsCard;
