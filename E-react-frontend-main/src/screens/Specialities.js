import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Card, Row, Col } from 'antd';
import { fetchSpecialities } from '../redux/actions/specialitiesActions';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const Specialities = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const specialities = useSelector((state) => state.specialities.specialities);

    // sort specialities based on the first letter
    const sortedSpecialities = [...specialities].sort((a, b) => {
        const first = a.speciality[0].toUpperCase();
        const second = b.speciality[0].toUpperCase();
        return first.localeCompare(second);
    });

    // Update to use searchTerm
    const filteredSpecialities = searchTerm
        ? sortedSpecialities.filter(speciality =>
            speciality.speciality.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : sortedSpecialities;

    useEffect(() => {
        dispatch(fetchSpecialities());
    }, [dispatch]);

    // Handler for search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const groupedSpecialities = groupByInitial(filteredSpecialities);

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ fontSize: '32px', textAlign: 'center', margin: '20px 0' }}>Specialities</h1>
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <input
                    type="text"
                    placeholder="Search specialities..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ padding: '10px', width: '80%', maxWidth: '500px' }}
                />
            </div>
            {Object.entries(groupedSpecialities).map(([initial, group], groupIndex) => (
                <Row gutter={[16, 16]} key={groupIndex} style={groupIndex > 0 ? { marginTop: '20px' } : {}}>

                    <Col span={24} style={{ marginBottom: '10px', fontWeight: 'bold', fontSize: '24px' }}>
                        {initial}
                    </Col>

                    {group.map(speciality => (
                        <Col xs={24} sm={12} md={8} lg={8} xl={6} key={speciality.id}>
                            <Card hoverable={true}>
                                <Link to={speciality.target_link} style={{ textDecoration: 'none' }}>
                                    <Meta
                                        avatar={
                                            <Avatar src={"/images/specialities/" + (speciality.avatar_url ? (speciality.avatar_url + '.png'): "logo192.png")}
                                                size={64} />}
                                        title={<span style={{ whiteSpace: 'normal', overflow: 'visible' }}>{speciality.speciality}</span>}
                                        description={speciality.description ? speciality.description : "No description available"}
                                    />
                                </Link>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ))}
        </div>
    );
};

// Helper function to group specialities by initial
const groupByInitial = (specialities) => {
    return specialities.reduce((acc, curr) => {
        const initial = curr.speciality[0].toUpperCase();
        if (!acc[initial]) {
            acc[initial] = [];
        }
        acc[initial].push(curr);
        return acc;
    }, {});
};

export default Specialities;
