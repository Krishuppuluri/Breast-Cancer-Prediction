import moment from 'moment';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Divider, Card, Flex, Empty, Modal, Spin } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons'
import { getTimeSegmentDetail, doctorApproveRequest } from '../../api/calendar';
import { readLoginData } from '../../loginData';

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

const getTimeSegmentState = (status) => {
  if(status < 0){
    return 'AlreadyBooked';
  }else if(status > 0){
    return 'PendingApproval';
  }else{
    return 'NotBooked';
  }
};

const getAppointmentState = (status) => {
  if(status < 0){
    return 'Cancelled';
  }else if(status === 1){
    return 'Approved';
  }else{
    return 'PendingApproval';
  }
};

const AppointmentRequest = (props) => {
  const handleClick = () => {
    props.onApprove(props);
  };
  return (
    <Card
      size="small"
      title={props.patient.name}
      extra={(props.status===0) ? <Button onClick={handleClick}>Approve</Button> : undefined}
      style={{ width: 300 }}>
      <p>Status: {getAppointmentState(props.status)}</p>
      <p>{props.description}</p>
    </Card>
  )
}

const AppointmentRequestList = (props) => {
  return <>
    <Flex wrap="wrap" gap="small">
      {
        props.data.length ?
        props.data.map((item) => <AppointmentRequest {...item} onApprove={props.onApprove}/>) :
        <Empty/>
      }
    </Flex>
  </>;
}

const TimeSegmentDetail = (props) => {
  const navigate = useNavigate();
  const segmentId = parseInt(useParams().id);

  const loginData = readLoginData();
  let [ needLoad, setNeedLoad ] = useState(true);
  let [ loading, setLoading] = useState(true);
  let [ data, setData ] = useState({
    id: 0,
    doctor: {
      id: loginData.id,
      name: loginData.name,
    },
    status: -1,
    start: 0,
    end: 1,
    description: 'Loading...',
    requests: [],
  });

  const fetchData = async () => {
    setLoading(true);
    console.log("id", segmentId);
    const response = await getTimeSegmentDetail(loginData, segmentId);
    console.log("response", response);
    setData(response);
    setLoading(false);
  };

  if(needLoad){
    setNeedLoad(false);
    fetchData();
  }

  const handleApprove = (event) => {
    const startString = moment(data.start).format(dateFormat);
    const endString = moment(data.end).format(dateFormat);
    Modal.confirm({
      title: 'Do you confirm your approval of this appointment request?',
      icon: <ExclamationCircleFilled />,
      content: `Patient: ${event.patient.name}\nFrom: ${startString}\nTo:${endString}`,
      onOk: async () => {
        await doctorApproveRequest(loginData, event.id);
        navigate('/calendar');
      },
      onCancel: () => {},
    });
  }
  
  return <div>
      <h1>Check appointment requests</h1>
      Appointment requests from patients are listed below.<br/>
      <Spin spinning={loading}>
        <p>ID: {data.id}</p>
        <p>Doctor Name: {data.doctor.name}</p>
        <p>Start: {moment(data.start).format(dateFormat)}</p>
        <p>End: {moment(data.end).format(dateFormat)}</p>
        <p>Description: {data.description}</p>
        <Divider />
        <h5>Status: {getTimeSegmentState(data.status)}</h5>
        <AppointmentRequestList data={data.requests} onApprove={handleApprove}/>
      </Spin>
    </div>;
};

export default TimeSegmentDetail;
