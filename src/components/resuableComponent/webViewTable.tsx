import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { viewsType } from "@/types/dashboard.type";

const WebViewTable = ({
  dataSummary,
  headerArray,
  maxHeaderSize,
  TdOnClick,
  tableRowStyle,
  totalStyle,
}: viewsType) => {
  return (
    <>
      {dataSummary?.length > 0 ? (
        <TableContainer
          component={Paper}
          sx={{
            width: "100%",
            overflow: "auto",
            maxHeight: maxHeaderSize ? maxHeaderSize : "",
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {headerArray &&
                  headerArray.length > 0 &&
                  headerArray.map((header: any) => (
                    <TableCell
                      key={header.label}
                      align={header.alignment}
                      sx={header.headerStyle}
                    >
                      {header.columnName}
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {dataSummary.map((row: any, index: number) => {
                return (
                  <TableRow
                    key={index}
                    sx={
                      !row.highlightedRow
                        ? tableRowStyle?.conditionBasedTableRowStyle
                        : tableRowStyle?.withoutConditionBasedTableRowStyle
                    }
                  >
                    {headerArray.map((header: any) => (
                      <TableCell
                        key={header.label}
                        align={header.alignment}
                        sx={
                          row.highlightedRow
                            ? header.rowStyle
                            : header.rowStyleForComparision
                        }
                        onClick={TdOnClick}
                        component={header.component}
                        scope={header.scope}
                      >
                        {row[header.label]}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
              {totalStyle && totalStyle?.totals && (
                <TableRow>
                  <TableCell
                    colSpan={totalStyle?.colspanNumber}
                    align={totalStyle?.totalTextNameAlign}
                    sx={totalStyle?.totalTextNameStyle}
                  >
                    {totalStyle?.totalTextName}
                  </TableCell>
                  <TableCell
                    align={totalStyle?.totalLastTextAlign}
                    sx={totalStyle?.totalLastStyle}
                  >
                    {totalStyle.totals.totalCurrentHoursSum}
                  </TableCell>
                  {totalStyle.totals.totalPreviousHoursSum && (
                    <TableCell
                      align={totalStyle?.totalPreviousTextAlign}
                      sx={totalStyle?.totalPreviousStyle}
                    >
                      {totalStyle.totals.totalPreviousHoursSum}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography align="center">No record found!</Typography>
      )}
    </>
  );
};

export default WebViewTable;
