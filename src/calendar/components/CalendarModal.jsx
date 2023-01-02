import { useEffect, useMemo, useState } from "react";

import { addYears, setHours, setMinutes } from "date-fns";
import { es } from "date-fns/locale";
import { Button, Container, Form } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import Swal from "sweetalert2";
import Modal from "react-modal";

import "react-datepicker/dist/react-datepicker.css";
import "../styles/modal.css";
import "sweetalert2/dist/sweetalert2.min.css";

import { useCalendarStore, useModal, useUiStore,useAuthStore } from "../../hooks";

registerLocale("es", es);

Modal.setAppElement("#root");

export const CalendarModal = () => {
  const {  user } = useAuthStore();
  
  const { isDateModalOpen, closeDateModal } = useUiStore();
  
  const { activeEvent, startSavingEvent } = useCalendarStore();
  
  const { customStyles, formValues, setFormValues, difference } = useModal();
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const isNotCreator = activeEvent?.user._id !== user.uid || false;

  
  const titleClass = useMemo(() => {
    if (!formSubmitted) return "";

    return formValues.title.length > 0 ? "" : "is-invalid";
  }, [formValues.title, formSubmitted]);

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChanged = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  const onCloseModal = () => {
    closeDateModal();
  };

  const onSubmit = async(event) => {
    event.preventDefault();
    setFormSubmitted(true);

    //Válida si las fechas de inicio y fin son válidas
    if (isNaN(difference) || difference <= 0) {
      Swal.fire("Fechas inválidas", "Revisa tus fechas ingresadas", "error");
      return;
    }

    if (formValues.title.length <= 0) return;

    await startSavingEvent(formValues);
    closeDateModal();
    setFormSubmitted(false);
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <Container>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Fecha y hora inicio</Form.Label>
            <DatePicker
              selected={formValues.start}
              className="form-control"
              onChange={(event) => onDateChanged(event, "start")}
              dateFormat="Pp"
              showTimeSelect
              locale="es"
              timeCaption="Hora"
              disabled={isNotCreator}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Fecha y hora fin</Form.Label>
            <DatePicker
              selected={formValues.end}
              minDate={formValues.start}
              className="form-control"
              onChange={(event) => onDateChanged(event, "end")}
              dateFormat="Pp"
              showTimeSelect
              locale="es"
              timeCaption="Hora"
              minTime={setHours(
                setMinutes(new Date(), formValues.start.getMinutes()),
                formValues.start.getHours()
              )}
              maxTime={setHours(setMinutes(addYears(new Date(), 1000), 30), 23)} 
              disabled={isNotCreator}
            />
          </Form.Group>

          <hr />
          <Form.Group className="mb-2">
            <Form.Label>Titulo y notas</Form.Label>
            <Form.Control
              type="text"
              placeholder="Título del evento"
              name="title"
              autoComplete="off"
              value={formValues.title}
              onChange={onInputChanged}
              required
              className={titleClass}
              disabled={isNotCreator}
            />
            <Form.Text id="emailHelp" className="text-muted">
              Una descripción corta
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control
              as="textarea"
              type="text"
              placeholder="Notas"
              rows="5"
              name="notes"
              value={formValues.notes}
              onChange={onInputChanged}
              disabled={isNotCreator}
            ></Form.Control>
            <Form.Text id="emailHelp" className="text-muted">
              Información adicional
            </Form.Text>
          </Form.Group>

          <Button variant="outline-primary" type="submit" size="lg" disabled={isNotCreator}>
            <i className="far fa-save"></i>
            <span> Guardar</span>
          </Button>
        </Form>
      </Container>
    </Modal>
  );
};
