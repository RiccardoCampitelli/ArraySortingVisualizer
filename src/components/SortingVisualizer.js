import React from "react";

import styled from "styled-components";

const BarsContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 95vh;
`;

const Bar = styled.div`

height: ${props => props.height/10 + "%" || 0};
width: 2px;
margin-right: 2px;
background-color: lightblue;

`;

function SortingVisualizer({array}) {
  return (
    <BarsContainer>
      {array.map(bar => (
        <Bar height={bar} key={bar}/>
      ))}
    </BarsContainer>
  );
}

export default SortingVisualizer;
