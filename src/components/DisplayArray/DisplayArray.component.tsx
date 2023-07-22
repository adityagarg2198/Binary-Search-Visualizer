import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { StyledCell } from "./DisplayArray.styles";
import { Chip } from "@mui/material";

export interface DisplayArrayProps {
  displayData: number[];
  low?: number;
  mid?: number;
  high?: number;
  showTags?: boolean;
}

const DisplayArray: React.FC<DisplayArrayProps> = ({
  displayData,
  high = 0,
  low = 0,
  mid = 0,
  showTags = false,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead sx={{ width: "100%" }}>
          <TableRow>
            {displayData &&
              displayData.map((dataItem, index) => {
                return (
                  <StyledCell
                    key={`${dataItem.toString()}-${index}`}
                    sx={{ backgroundColor: index % 2 == 0 ? "#F9F5F6" : "#F8E8EE" }}
                  >
                    {dataItem}
                    {displayData[high] === dataItem && showTags ? (
                      <Chip
                        label="high"
                        color="secondary"
                        sx={{ marginX: "2px" }}
                      />
                    ) : null}
                    {displayData[low] === dataItem && showTags ? (
                      <Chip
                        label="low"
                        color="primary"
                        sx={{ marginX: "2px" }}
                      />
                    ) : null}
                    {displayData[mid] === dataItem && showTags ? (
                      <Chip
                        label="mid"
                        color="success"
                        sx={{ marginX: "2px" }}
                      />
                    ) : null}
                  </StyledCell>
                );
              })}
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
};

export default DisplayArray;
