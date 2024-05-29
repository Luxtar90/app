import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const SidebarWrapper = styled.div`
  width: 240px;
  background: #f5f5f7;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;

  &:hover {
    background: #e0e0e0;
    border-radius: 8px;
  }
`;

const MenuText = styled.span`
  margin-left: 10px;
  font-size: 16px;
  color: #333;
`;

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <Logo>
        <Image src="/logo.png" alt="Logo" width={40} height={40} />
        <span>TaskEase</span>
      </Logo>
      <MenuItem>
        <Image src="/home.svg" alt="Home" width={24} height={24} />
        <MenuText>Mi día</MenuText>
      </MenuItem>
      <MenuItem>
        <Image src="/tasks.svg" alt="Tasks" width={24} height={24} />
        <MenuText>Tareas</MenuText>
      </MenuItem>
      <MenuItem>
        <Image src="/completed.svg" alt="Completed" width={24} height={24} />
        <MenuText>Completadas</MenuText>
      </MenuItem>
      <MenuItem>
        <Image src="/calendar.svg" alt="Calendar" width={24} height={24} />
        <MenuText>Calendario</MenuText>
      </MenuItem>
    </SidebarWrapper>
  );
};

export default Sidebar;
