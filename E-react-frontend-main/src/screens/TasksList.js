import React, { Component } from "react";
import axios from "axios";
import { Avatar, List, Space, Button, Select } from 'antd';
import { Link } from 'react-router-dom';

const { Option } = Select;

class TasksList extends Component {
    constructor() {
        super();
        this.state = {
            tasks: [],
            filter: 'all', // Default filter option
            positionOptions: 'bottom',
            alignOptions: 'center',
        };
    }

    componentDidMount() {
        this.fetchAllTasks();
    }

    fetchAllTasks = () => {
        axios
            .get(`https://e-react-node-backend-22ed6864d5f3.herokuapp.com/api/users/tasks?filter=${this.state.filter}`)
            .then((response) => {
                this.setState({
                    tasks: response.data,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // Function to handle filter change
    handleFilterChange = (value) => {
        this.setState(
            { filter: value },
            () => this.fetchAllTasks() // Fetch tasks after updating the filter
        );
    };

    render() {
        return (
            <>
                <Space
                    direction="vertical"
                    style={{
                        marginBottom: '20px',
                    }}
                    size="middle"
                >
                    <Space
                        direction="horizontal"
                        style={{
                            justifyContent: 'flex-end',
                            marginRight: '20px',
                        }}
                    >
                        <Select
                            style={{ width: 200 }}
                            value={this.state.filter}
                            onChange={this.handleFilterChange}
                        >
                            <Option value="all">All</Option>
                            <Option value="today">Today</Option>
                            <Option value="week">One Week</Option>
                        </Select>
                        <Link to={`/tasks/0`}>
                            <Button type="primary">Add Task</Button>
                        </Link>
                    </Space>
                </Space>
                <List
                    pagination={{
                        position: this.state.positionOptions,
                        align: this.state.alignOptions,
                        pageSize: 7, // Set the number of tasks per page
                    }}
                    dataSource={this.state.tasks}
                    renderItem={(item, index) => (
                        <List.Item style={{ textAlign: 'center', padding: '20px', fontSize: '20px' }}>
                            <Link to={`/tasks/${item.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                <List.Item.Meta
                                    avatar={
                                        <Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />
                                    }
                                    title={item.FName}
                                    description={`Date:${new Date(item.appointmentTime).getFullYear()}/${new Date(item.appointmentTime).getMonth() + 1}/${new Date(item.appointmentTime).getDate()}`}
                                />
                            </Link>
                        </List.Item>
                    )}
                />
            </>
        );
    }
}

export default TasksList;
