import React from 'react';
import { FaTimes } from 'react-icons/fa';

export default class List extends React.Component {
  render() {
    let stringTime = this.props.nonParsed;
    let time1 = Date.parse(stringTime);
    console.log(time1);
    this.props.calendarEvents.map((item) => {
      console.log(item.title + item.start);
    });
    return (
      <div
        style={{
          width: '50%',
          float: 'right',
          height: '50rem',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            marginTop: '10%',
            height: '50%',
          }}
        >
          <h3>All todos</h3>
          <ul
            style={{
              listStyleType: 'none',
              verticalAlign: 'middle',
              padding: '0',
            }}
          >
            {this.props.calendarEvents.map((item) => {
              return (
                <li>
                  {item.title}
                  <FaTimes
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => this.props.onDelete(item.id)}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <div
          style={{
            margin: 'auto',
            height: '50%',
          }}
        >
          <h3>tasks for {this.props.calendarClick}</h3>
          <ul
            style={{
              listStyleType: 'none',
              verticalAlign: 'middle',
              padding: '0',
            }}
          >
            {this.props.calendarEvents.map((item) => {
              if (item.start.toString() == stringTime) {
                return (
                  <li>
                    {item.title}
                    <FaTimes
                      style={{ color: 'red', cursor: 'pointer' }}
                      onClick={() => this.props.onDelete(item.id)}
                    />
                  </li>
                );
              } else {
                return;
              }
            })}
          </ul>
        </div>
      </div>
    );
  }
}

List.defaultProps = {
  calendarClick: 'shoo',
};
