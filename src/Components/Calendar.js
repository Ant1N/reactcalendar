import React from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';

export default class Calendar extends React.Component {
  render() {
    return (
      <div style={{ width: '50%', float: 'left' }}>
        <FullCalendar
          ref={this.calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={this.handleDateClick}
          eventContent={renderEventContent}
          events={this.props.calendarEvents}
          firstDay={1}
          timeZone="UTC"
        />
      </div>
    );
  }
  handleDateClick = (arg) => {
    this.props.sendDate(arg.date);
    let eventName = prompt('Name your event');
    if (
      window.confirm(
        `would you like to add event ${eventName} to date ${arg.dateStr}?`
      )
    ) {
      this.props.getNewEvent({
        title: eventName,
        start: arg.date,
        allDay: arg.allDay,
      });
    }
  };
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
