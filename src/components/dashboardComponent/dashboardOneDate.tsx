import { primaryColor, textColor } from "@/styles/palatte";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { DashboardContext } from "@/pages/dashboard";
import moment from "moment";
import { totalHoursOfOneDateSummaries } from "@/utils/dashboardPageCommonFunctions";
import TableType from "../tableViewsComponent/tableTypesComponent";
import { formattedNumber } from "@/utils/formatter";

const DashboardOneDate = () => {
  const { dashboardDetails }: any = useContext(DashboardContext);

  const totalTPL: any = totalHoursOfOneDateSummaries(
    dashboardDetails && dashboardDetails[0]?.tplSummary
  );
  const totalDeveloper: any = totalHoursOfOneDateSummaries(
    dashboardDetails && dashboardDetails[0].developerHours
  );
  const totalProject: any = totalHoursOfOneDateSummaries(
    dashboardDetails && dashboardDetails[0].projectHours
  );

  const headerStyleObject = { fontWeight: "bold", color: textColor };
  const tabularTPLHeader = [
    {
      alignment: "left",
      label: "S.NO.",
      columnName: "S.NO.",
      textColor: "none",
      headerStyle: headerStyleObject,
      component: "th",
      scope: "row",
    },
    {
      alignment: "left",
      label: "name",
      columnName: "TPL Name",
      textColor: "none",
      headerStyle: headerStyleObject,
    },
    {
      alignment: "center",
      label: "todaysHours",
      columnName: dashboardDetails[0].dates.todaysDate,
      textColor: primaryColor,
      headerStyle: headerStyleObject,
    },
  ];

  const tabularProjectHeader = [
    {
      alignment: "left",
      label: "S.NO.",
      columnName: "S.NO.",
      textColor: "none",
      headerStyle: headerStyleObject,
      component: "th",
      scope: "row",
    },
    {
      alignment: "left",
      label: "name",
      columnName: "Project Name",
      textColor: "none",
      headerStyle: headerStyleObject,
    },
    {
      alignment: "center",
      label: "todaysHours",
      columnName: dashboardDetails[0].dates.todaysDate,
      textColor: primaryColor,
      headerStyle: headerStyleObject,
    },
  ];

  const tabularDeveloperHeader = [
    {
      alignment: "left",
      label: "S.NO.",
      columnName: "S.NO.",
      textColor: "none",
      headerStyle: headerStyleObject,
      component: "th",
      scope: "row",
    },
    {
      alignment: "left",
      label: "name",
      columnName: "Developer Name",
      textColor: "none",
      headerStyle: headerStyleObject,
    },
    {
      alignment: "center",
      label: "todaysHours",
      columnName: dashboardDetails[0].dates.todaysDate,
      textColor: primaryColor,
      headerStyle: headerStyleObject,
    },
  ];

  const mobViewTableContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    margin: "10px 5px",
  };

  const mobViewTableSubContainerStyle = { display: "flex", gap: "0.5rem" };

  const totalStyle = {
    totalTextName: "Totals",
    colspanNumber: 2,
    totalTextNameAlign: "center",
    totalTextNameStyle: { fontWeight: "bold", color: textColor },
    totalPreviousTextAlign: "center",
    totalLastTextAlign: "center",
    totalPreviousStyle: {
      fontWeight: "bold",
      color: textColor,
    },
    mobViewTableContainerStyle,
    mobViewTableSubContainerStyle,
  };

  const heightManageForFirstCard =
    dashboardDetails && dashboardDetails[0]?.length > 0 ? "429px" : "auto";
  return (
    <>
      <Grid item xs={12} md={6}>
        <Card sx={{ height: heightManageForFirstCard, margin: " 0 3px" }}>
          <Box sx={{ padding: "10px 15px" }}>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "bold",
                color: textColor,
                marginBottom: "10px",
              }}
            >
              Summary of Timesheet
            </Typography>
            <Divider />
          </Box>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              height: dashboardDetails[0].dates.todaysDateForTotalHours
                ? "328px"
                : "auto",
            }}
          >
            {dashboardDetails[0].dates.todaysDateForTotalHours ? (
              <Box
                sx={{
                  marginTop: "50px",
                }}
              >
                <Box>
                  <Typography
                    variant="body2"
                    gutterBottom
                    sx={{
                      fontSize: "x-large",
                      fontWeight: "600",
                      color: textColor,
                      opacity: "0.8",
                      marginTop: "50px",
                    }}
                  >
                    {moment(
                      dashboardDetails[0].dates.todaysDateForTotalHours
                    ).format("DD MMM YYYY")}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "xx-large",
                      fontWeight: "bold",
                      color: textColor,
                    }}
                  >
                    {" "}
                    {dashboardDetails &&
                      formattedNumber(
                        dashboardDetails[0]?.totalHours?.todaysHours
                      )}
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Typography align="center">No record found!</Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
      <TableType
        data={{
          headingName: "TPL Summary",
          dataSummary: dashboardDetails[0]?.tplSummary,
          headerArray: tabularTPLHeader,
          maxHeaderSize: "328px",
          totalStyle: {
            ...totalStyle,
            totals: { totalCurrentHoursSum: totalTPL },
            totalLastStyle: {
              fontWeight: "bold",
              color: textColor,
            },
          },
        }}
      />
      <TableType
        data={{
          headingName: "Project Hours",
          dataSummary: dashboardDetails[0]?.projectHours,
          headerArray: tabularProjectHeader,
          maxHeaderSize: "1115px",
          totalStyle: {
            ...totalStyle,
            totals: { totalCurrentHoursSum: totalProject },
            totalLastStyle: {
              fontWeight: "bold",
              color: textColor,
            },
          },
        }}
      />

      <TableType
        data={{
          headingName: "Developer Hours",
          dataSummary: dashboardDetails[0]?.developerHours,
          headerArray: tabularDeveloperHeader,
          maxHeaderSize: "1115px",
          totalStyle: {
            ...totalStyle,
            totals: { totalCurrentHoursSum: totalDeveloper },
            totalLastStyle: {
              fontWeight: "bold",
              color: textColor,
            },
          },
        }}
      />
    </>
  );
};

export default DashboardOneDate;
