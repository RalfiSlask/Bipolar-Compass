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
    <div className="h-full w-full">
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
        multiMonthMaxColumns={2}
        selectable={false}
        dayMaxEvents={true}
        weekends={true}
        dayCellDidMount={dayCellDidMount}
        datesSet={(arg) => {
          setTimeout(() => {
            const dayCells = document.querySelectorAll('.fc-daygrid-day');
            dayCells.forEach((cell) => {
              const date = cell.getAttribute('data-date');
              if (date) {
                const dateObj = new Date(date);
                dayCellDidMount({
                  date: dateObj,
                  el: cell as HTMLElement,
                  view: arg.view,
                  dayNumberText: dateObj.getDate().toString(),
                  isPast: dateObj < new Date(),
                  isFuture: dateObj > new Date(),
                  isToday: dateObj.toDateString() === new Date().toDateString(),
                  isOther: false,
                  dow: dateObj.getDay(),
                  isDisabled: false,
                });
              }
            });
          }, 0);
        }}
        height="80vh"
      />
    </div>
  );
};

export default Calendar;
