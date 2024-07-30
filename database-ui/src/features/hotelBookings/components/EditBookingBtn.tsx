import {
  createBooking,
  getBooking,
  updateBooking,
} from "../services/booking-service";
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

import { Booking } from "../models";
import TouristsSelector from "../../tourists/components/ToristsSelector";
import HotelsSelector from "../../hotels/components/HotelsSelector";
import { jwtDecode } from "jwt-decode";

const defaultBooking: Omit<Booking, "bookingId"> = {
  hotelId: 0,
  touristId: 0,
  checkInDate: new Date(),
  checkOutDate: new Date(),
};

interface EditBookingBtnProps {
  bookingId?: number;
  onChange: () => void;
}

function EditBookingBtn(props: EditBookingBtnProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [booking, setBooking] = useState<Omit<Booking, "bookingId">>();

  const initBooking = async () => {
    const initValue = props.bookingId
      ? await getBooking(props.bookingId)
      : defaultBooking;
    setBooking(initValue);
  };

  const toggleModalVisibility = () => {
    const visible = !modalVisible;
    setModalVisible(visible);
    if (visible) initBooking();
    else setBooking(undefined);
  };

  const handleSave = async () => {
    if (!booking) return;
    props.bookingId
      ? await updateBooking({ bookingId: props.bookingId, ...booking })
      : await createBooking(booking);
    toggleModalVisibility();
    props.onChange();
  };

  const actionLabel = props.bookingId ? "Update" : "Create";
  const actionColor = props.bookingId ? "warning" : "secondary";

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
          {booking ? (
            <Form>
              <FormGroup>
                <Label>Hotel</Label>
                <HotelsSelector
                  hotelId={booking.hotelId}
                  onSelected={(hotelId) =>
                    setBooking({ ...booking, hotelId: hotelId })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Tourist</Label>
                <TouristsSelector
                  touristId={booking.touristId}
                  onSelected={(touristId) =>
                    setBooking({ ...booking, touristId: touristId })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Check in date</Label>
                <Input
                  type="date"
                  placeholder="date placeholder"
                  value={formatDate(new Date(booking.checkInDate))}
                  onChange={(e) =>
                    setBooking({ ...booking, checkInDate: new Date(e.target.value) })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Check out date</Label>
                <Input
                  type="date"
                  placeholder="date placeholder"
                  value={formatDate(new Date(booking.checkOutDate))}
                  onChange={(e) =>
                    setBooking({ ...booking, checkOutDate: new Date(e.target.value) })
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
          <Button color="primary" disabled={!booking || !booking.touristId || !booking.hotelId} onClick={handleSave}>
            {actionLabel}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default EditBookingBtn;
