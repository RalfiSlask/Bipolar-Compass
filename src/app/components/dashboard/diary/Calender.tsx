import { DayCellMountArg } from '@fullcalendar/core/index.js';
import svLocale from '@fullcalendar/core/locales/sv';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import multiMonthPlugin from '@fullcalendar/multimonth';
import FullCalendar from '@fullcalendar/react';


const Calendar = ({
  dayCellDidMount,
}: {
  dayCellDidMount: (arg: DayCellMountArg) => void;
}) => {
  return (
    <div className="h-full w-full p-4">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, multiMonthPlugin]}
        initialView="dayGridMonth"
        locale={svLocale}
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'multiMonthYear,dayGridMonth,dayGridWeek',
        }}
        buttonText={{
          month: 'Månad',
          week: 'Vecka',
          year: 'År',
        }}
        multiMonthMaxColumns={3}
        selectable={false}
        dayMaxEvents={true}
        weekends={true}
        dayCellDidMount={dayCellDidMount}
        height="80vh"
      />
    </div>
  );
};

export default Calendar;
