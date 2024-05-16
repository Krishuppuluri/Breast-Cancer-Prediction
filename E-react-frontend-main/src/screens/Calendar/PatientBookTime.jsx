import moment from 'moment';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, DatePicker, Card, Flex, Empty, Modal, Spin } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons'
import { patientSearchForTimeSegments, patientBookTime } from '../../api/calendar';
import dayjs from 'dayjs';
import { readLoginData } from '../../loginData';

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

const AvailableTimeSegment = (props) => {
  const handleClick = () => {
    props.onBookTime(props);
  };
  return <Card size="small" title={props.doctor.name} extra={<Button onClick={handleClick}>Book</Button>} style={{ width: 300 }}>
    <p>Start: {moment(props.start).format(dateFormat)}</p>
    <p>End: {moment(props.end).format(dateFormat)}</p>
    <p>{props.description}</p>
  </Card>
}

const AvailableTimeSegmentList = (props) => {
  return <Flex wrap="wrap" gap="small">
      {
        props.data.length ?
        props.data.map((item) => <AvailableTimeSegment {...item} onBookTime={props.onBookTime}/>) :
        <Empty/>
      }
    </Flex>;
}

const PatientBookTime = (props) => {
  const navigate = useNavigate();

  const loginData = readLoginData();
  let [ needLoad, setNeedLoad ] = useState(true);
  let [ loading, setLoading] = useState(true);
  let [ currentStart, setCurrentStart ] = useState(moment().startOf('week'));
  let [ currentEnd, setCurrentEnd ] = useState(moment().endOf('week'));
  let [ data, setData ] = useState([]);

  const setCurrentRange = (start, end) => {
    setCurrentStart(start);
    setCurrentEnd(end);
  }

  const fetchData = async () => {
    setLoading(true);
    setData([]);
    const response = await patientSearchForTimeSegments(loginData, currentStart.toDate(), currentEnd.toDate());
    setData(response);
    setLoading(false);
  };

  const handleChange = (date) => {
    const start = moment(date.toDate()).startOf('week');
    const end = moment(date.toDate()).endOf('week');
    setCurrentRange(start, end);
    setNeedLoad(true);
  }

  if(needLoad){
    setNeedLoad(false);
    fetchData();
  }

  const handleBookTime = (event) => {
    const startString = moment(event.start).format(dateFormat);
    const endString = moment(event.end).format(dateFormat);
    Modal.confirm({
      title: 'Are you confirming your reservation for this time slot?',
      icon: <ExclamationCircleFilled />,
      content: `Doctor: ${event.doctor.name}\nFrom: ${startString}\nTo:${endString}`,
      onOk: async () => {
        await patientBookTime(loginData, event.id, loginData.name);
        navigate('/calendar');
      },
      onCancel: () => {},
    });
  }

  return <div>
      <h1>Book Time</h1>
      Please select the start and end date below.<br/>
      <DatePicker defaultValue={dayjs(currentStart.toDate())} onChange={handleChange} picker="week" />
      <Spin spinning={loading}>
        <AvailableTimeSegmentList data={data} onBookTime={handleBookTime}/>
      </Spin>
    </div>;
};

export default PatientBookTime;
