import { addHours } from "date-fns";
import { Button } from "react-bootstrap";
import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks";

export const FabAddNew = () => {
  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();
  const {  user } = useAuthStore();
  const handleClickNew = () => {
    setActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: "#fafafa",
      user: {
        _id: user.uid,
        name: user.name,
      },
    });
    openDateModal();
  };

  return (
    <Button className="fab" onClick={handleClickNew}>
      <i className="fas fa-plus"></i>
    </Button>
  );
};
