import { set } from 'date-fns';
import React from 'react';
import Calendar from './Components/Calendar';
import List from './Components/List';

export default class App extends React.Component {
  state = {
    calendarDateClick: '',
    nonParsedDate: '',
    calendarEvents: [],
  };

  componentWillMount() {
    let getItems = localStorage.getItem('savedEvents');
    let parsedItems = JSON.parse(getItems);
    if (localStorage.getItem('savedEvents') == null) {
      localStorage.setItem('savedEvents', {});
    } else {
      this.setState({
        calendarEvents: parsedItems,
      });
    }
  }

  deleteEvent = (id) => {
    const result = this.state.calendarEvents.filter((event) => event.id !== id);
    this.setState({
      calendarEvents: result,
    });
    localStorage.setItem(
      'savedEvents',
      JSON.stringify(this.state.calendarEvents)
    );
  };

  saveNewEvent = (getEvent) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...getEvent };
    this.setState({
      calendarEvents: [...this.state.calendarEvents, newTask],
    });
    localStorage.setItem(
      'savedEvents',
      JSON.stringify(this.state.calendarEvents)
    );
  };

  visualDate = (date) => {
    let newDate = date.toISOString().split('T')[0];
    this.setState({
      calendarDateClick: newDate,
      nonParsedDate: date,
    });
  };

  render() {
    return (
      <div>
        <Calendar
          calendarEvents={this.state.calendarEvents}
          getNewEvent={this.saveNewEvent}
          sendDate={this.visualDate}
        ></Calendar>
        <List
          calendarEvents={this.state.calendarEvents}
          onDelete={this.deleteEvent}
          calendarClick={this.state.calendarDateClick}
          nonParsed={this.state.nonParsedDate}
        ></List>
      </div>
    );
  }
}
