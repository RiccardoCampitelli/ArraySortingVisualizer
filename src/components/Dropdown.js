import React, { useState } from "react";

import styled from "styled-components";

import uuid from "uuid";

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  margin: auto;
`;

const OptionsContainer = styled.div`
  display: block;
  border-radius: 5px;
  position: absolute;
  background-color: #2b2b2b;
  min-width: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 2;
`;

const DropdownButton = styled.button`
  border: none;
  height: 100%;
  background-color: inherit;
  color: ${props => (props.selected ? "#f7b5b5" : "#e0e0e0")};
  border-bottom: ${props =>
    props.selected ? "3px solid #f7b5b5" : "3px solid #2b2b2b"};
  cursor: pointer;
  &:focus {
    outline: none;
  }

  &:hover {
    color: #f7b5b5;
  }

  transition: all 0.3s ease-in;
`;

const Option = styled.button`
  display: block;
  width: 100%;
  height: 20px;
  background-color: inherit;
  color: #e0e0e0;
  cursor: pointer;

  border: none;

  color: ${props => (props.selected ? "#f7b5b5" : "#e0e0e0")};

  &:focus {
    outline: none;
  }

  &:hover {
    color: #f7b5b5;
  }

  transition: color 0.3s ease-in-out;
`;

const ArrowLabel = styled.span`
  text-align: end;
  font-size: 10px;
  padding-top: 3px;
  padding-left: 3px;
`;

const DownArrow = () => {
  return <ArrowLabel>▼</ArrowLabel>;
};

const Dropdown = ({ options, onOptionClick, selectedAlgorithm }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(open => !open);
  };

  const handleOptionClick = option => {
    onOptionClick(option);
    setOpen(false);
  };

  const selectedAlgorithmName = options.find(x => x.value === selectedAlgorithm).label;

  //TODO: Add click outside listener
  return (
    <>
      <DropdownContainer onMouseLeave={toggleOpen} onMouseEnter={toggleOpen}>
        <DropdownButton open={open}>
          {selectedAlgorithmName} <DownArrow />
        </DropdownButton>
        <OptionsContainer>
          {options &&
            open &&
            options.map(option => (
              <Option
                onClick={() => handleOptionClick(option.value)}
                selected={selectedAlgorithm === option.value}
                key={uuid()}
              >
                {option.label}
              </Option>
            ))}
        </OptionsContainer>
      </DropdownContainer>
    </>
  );
};

export default Dropdown;
