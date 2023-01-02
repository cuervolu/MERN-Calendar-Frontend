import { Button } from "react-bootstrap";
import { useCalendarStore } from "../../hooks";

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();
  const handleDelete = () => {
    startDeletingEvent();
  };

  return (
    <Button
      className="fab-danger"
      variant="danger"
      onClick={handleDelete}
      style={{ display: hasEventSelected ? "" : "none" }}
    >
      <i className="fas fa-trash-alt"></i>
    </Button>
  );
};
