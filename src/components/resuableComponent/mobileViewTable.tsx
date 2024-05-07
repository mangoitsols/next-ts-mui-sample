import { Box, Divider, Grid, Typography } from "@mui/material";
import { Fragment } from "react";
import styles from "../../styles/Dashboard.module.css";
import { viewsType } from "@/types/dashboard.type";

const MobileViewTable = ({
  dataSummary,
  headerArray,
  TdOnClick,
  tableRowStyle,
  totalStyle,
}: viewsType) => {
  return (
    <>
      {dataSummary?.length > 0 ? (
        dataSummary?.map((row: any, index: number) => {
          return (
            <Fragment key={index}>
              <Grid item xs={12}>
                <Box
                  className={styles.tableContainer}
                  sx={{
                    border: !row.highlightedRow
                      ? tableRowStyle?.onMobConditionBasedTableRowStyle
                      : tableRowStyle?.onMobWithoutConditionBasedTableRowStyle,
                  }}
                >
                  {headerArray.map((header: any) => (
                    <Box key={header.label} className={styles.tableRow}>
                      <>
                        <Box
                          className={styles.tableCellHeading}
                          sx={{
                            color: !row.highlightedRow
                              ? header.textColor
                              : header.headerStyle,
                          }}
                        >
                          {header.columnName}
                        </Box>
                        <Box
                          className={styles.tableCellValue}
                          onClick={TdOnClick}
                          sx={{
                            color: !row.highlightedRow && header.textColor,
                          }}
                        >
                          {" "}
                          {row[header.label]}
                        </Box>
                      </>
                    </Box>
                  ))}
                </Box>
                <Box padding={"10px 0"}>
                  <Divider />
                </Box>
              </Grid>
            </Fragment>
          );
        })
      ) : (
        <Box>No data found!</Box>
      )}
      {dataSummary?.length > 0 && totalStyle && totalStyle?.totals && (
        <Box sx={totalStyle.mobViewTableContainerStyle}>
          <Typography sx={totalStyle?.totalTextNameStyle}>
            {totalStyle?.totalTextName}
          </Typography>
          <Box sx={totalStyle?.mobViewTableSubContainerStyle}>
            <Typography sx={totalStyle?.totalLastStyle}>
              {totalStyle?.totals?.totalCurrentHoursSum}
            </Typography>{" "}
            {totalStyle?.totals.totalPreviousHoursSum && (
              <>
                <Typography>/</Typography>
                <Typography sx={totalStyle.totalPreviousStyle}>
                  {" "}
                  {totalStyle?.totals?.totalPreviousHoursSum}
                </Typography>
              </>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default MobileViewTable;
