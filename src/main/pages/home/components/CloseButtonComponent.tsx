import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  isOpen: boolean;
  ariaLabel: string;
  onClick: () => void;
}

const HamburgerIcon = styled.svg`
  width: 30px;
  height: 30px;
  fill: inherit;
  stroke: inherit;
  padding-top: 10px;
`;

const CloseIcon = styled.svg`
  width: 30px;
  height: 30px;
  fill: inherit;
  stroke: inherit;
  padding-top: 10px;
`;

const CloseButton = styled.button`
  position: fixed;
  top: 10px;
  left: 20px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  z-index: 9999;

  &:focus {
    outline: none;
  }
`;

const CloseButtonComponent: React.FC<ButtonProps> = ({ isOpen, ariaLabel, onClick }) => (
  <CloseButton type="button" aria-label={ariaLabel} onClick={onClick}>
  {isOpen ? (
    <CloseIcon viewBox="0 0 24 24">
      <path d="M5.9 3.6v16.8h1V3.6h-1zm6.6 0v16.8h1V3.6h-1zm6.6 0v16.8h1V3.6h-1z" />
    </CloseIcon>
  ) : (
    <HamburgerIcon viewBox="0 0 24 24">
      <path d="M4 12h16v-2H4v2zm0 5h16v-2H4v2zm0-10h16V5H4v2z" />
    </HamburgerIcon>
  )}
</CloseButton>
);

export default CloseButtonComponent;