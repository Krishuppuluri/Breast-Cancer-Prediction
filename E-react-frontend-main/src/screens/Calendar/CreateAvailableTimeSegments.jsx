import moment from 'moment';
import React, { useState } from 'react';
import { Modal } from 'antd';

import { doctorCreateAvailableTimeSegment } from '../../api/calendar';
import { readLoginData } from '../../loginData';

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

const ModalContent = (props) => {
  const start = moment(props.start).format(dateFormat);
  const end = moment(props.end).format(dateFormat);
  const onStart = (e) => {
    props.onChange({ start: e.target.value });
  };
  const onEnd = (e) => {
    props.onChange({ end: e.target.value });
  };
  const onDescription = (e) => {
    props.onChange({ description: e.target.value });
  };
  
  return <>
    <form>
      <label for="doctor">Doctor:</label><br/>
      <input type="text" id="doctor" name="doctor" value={props.doctor} disabled/><br/>
      <label for="start">Start:</label><br/>
      <input type="text" id="start" name="start" value={start} onChange={onStart}/><br/>
      <label for="end">End:</label><br/>
      <input type="text" id="end" name="end" value={end} onChange={onEnd}/><br/>
      <label for="description">Descrption:</label><br/>
      <input type="text" id="description" name="description" value={props.description} onChange={onDescription}/><br/>
    </form>
  </>;
};

const CreateAvailableTimeSegments = (props) => {
  const loginData = readLoginData();

  const [ formContent, setFormContent ] = useState({
    start: props.start,
    end: props.end,
    description: loginData.name,
  });

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleFormChange = (change) => {
    setFormContent({...formContent, ...change});
  }

  const handleOk = () => {
    setConfirmLoading(true);
    (async () => {
      await doctorCreateAvailableTimeSegment(
        loginData,
        moment(formContent.start).toDate(),
        moment(formContent.end).toDate(),
        formContent.description);
      props.onOk();
    })();
  };

  return (
    <Modal
      title="Create Available Time Segments"
      open={true}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={props.onCancel}
    >
      <ModalContent
        doctor={loginData.name}
        start={formContent.start}
        end={formContent.end}
        description={formContent.description}
        onChange={handleFormChange}/>
    </Modal>
  );
};

export default CreateAvailableTimeSegments;
