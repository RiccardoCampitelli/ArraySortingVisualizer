import React, { useMemo } from "react";
import uuid from "uuid";

import styled from "styled-components";
import useDimensions from "../hooks/useDimensions";

const SORTED_COLOR = "#56c936";
const DEFAULT_COLOR = "lightblue";
const HIGHLIGHT_COLOR = "pink";

const BarsContainer = styled.div`
  background-color: inherit;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 90vh;
  width: 80%;
  padding-bottom: 5vh;
`;

const Bar = styled.div.attrs(({ height, width = 1, backgroundColor }) => ({
  style: {
    height: height / 10 + "%" || 0,
    width: `${width}px`,
    marginRight: `${width}px`,
    backgroundColor
  }
}))`
  /* width: 5px; */
  /* margin-right: 5px; */
`;

function SortingVisualizer({ array, barsToHighlight, isSorted }) {
  const [ref, { width }] = useDimensions();

  const barWidth = useMemo(() => Math.max(width  / (array.length *2), 2), [
    array.length,
    width
  ]);


  return (
    <BarsContainer ref={ref}>
      {array.map((bar, index) => (
        <Bar
          height={bar}
          width={barWidth}
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
