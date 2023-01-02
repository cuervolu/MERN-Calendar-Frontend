import { useDispatch, useSelector } from "react-redux"
import { convertEventsToDateEvents } from "../helpers";
import { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } from "../store";
import Swal from "sweetalert2";
import calendarAPi from "../api/calendarApi";

export const useCalendarStore = () => {
  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector(state => state.calendar);
  const { user } = useSelector(state => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        //Actualizando
        await calendarAPi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }
      //Creando
      const { data } = await calendarAPi.post('/events', calendarEvent);
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }));
    } catch (e) {
      Swal.fire('Error al guardar', e.response.data?.msg, 'error');
    }
  }

  const startDeletingEvent = async () => {
    try {
      await calendarAPi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
      return;
    } catch (e) {
      Swal.fire('Error al guardar', e.response.data?.msg, 'error');
    }

  }

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarAPi.get('/events');
      const events = convertEventsToDateEvents(data.events);
      dispatch(onLoadEvents(events));
    } catch (e) {
      console.error(e);
    }
  }

  return {
    //Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent?.id,
    //Métodos
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startSavingEvent,
  }
}