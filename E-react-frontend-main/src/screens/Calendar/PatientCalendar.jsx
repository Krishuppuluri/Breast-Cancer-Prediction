import moment from 'moment';
import React, { useState, useCallback } from 'react';
import { Modal, Spin } from 'antd';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { patientGetCalendar } from '../../api/calendar';
import { readLoginData } from '../../loginData';

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

const getAppointmentState = (status) => {
  if(status < 0){
    return 'Cancelled';
  }else if(status === 1){
    return 'Approved';
  }else{
    return 'PendingApproval';
  }
};

const getBackgroundColorFromStatus = (status) => {
  if(status < 0){
    return 'grey';
  }else if(status === 1){
    return 'green';
  }else{
    return 'orange';
  }
}

const getColorFromStatus = (status) => {
  if(status < 0){
    return 'black';
  }else if(status === 1){
    return 'white';
  }else{
    return 'white';
  }
}

const TimeSegmentsView = (props) => {
  const localizer = momentLocalizer(moment);
  console.log("Data", props.data);
  const eventsList = props.data.map(e => ({
    id: e.id,
    title: e.description,
    start: moment(e.start).toDate(),
    end: moment(e.end).toDate(),
    appointmentStatus: e.appointmentStatus,
    rawData: e,
  }));
  const eventStyleGetter = (event, start, end, isSelected) => {
    console.log("event", event);
    return {
      style: {
        backgroundColor: getBackgroundColorFromStatus(event.appointmentStatus),
        borderRadius: '0px',
        opacity: 0.8,
        color: getColorFromStatus(event.appointmentStatus),
        border: '0px',
        display: 'block',
      }
    };
  }

  return (
    <>
      <Calendar
        selectable
        defaultView={Views.WEEK}
        localizer={localizer}
        events={eventsList}
        onRangeChange={props.onRangeChange}
        onSelectEvent={props.onSelectEvent}
        eventPropGetter={eventStyleGetter}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </>
  );
}

const PatientCalendar = (props) => {
  const loginData = readLoginData();
  let [ needLoad, setNeedLoad ] = useState(true);
  let [ loading, setLoading] = useState(true);
  let [ data, setData ] = useState([]);
  let [ currentStart, setCurrentStart ] = useState(moment().startOf('week'));
  let [ currentEnd, setCurrentEnd ] = useState(moment().endOf('week'));

  const setCurrentRange = (start, end) => {
    setCurrentStart(start);
    setCurrentEnd(end);
  }

  const fetchData = async () => {
    setLoading(true);
    setData([]);
    const response = await patientGetCalendar(loginData, currentStart.toDate(), currentEnd.toDate());
    setData(response);
    setLoading(false);
  };

  const handleRangeChange = useCallback((range) => {
    if(!range){
      throw new Error('Unknown range type');
    }

    if(!Array.isArray(range)){
      setCurrentRange(range.start, range.end);
      return;
    }

    if(range.length === 1){
      setCurrentRange(moment(range[0]).startOf('day'), moment(range[0]).endOf('day'));
      return;
    }

    setCurrentRange(moment(range[0]).startOf('week'), moment(range[6]).endOf('week'));
    setNeedLoad(true);
  }, [])

  if(needLoad){
    setNeedLoad(false);
    fetchData();
  }

  const handleSelectEvent = (event) => {
    const data = event.rawData;
    console.log(data);
    const startString = moment(data.start).format(dateFormat);
    const endString = moment(data.end).format(dateFormat);
    Modal.info({
      title: `Your appointment request with ${data.doctor.name}`,
      content: `From: ${startString}\nTo:${endString}\nStatus:${getAppointmentState(data.appointmentStatus)}\nDescription:${data.description}`,
    });
  }

  return <Spin spinning={loading}>
      <TimeSegmentsView data={data} onRangeChange={handleRangeChange} onSelectEvent={handleSelectEvent} />
    </Spin>;
}

export default PatientCalendar;
