import React from "react";
import uuid from "uuid";

import styled from "styled-components";

const BarsContainer = styled.div`
  background-color: #ebebeb;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 90vh;
  padding-bottom: 5vh;
`;

const Bar = styled.div.attrs(({ height, selected }) => ({
  style: {
    height: height / 10 + "%" || 0,
    backgroundColor: selected ? "pink" : "lightblue"
  }
}))`
  width: 5px;
  margin-right: 5px;
`;

function SortingVisualizer({ array, highlightedBars, animationIndex }) {

  const barsToHighlight = highlightedBars.length > 0 ? highlightedBars[animationIndex] : []

  return (
    <BarsContainer>
      {array.map((bar, index) => (
        <Bar
          height={bar}
          selected={barsToHighlight.includes(index) ? true : false}
          key={uuid()}
        />
      ))}
    </BarsContainer>
  );
}

export default SortingVisualizer;
