import { IDiaryEntry } from '@/app/types/diary';
import { getMoodEmoji } from '@/app/utils/diaryUtils';
import { EventContentArg } from '@fullcalendar/core';
import svLocale from '@fullcalendar/core/locales/sv';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import multiMonthPlugin from '@fullcalendar/multimonth';
import FullCalendar from '@fullcalendar/react';

interface CalendarProps {
  entries: { [key: string]: IDiaryEntry };
  onEntryClick: (date: string) => void;
}

const Calendar = ({ entries, onEntryClick }: CalendarProps) => {
  const renderEventContent = (eventContent: EventContentArg) => {
    const entry = entries[eventContent.event.startStr];
    console.log(entry);
    console.log(getMoodEmoji(entry.mood));
    const isYearView = eventContent.view.type === 'multiMonthYear';

    if (isYearView) {
      return (
        <div className="diary-entry-preview">
          <div className="flex items-center gap-1">
            <span className="diary-mood">{getMoodEmoji(entry.mood)}</span>
            <span className="diary-title truncate">{entry.title}</span>
          </div>
        </div>
      );
    }

    return (
      <div className="diary-entry-preview p-1 flex flex-col gap-1 h-full">
        <div className="flex items-center gap-1">
          <span className="diary-mood">{getMoodEmoji(entry.mood)}</span>
          <span className="diary-title truncate">{entry.title}</span>
        </div>
        <p className="diary-description text-xs truncate">{entry.notes}</p>
      </div>
    );
  };

  // This function is used to map the entries to events.
  // The events are used to display the diary entries in the calendar.
  const events = Object.entries(entries).map(([date, entry]) => ({
    title: entry.title,
    start: date,
    allDay: true,
    display: 'block',
    extendedProps: entry,
  }));

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
          multiMonthYear: 'År',
        }}
        multiMonthMaxColumns={2}
        selectable={true}
        weekends={true}
        events={events}
        eventContent={renderEventContent}
        dateClick={(arg) => onEntryClick(arg.dateStr)}
        eventClick={(arg) => onEntryClick(arg.event.startStr)}
        height="75vh"
        dayMaxEvents={true}
        views={{
          multiMonthYear: {
            dayMaxEvents: 1,
            eventDisplay: 'block',
          },
        }}
      />
    </div>
  );
};

export default Calendar;
