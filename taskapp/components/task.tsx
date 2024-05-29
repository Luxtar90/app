import React from 'react';
import styled from 'styled-components';

const TaskWrapper = styled.div`
  margin: 10px 0;
  padding: 10px;
  background: #fff;
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

interface TaskProps {
  title: string;
  time: string;
}

const Task: React.FC<TaskProps> = ({ title, time }) => {
  return (
    <TaskWrapper>
      <TaskTitle>{title}</TaskTitle>
      <TaskTime>{time}</TaskTime>
    </TaskWrapper>
  );
};

export default Task;
