import { Calendar } from "antd";
import { Moment } from "moment";
import React, { FC } from "react";
import { IEvent } from "../models/IEvent";
import { formateDate } from "../utils/date";

interface EventCalendarProps {
  events: IEvent[];
}

const EventCalendar: FC<EventCalendarProps> = (props) => {
  const dateCellRender = (value: Moment) => {
    const formatedDate = formateDate(value.toDate());
    const currentDateEvent = props.events.filter(
      (ev) => ev.date === formatedDate
    );
    return (
      <div>
        {currentDateEvent.map((ev, id) => (
          <div key={id}>{ev.description}</div>
        ))}
      </div>
    );
  };
  return <Calendar dateCellRender={dateCellRender} />;
};

export default EventCalendar;
