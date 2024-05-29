import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import styled from 'styled-components';

const CalendarWrapper = styled.div`
  margin: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const TaskWrapper = styled.div`
  margin: 10px 0;
  padding: 10px;
  background: #f5f5f7;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const TaskTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 5px;
`;

const TaskTime = styled.p`
  font-size: 14px;
  color: #888;
`;

const Calendar: React.FC = () => {
  const { tasks } = useTaskContext();

  return (
    <CalendarWrapper>
      <h2>Calendario</h2>
      {tasks.map(task => (
        <TaskWrapper key={task.id}>
          <TaskTitle>{task.title}</TaskTitle>
          <TaskTime>{task.time}</TaskTime>
        </TaskWrapper>
      ))}
    </CalendarWrapper>
  );
};

export default Calendar;
