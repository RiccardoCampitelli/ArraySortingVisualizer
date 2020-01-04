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

const Bar = styled.div.attrs(({ height, backgroundColor }) => ({
  style: {
    height: height / 10 + "%" || 0,
    backgroundColor
  }
}))`
  width: 5px;
  margin-right: 5px;
`;

function SortingVisualizer({ array, highlightedBars, animationIndex, isSorted }) {

  const barsToHighlight = highlightedBars.length > 0 ? highlightedBars[animationIndex] : [];

  // const barColor = isSorted ? "purple" : barsToHighlight.includes()

  return (
    <BarsContainer>
      {array.map((bar, index) => (
        <Bar
          height={bar}
          // selected={barsToHighlight.includes(index) ? true : false}
          backgroundColor={isSorted ? "#ca9cff" : barsToHighlight.includes(index) ? "pink" : "lightblue"}
          key={uuid()}
        />
      ))}
    </BarsContainer>
  );
}

export default SortingVisualizer;
