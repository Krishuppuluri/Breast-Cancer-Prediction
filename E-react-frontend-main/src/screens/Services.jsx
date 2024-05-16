import React, { useEffect } from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import { readLoginData } from '../loginData';

const { Meta } = Card;

const Services = () => {
  const services = [
    
  ];

  const userType = readLoginData().type;
  if(userType==='Doctor'){
    services.push({ name: 'Calendar', link: '/calendar', description: "Doctors and Patients Calendar" });
    services.push({ name: 'Tasks', link: '/TasksList', description: "All Tasks of the Doctor" });
  }else if(userType==='Patient'){
    services.push({ name: 'BookTime', link: '/calendar/booktime', description: "For patients to book doctors' time" });
    services.push({ name: 'Calendar', link: '/calendar', description: "Doctors and Patients Calendar" });
  }

  const groupedServices = ([...services]
    .sort((a, b) => (a.name).localeCompare(b.name))
    .reduce((accum, current) => {
      const initialChar = current.name[0].toUpperCase();
      if(!accum[initialChar]){
        accum[initialChar] = [];
      }
      accum[initialChar].push(current);
      return accum;
    }, {}));

  console.log("services", groupedServices);

  return (
    <div style={{ padding: '20px' }}>
      {
        Object.entries(groupedServices).map(([initialChar, group], groupIndex) => (
          <Row gutter={[16, 16]} key={groupIndex} style={ groupIndex > 0 ? { marginTop: '20px' } : {} }>
            <Col span={24} style={{ marginBottom: '10px', fontWeight: 'bold', fontSize: '24px' }}>{initialChar}</Col>
            {
              group.map(service => (
                <Col xs={24} sm={12} md={8} lg={8} xl={6} key={service.name}>
                  <Card hoverable={true}>
                    <Link to={service.link} style={{ textDecoration: 'none' }}>
                      <Meta
                        title={<span style={{ whiteSpace: 'normal', overflow: 'visible' }}>{service.name}</span>}
                        description={service.description}
                      />
                    </Link>
                  </Card>
                </Col>
              ))
            }
          </Row>
        ))
      }
    </div>
  );
};

export default Services;
