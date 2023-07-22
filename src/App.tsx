import { SetStateAction, useState } from "react";
import {
  Input,
  Button,
  Box,
  Card,
  Typography,
  FormLabel,
  Backdrop,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import DisplayArray from "./components/DisplayArray/DisplayArray.component";
import BinarySearchVisualizer from "./components/BinarySearchVisualizer/BinarySearchVisualizer.component";

function App() {
  const [arrayItems, setArrayItems] = useState<number[]>([]);
  const [sortedArray, setSortedArray] = useState(false);
  const [visualizeData, setVisualizeData] = useState(false);
  const [visualize, setVisualize] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentValue, setCurrentValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");

  const getSortedArray = () => {
    const tempArray = Array.from(arrayItems);
    return tempArray.sort((a, b) => {
      return a - b;
    });
  };

  const handleInputValue = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setCurrentValue(e.target.value);
  };
  return (
    <>
      <Box
        padding={"30px"}
        display={"flex"}
        alignItems={"flex-start"}
        justifyContent={"space-around"}
        flexDirection={"column"}
        maxWidth={"720px"}
        margin={"0 auto"}
        rowGap={"30px"}
      >
        <Card variant="elevation" sx={{ alignSelf: "center" }}>
          <Box color={"#001C30"} bgcolor={"#F9F5F6"} padding={"15px"}>
            <Typography fontSize={"20px"}>
              Visualize Binary Search for your array
            </Typography>
            <Typography>
              General Instructions for entering array data
              <br />
              1. You can enter upto 10 values in the array
              <br />
              2. Values should be distinct
            </Typography>
          </Box>
        </Card>
        <FormLabel sx={{ color: "#001C30" }}>Enter array values</FormLabel>
        <Box>
          <Input value={currentValue} onChange={handleInputValue} />
          <Button
            disabled={!currentValue || arrayItems.length === 10}
            sx={{ marginX: "10px" }}
            onClick={() => {
              const set = new Set(arrayItems);
              if (isNaN(parseInt(currentValue))) {
                setShowSnackBar(true);
              } else {
                set.add(parseInt(currentValue));
                setArrayItems(Array.from(set));
              }
              setCurrentValue("");
              setSortedArray(false);
              setVisualizeData(false);
              setVisualize(false);
              setSearchValue("");
            }}
          >
            Add Value
          </Button>
          <Button
            disabled={arrayItems.length >= 2 ? false : true}
            onClick={() => {
              setSortedArray(true);
              setVisualize(true);
            }}
          >
            Sort Array
          </Button>
        </Box>
        <DisplayArray displayData={arrayItems} />
        {sortedArray ? <DisplayArray displayData={getSortedArray()} /> : null}
        {visualize ? (
          <>
            <FormLabel sx={{ color: "#001C30" }}>Enter Search value</FormLabel>
            <Box>
              <Input
                value={searchValue}
                onChange={(e) => {
                  setVisualizeData(false);
                  setSearchValue(e.target.value);
                }}
              />
              <Button
                disabled={!searchValue}
                onClick={() => {
                  if (isNaN(parseInt(searchValue))) {
                    setShowSnackBar(true);
                  } else {
                    setLoading(true);
                    setTimeout(() => {
                      setVisualizeData(true);
                      setLoading(false);
                    }, 1500);
                  }
                }}
              >
                Visualize Binary Search
              </Button>
            </Box>
          </>
        ) : null}
      </Box>
      {visualizeData ? (
        <BinarySearchVisualizer
          displayData={getSortedArray()}
          searchingElement={parseInt(searchValue)}
        />
      ) : null}
      {loading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}
      <Snackbar
        open={showSnackBar}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={() => {
          setShowSnackBar(false);
        }}
        message="Can't add characters other then integers"
      />
    </>
  );
}

export default App;
