import { primaryColor, tableBorderColor, textColor } from "@/styles/palatte";
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
import { totalHoursOfSummaries } from "@/utils/dashboardPageCommonFunctions";
import styles from "../../styles/Dashboard.module.css";
import TableType from "../tableViewsComponent/tableTypesComponent";
import { totalSum } from "@/types/dashboard.type";
import { formattedNumber } from "@/utils/formatter";

const DashboardDatesDifferent = () => {
  const { dashboardDetails }: any = useContext(DashboardContext);

  const compareTotalHoursForTodays =
    dashboardDetails &&
    dashboardDetails[0]?.totalHours?.previousHours >
      dashboardDetails[0]?.totalHours?.todaysHours;

  const totalTPL: totalSum = totalHoursOfSummaries(
    dashboardDetails[0].tplSummary
  );
  const totalDeveloper: totalSum = totalHoursOfSummaries(
    dashboardDetails[0].developerHours
  );
  const totalProject: totalSum = totalHoursOfSummaries(
    dashboardDetails[0].projectHours
  );

  const totalofProjectSummary: totalSum = totalHoursOfSummaries(
    dashboardDetails[0].projectSummary
  );

  const totalofDeveloperSummary: totalSum = totalHoursOfSummaries(
    dashboardDetails[0].developerSummary
  );

  const headerStyleObject = { fontWeight: "bold", color: textColor };
  const firstNumberColumnObject = {
    borderLeft: `2px solid ${primaryColor} !important `,
    color: primaryColor,
  };
  const rowStyleForComparisionObject = {
    color: primaryColor,
  };
  const lastNumberColumnObject = {
    borderRight: `2px solid ${primaryColor} !important `,
    color: primaryColor,
  };

  const tabularTPLHeader = [
    {
      alignment: "left",
      label: "S.NO.",
      columnName: "S.NO.",
      textColor: "none",
      headerStyle: headerStyleObject,
      rowStyleForComparision: firstNumberColumnObject,
      rowStyle: {
        borderLeft: `none`,
      },
      component: "th",
      scope: "row",
    },
    {
      alignment: "left",
      label: "name",
      columnName: "TPL Name",
      textColor: "none",
      headerStyle: headerStyleObject,
      rowStyleForComparision: rowStyleForComparisionObject,
    },
    {
      alignment: "center",
      label: "todaysHours",
      columnName: dashboardDetails[0].dates.todaysDate,
      textColor: primaryColor,
      headerStyle: headerStyleObject,
      rowStyleForComparision: rowStyleForComparisionObject,
    },
    {
      alignment: "center",
      label: "previousHours",
      columnName: dashboardDetails[0].dates.previousDate,
      textColor: "none",
      rowStyleForComparision: lastNumberColumnObject,
      rowStyle: {
        borderLeft: `none`,
      },
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
      rowStyleForComparision: firstNumberColumnObject,
      rowStyle: {
        borderLeft: `none`,
      },
      component: "th",
      scope: "row",
    },
    {
      alignment: "left",
      label: "name",
      columnName: "Project Name",
      textColor: "none",
      headerStyle: headerStyleObject,
      rowStyleForComparision: rowStyleForComparisionObject,
    },
    {
      alignment: "center",
      label: "todaysHours",
      columnName: dashboardDetails[0].dates.todaysDate,
      textColor: primaryColor,
      headerStyle: headerStyleObject,
      rowStyleForComparision: rowStyleForComparisionObject,
    },
    {
      alignment: "center",
      label: "previousHours",
      columnName: dashboardDetails[0].dates.previousDate,
      textColor: "none",
      headerStyle: headerStyleObject,
      rowStyleForComparision: lastNumberColumnObject,
    },
  ];

  const tabularProjectSummaryHeader = [
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
      rowStyleForComparision: { color: primaryColor },
      textColor: primaryColor,
      headerStyle: headerStyleObject,
    },
    {
      alignment: "center",
      label: "previousHours",
      columnName: dashboardDetails[0].dates.previousDate,

      textColor: "none",
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
      rowStyleForComparision: firstNumberColumnObject,
      rowStyle: {
        borderLeft: `none`,
      },
      component: "th",
      scope: "row",
    },
    {
      alignment: "left",
      label: "name",
      columnName: "Developer Name",

      textColor: "none",
      headerStyle: headerStyleObject,
      rowStyleForComparision: rowStyleForComparisionObject,
    },
    {
      alignment: "center",
      label: "todaysHours",
      columnName: dashboardDetails[0].dates.todaysDate,

      textColor: primaryColor,
      headerStyle: headerStyleObject,
      rowStyleForComparision: rowStyleForComparisionObject,
    },
    {
      alignment: "center",
      label: "previousHours",
      columnName: dashboardDetails[0].dates.previousDate,

      textColor: "none",
      headerStyle: headerStyleObject,
      rowStyleForComparision: lastNumberColumnObject,
    },
  ];

  const tabularDeveloperSummaryHeader = [
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
      rowStyleForComparision: { color: primaryColor },
      textColor: primaryColor,
      headerStyle: headerStyleObject,
    },
    {
      alignment: "center",
      label: "previousHours",
      columnName: dashboardDetails[0].dates.previousDate,
      textColor: "none",
      headerStyle: headerStyleObject,
    },
  ];

  const heightManageForFirstCard =
    dashboardDetails && dashboardDetails[0]?.length > 0 ? "429px" : "auto";

  const withoutConditionBasedTableRowStyle = {
    "& th, & td": {
      borderTop: "none",
      borderBottom: `1px solid ${tableBorderColor}`,
      borderleft: "none",
      borderLeft: "none",
    },
  };

  const conditionBasedTableRowStyle = {
    "& th, & td": {
      borderTop: `2px solid ${primaryColor}`,
      borderBottom: `2px solid ${primaryColor}`,
      borderleft: `0px solid ${primaryColor}`,
      borderLeft: `0px solid ${primaryColor}`,
    },
  };

  const onMobConditionBasedTableRowStyle = {
    border: `2px solid ${primaryColor}`,
  };

  const onMobWithoutConditionBasedTableRowStyle = {
    border: "none",
  };

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

  const tableRowStyle = {
    conditionBasedTableRowStyle,
    withoutConditionBasedTableRowStyle,
    onMobConditionBasedTableRowStyle,
    onMobWithoutConditionBasedTableRowStyle,
  };

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
              padding: "15px",
            }}
          >
            {dashboardDetails[0].dates.todaysDateForTotalHours ? (
              <Box className={styles.date_container}>
                <Box sx={{ marginBottom: "110px" }}>
                  <Typography
                    variant="body2"
                    gutterBottom
                    sx={{
                      fontSize: "x-large",
                      fontWeight: "600",
                      color: textColor,
                      opacity: "0.8",

                      marginRight: "10px",
                    }}
                  >
                    {moment(
                      dashboardDetails[0].dates.todaysDateForTotalHours
                    ).format("DD MMM YYYY")}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "xxx-large",
                      fontWeight: "bold",
                      color: compareTotalHoursForTodays
                        ? primaryColor
                        : textColor,
                      marginRight: "10px",
                    }}
                  >
                    {" "}
                    {dashboardDetails &&
                      formattedNumber(
                        dashboardDetails[0]?.totalHours?.todaysHours
                      )}
                  </Typography>
                </Box>
                <Box className={styles.vertical_line}></Box>

                <Box sx={{ margin: "110px 0px 0px 30px" }}>
                  <Typography
                    variant="body2"
                    gutterBottom
                    sx={{
                      fontSize: "x-large",
                      fontWeight: "600",
                      opacity: "0.8",
                      color: textColor,
                    }}
                  >
                    {dashboardDetails &&
                      moment(
                        dashboardDetails[0].dates.previousDateForTotalHours
                      ).format("DD MMM YYYY")}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "x-large",
                      fontWeight: "bold",
                      color: textColor,
                      marginRight: "10px",
                    }}
                  >
                    {dashboardDetails &&
                      formattedNumber(
                        dashboardDetails[0]?.totalHours?.previousHours
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
          tableRowStyle,
          totalStyle: {
            ...totalStyle,
            totals: totalTPL,
            totalLastStyle: {
              fontWeight: "bold",
              color: totalTPL.compareTotalSum,
            },
          },
        }}
      />

      <TableType
        data={{
          headingName: "Project Summary",
          dataSummary: dashboardDetails[0]?.projectSummary,
          headerArray: tabularProjectSummaryHeader,
          maxHeaderSize: "328px",
          tableRowStyle: {
            ...tableRowStyle,
            onMobConditionBasedTableRowStyle: {},
            conditionBasedTableRowStyle: {},
          },

          totalStyle: {
            ...totalStyle,
            totals: totalofProjectSummary,
            totalLastStyle: {
              fontWeight: "bold",
              color: totalofProjectSummary.compareTotalSum,
            },
          },
        }}
      />

      <TableType
        data={{
          headingName: "Developer Summary",
          dataSummary: dashboardDetails[0]?.developerSummary,
          headerArray: tabularDeveloperSummaryHeader,
          maxHeaderSize: "328px",
          tableRowStyle: {
            ...tableRowStyle,
            onMobConditionBasedTableRowStyle: {},
            conditionBasedTableRowStyle: {},
          },
          totalStyle: {
            ...totalStyle,
            totals: totalofDeveloperSummary,
            totalLastStyle: {
              fontWeight: "bold",
              color: totalofDeveloperSummary.compareTotalSum,
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
          tableRowStyle,
          totalStyle: {
            ...totalStyle,
            totals: totalProject,
            totalLastStyle: {
              fontWeight: "bold",
              color: totalProject.compareTotalSum,
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
          tableRowStyle,
          totalStyle: {
            ...totalStyle,
            totals: totalDeveloper,
            totalLastStyle: {
              fontWeight: "bold",
              color: totalDeveloper.compareTotalSum,
            },
          },
        }}
      />
    </>
  );
};

export default DashboardDatesDifferent;
