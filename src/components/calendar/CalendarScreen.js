import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es'; //Cambiar idioma al calendario(fechas)

moment.locale('es'); //Cambiar idioma al calendario(fechas)

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
   const dispatch = useDispatch();

   //  Leer los events del store
   const { events, activeEvent } = useSelector((state) => state.calendar);
   const { uid } = useSelector((state) => state.auth);

   const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

   //    efecto para disparar la acción que muestra los eventos
   useEffect(() => {
      dispatch(eventStartLoading());
   }, [dispatch]);

   const onDoubleClick = (e) => {
      //   console.log(e);
      dispatch(uiOpenModal());
   };

   const onSelectEvent = (e) => {
      dispatch(eventSetActive(e));
   };

   const onViewChange = (e) => {
      //al momento de hacer un cambio, guardar y decirle al calendario que inicie desde ahi
      setLastView(e);
      localStorage.setItem('lastView', e);
   };

   const onSelectSlot = (e) => {
      //   console.log(e);
      dispatch(eventClearActiveEvent());
   };

   const eventStyleGetter = (event, start, end, isSelected) => {
      const style = {
         backgroundColor: uid === event.user._id ? '#367CF7' : '#465660',
         borderRadius: '0px',
         opacity: 0.8,
         display: 'block',
         color: 'white',
      };

      return {
         style,
      };
   };

   return (
      <div className='calendar-screen'>
         <Navbar />

         <Calendar
            localizer={localizer}
            events={events}
            startAccessor='start'
            endAccessor='end'
            messages={messages} //mensajes en español
            eventPropGetter={eventStyleGetter} //estilos del evento
            onDoubleClickEvent={onDoubleClick}
            onSelectEvent={onSelectEvent}
            onView={onViewChange}
            onSelectSlot={onSelectSlot}
            selectable={true}
            view={lastView}
            components={{
               event: CalendarEvent,
            }}
         />

         <AddNewFab />

         {
            //  Si el evnto esta activo se muestra el componente(botón eliminar)
            activeEvent && <DeleteEventFab />
         }

         <CalendarModal />
      </div>
   );
};
