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

function SortingVisualizer({
  array,
  barsToHighlight,
  isSorted
}) {
  // const barsToHighlight =
  //   highlightedBars.length > 0 ? highlightedBars[animationIndex] : [];

  // const barColor = isSorted ? "purple" : barsToHighlight.includes()
// console.log(barsToHighlight)
  return (
    <BarsContainer>
      {array.map((bar, index) => (
        <Bar
          height={bar}
          backgroundColor={
            isSorted
              ? "#56c936"
              : barsToHighlight.includes(index)
              ? "pink"
              : "lightblue"
          }
          key={uuid()}
        />
      ))}
    </BarsContainer>
  );
}

export default SortingVisualizer;
