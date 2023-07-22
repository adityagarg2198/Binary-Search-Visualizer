import { Box, Chip, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import DisplayArray from "../DisplayArray/DisplayArray.component";

const BinarySearchVisualizer: React.FC<{
  displayData: number[];
  searchingElement: number;
}> = ({ displayData, searchingElement }) => {
  const [lowValues, setLowValues] = useState<number[]>([]);
  const [highValues, setHighValues] = useState<number[]>([]);
  const [midValues, setMidValues] = useState<number[]>([]);
  const [foundElement, setFoundElement] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [iteration, setIteration] = useState(0);

  const visualize = useCallback(() => {
    let tempLow = -1;
    let tempHigh = -1;
    let tempMid = -1;
    let itr = 0;
    tempLow = 0;
    tempHigh = displayData.length - 1;
    let tempLowValues = [];
    let tempMidValues = [];
    let tempHighValues = [];
    let elementFound = false;
    while (tempLow <= tempHigh) {
      itr = itr + 1;
      tempLowValues.push(tempLow);
      tempHighValues.push(tempHigh);
      tempMid = Math.floor((tempLow + tempHigh) / 2);
      tempMidValues.push(tempMid);
      if (searchingElement > displayData[tempMid]) {
        tempLow = tempMid + 1;
      }
      if (searchingElement < displayData[tempMid]) {
        tempHigh = tempMid - 1;
      }
      if (searchingElement === displayData[tempMid]) {
        setFoundElement(displayData[tempMid].toString());
        setIsSuccess(true);
        elementFound = true;
        break;
      }
    }
    if (!elementFound) {
      setIsFailure(true);
    }
    setHighValues(tempHighValues);
    setLowValues(tempLowValues);
    setMidValues(tempMidValues);
    setIteration(itr);
  }, []);

  useEffect(() => {
    visualize();
  }, [visualize]);

  return (
    <Box textAlign={"center"} marginBottom={"50px"}>
      {Array.from(new Array(iteration))
        .fill(0)
        .map((_, index) => {
          return (
            <Box
              maxWidth={"920px"}
              margin={"10px auto"}
              display={"flex"}
              flexDirection={"column"}
              rowGap={"10px"}
            >
              <Chip
                label={`Step ${index + 1}`}
                sx={{
                  backgroundColor: "#F2BED1",
                  color: "#001C30",
                  alignSelf: "flex-start",
                }}
              />
              <DisplayArray
                displayData={displayData}
                high={highValues[index]}
                low={lowValues[index]}
                mid={midValues[index]}
                showTags={true}
              />
            </Box>
          );
        })}
      {isSuccess ? (
        <Typography color={"#F2BED1"} fontSize={"20px"}>
          Element Found :{foundElement}
        </Typography>
      ) : null}
      {isFailure ? (
        <Typography color={"#F2BED1"} fontSize={"20px"}>
          Element Not Found
        </Typography>
      ) : null}
    </Box>
  );
};

export default BinarySearchVisualizer;
