import React from "react";
import uuid from "uuid";

import styled from "styled-components";

const SORTED_COLOR = "#56c936";
const DEFAULT_COLOR = "lightblue";
const HIGHLIGHT_COLOR = "pink"

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
  
  return (
    <BarsContainer>
      {array.map((bar, index) => (
        <Bar
          height={bar}
          backgroundColor={
            isSorted
              ? SORTED_COLOR
              : barsToHighlight.includes(index)
              ? HIGHLIGHT_COLOR
              : DEFAULT_COLOR
          }
          key={uuid()}
        />
      ))}
    </BarsContainer>
  );
}

export default SortingVisualizer;
