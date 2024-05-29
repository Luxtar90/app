import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  width: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const IconGroup = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  margin-left: 20px;
  cursor: pointer;
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <SearchInput type="text" placeholder="Buscar" />
      <IconGroup>
        <IconWrapper>
          <Image src="/campana.png" alt="Notifications" width={24} height={24} />
        </IconWrapper>
        <IconWrapper>
          <Image src="/calendario.png" alt="Calendar" width={24} height={24} />
        </IconWrapper>
        <IconWrapper>
          <Image src="/profile.png" alt="Profile" width={24} height={24} />
        </IconWrapper>
      </IconGroup>
    </HeaderWrapper>
  );
};

export default Header;
