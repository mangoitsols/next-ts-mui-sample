import ResponsiveAppBar from "../layout/header";
import { NoDataYet } from "../../components/fetchComponent/nodatayet";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { UserConfirmModel } from "../../components/fetchComponent/userPopup";
import { primaryColor, textColor } from "@/styles/palatte";
import {
  getSpreadSheetData,
  readSpreadSheet,
  saveSpreadSheetData,
  updateTimeSheetData,
} from "../../api/spreadsheet";
import { ProjectConfirmModel } from "../../components/fetchComponent/projectPopup";
import { TPLConfirmModel } from "../../components/fetchComponent/TPLPopup";
import { getDeveloper } from "../../api/masterdevloper";
import { getProjects } from "../../api/masterProject";
import Spinner from "@/utils/spinner";
import { localStorageGetter } from "../../api/auth";
import { useRouter } from "next/router";
import {
  RemoveAllUnfillData,
  calculateAllHours,
  hasNullActHours,
  saveExcelDataSorted,
  savedTimesheetDataSorted,
  sortUniqueDatesDescending,
  updateTimeSheetDataSorted,
} from "@/utils/saveDataSorted";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { spreadSheetData } from "@/types/fetchDetails.type";
import { formattedNumber, resuableDateFormatter } from "@/utils/formatter";
import styles from "../../styles/Dashboard.module.css";
import { Fragment, createContext, useEffect, useState } from "react";
import Footer from "../layout/footer";
import ButtonComponent from "@/components/resuableComponent/button";
import moment, { now } from "moment-timezone";

const headers = [
  "S.No",
  "Developers",
  "TPL Name",
  "Projects",
  "EST Hours",
  "Act Hours",
];

export const FetchTableContect: any = createContext("");

const FetchTable = () => {
  const [userData, setUserData] = useState();
  const [projectUserData, setProjectUserData] = useState();
  const [projectTLData, setProjectTLData] = useState();
  const [confirmToggle, setConfirmToggle] = useState<boolean>(false);
  const [confirmProjectToggle, setConfirmProjectToggle] =
    useState<boolean>(false);
  const [confirmTLToggle, setConfirmTLToggle] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [loadingConfirm, setLoadingConfirm] = useState<boolean>(false);
  const [spreadData, setSpreadData] = useState<spreadSheetData[]>([]);
  const [headerLabel, setHeaderLabel] = useState("");
  const [timeSheetData, setTimeSheetData] = useState([]);
  const [developerData, setDeveloperData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [totalHours, setTotalHours] = useState<any>({});
  const [yesterdaySheetArray, setYesterdaySheetArray] = useState([]);
  const [yesterdaysDate, setYesterdaysDate] = useState("");

  const router = useRouter();

  const handleGetSpreadSheet = async (
    timeSheetDataPass: any,
    yesterdayDate: any
  ) => {
    const spreadsheetData = await readSpreadSheet();
    if (spreadsheetData?.status === 200) {
      const sheetData = spreadsheetData?.data?.data;
      const sheetNames = sheetData.map((item: any) => Object.keys(item)[0]);
      const checkingNullActHours = hasNullActHours(
        timeSheetDataPass,
        yesterdayDate
      );

      if (sheetNames.includes("Yesterday") && checkingNullActHours) {
        setHeaderLabel("Yesterday Sheet Data");
        const yesterdaySheet = sheetData.filter((item: object) =>
          Object.keys(item).includes("Yesterday")
        );

        let filteredData = RemoveAllUnfillData(yesterdaySheet[0]?.data);
        filteredData = filteredData?.map((data: any, index: number) => {
          return {
            ...data,
            "S.No": index + 1,
            "EST Hours": formattedNumber(data["EST Hours"]),
            "Act Hours": formattedNumber(data["Act Hours"]),
          };
        });
        const totalCurrentHoursSum = calculateAllHours(
          filteredData,
          "EST Hours"
        );
        const totalPreviousHoursSum = calculateAllHours(
          filteredData,
          "Act Hours"
        );
        const substractionofTotal =
          parseFloat(totalCurrentHoursSum) - parseFloat(totalPreviousHoursSum);

        setTotalHours({
          totalPreviousHoursSum: formattedNumber(totalPreviousHoursSum),
          totalCurrentHoursSum: formattedNumber(totalCurrentHoursSum),
          substractionofTotal: formattedNumber(substractionofTotal),
        });
        setSpreadData(filteredData);
        setYesterdaySheetArray(filteredData);
      } else if (sheetNames.includes("Today")) {
        setHeaderLabel("Today's Sheet Data");
        const todaySheet = sheetData.filter((item: object) =>
          Object.keys(item).includes("Today")
        );

        let filteredData = RemoveAllUnfillData(todaySheet[0]?.data);

        const totalCurrentHoursSum = calculateAllHours(
          filteredData,
          "EST Hours"
        );

        setTotalHours({
          totalCurrentHoursSum: formattedNumber(totalCurrentHoursSum),
        });

        filteredData = filteredData?.map((data: any, index: number) => {
          return {
            ...data,
            "S.No": index + 1,
            "EST Hours": formattedNumber(parseFloat(data["EST Hours"])),
          };
        });

        setSpreadData(filteredData);
      }
    }
    setLoading(false);
  };

  const handleGetTimeSheetData = async () => {
    setLoading(true);

    const getDeveloperRes = await handleGetDeveloper();
    const getProjectsRes = await handleGetProjects();
    const timeSheetData = await getSpreadSheetData();
    const gettimeSheetData = timeSheetData?.data?.time_sheet_data;

    let datesArray: any = [];
    gettimeSheetData?.find((res: any) => {
      const ewew: any = resuableDateFormatter(res.date, "YYYY-MM-DD");
      datesArray.push(ewew);
    });
    const dateSorting = sortUniqueDatesDescending(datesArray);
    const todayDateHave = dateSorting.includes(
      resuableDateFormatter(now(), "YYYY-MM-DD")
    );

    const data = savedTimesheetDataSorted(
      gettimeSheetData,
      getDeveloperRes,
      getProjectsRes
    );
    setTimeSheetData(data);
    if (
      timeSheetData &&
      gettimeSheetData?.length > 0 &&
      getDeveloperRes?.length > 0 &&
      getProjectsRes?.length > 0 &&
      todayDateHave
    ) {
      let timesheetStateData = RemoveAllUnfillData(data);

      timesheetStateData = timesheetStateData?.filter((data: any) => {
        return (
          moment(data?.date).format("YYYY-MM-DD") ===
          moment(now()).format("YYYY-MM-DD")
        );
      });
      const totalCurrentHoursSum = calculateAllHours(
        timesheetStateData,
        "EST Hours"
      );
      setTotalHours({
        totalCurrentHoursSum: formattedNumber(totalCurrentHoursSum),
      });
      setSpreadData(timesheetStateData);
      setHeaderLabel("Stored Data");
      setLoading(false);
    } else {
      const yesterdayDate = resuableDateFormatter(
        dateSorting[0],
        "YYYY-MM-DDTHH:mm:ss"
      );
      setYesterdaysDate(yesterdayDate);
      handleGetSpreadSheet(data, yesterdayDate);
    }
  };

  const handleGetDeveloper = async () => {
    const getDeveloperData = await getDeveloper();
    const sortedData = getDeveloperData?.data?.master_developer
      .slice()
      .sort((a: any, b: any) => a.Name.localeCompare(b.Name));
    setDeveloperData(sortedData);
    return sortedData;
  };

  const handleGetProjects = async () => {
    const getProjectsData = await getProjects();
    const sortedData = getProjectsData?.data?.master_project
      .slice()
      .sort((a: any, b: any) => a.Project_name.localeCompare(b.Project_name));
    setProjectData(sortedData);
    return sortedData;
  };

  const getToken = localStorageGetter("mangomis_login_token");

  useEffect(() => {
    if (!getToken) {
      router.push("/login");
    } else {
      handleGetTimeSheetData();
      setHeaderLabel("");
    }
  }, [router, getToken]);

  const handleName = (data: any) => {
    setConfirmToggle(!confirmToggle);
    setUserData(data);
  };

  const handleProjectPopup = (data: any) => {
    setConfirmProjectToggle(!confirmProjectToggle);
    setProjectUserData(data);
  };

  const handleTLPopup = (data: any) => {
    setConfirmTLToggle(!confirmTLToggle);
    setProjectTLData(data);
  };

  const isDeveloperTL = (name: any) => {
    const developer = developerData?.find(
      (developer: any) => developer.Name === name && developer.TL === "true"
    );
    return !!developer;
  };

  const isDeveloper = (name: any) => {
    const developer = developerData?.find(
      (developer: any) => developer.Name === name
    );
    return !!developer;
  };

  const isProjectExist = (name: any) => {
    const project = projectData?.some(
      (project: any) => project.Project_name === name
    );

    return !!project;
  };

  const excelDataSorted = saveExcelDataSorted(
    headerLabel,
    spreadData,
    developerData,
    projectData,
    yesterdaySheetArray
  );

  const handleSaveSpreadSheetData = async () => {
    setSaveLoading(true);
    const response = await saveSpreadSheetData(excelDataSorted);

    if (response.status === 200) {
      toast.success("Timesheet saved successfully");
      handleGetTimeSheetData();

      setTimeout(() => {
        setSaveLoading(false);
      }, 700);
    }
  };

  const hasNullValue: boolean = excelDataSorted?.every((item) => {
    return (
      item.developer_id !== null &&
      item.team_lead_id !== null &&
      item.project_id !== null
    );
  });

  const handleOnClickYesterday = async () => {
    setHeaderLabel("Today's Sheet Data");

    if (timeSheetData?.length > 0) {
      const updatedNullActHours = updateTimeSheetDataSorted(
        timeSheetData,
        developerData,
        projectData,
        yesterdaySheetArray,
        yesterdaysDate
      );

      setLoadingConfirm(true);
      const response = await updateTimeSheetData(updatedNullActHours);
      if (response?.status === 200) {
        setLoadingConfirm(false);
        toast.success("Actual hours confirmed successfully");
      } else {
        handleGetSpreadSheet(timeSheetData, "");
      }
    }
  };

  const compareTotalSum =
    totalHours?.totalCurrentHoursSum < totalHours?.totalPreviousHoursSum &&
    headerLabel === "Yesterday Sheet Data"
      ? primaryColor
      : textColor;

  const buttonStyle: any = {
    variant: "contained",
    style: {
      background: primaryColor,
      "&:hover": {
        borderColor: primaryColor,
        color: primaryColor,
        background: "transparent",
      },
    },
    disabled: !hasNullValue,
    onClick: handleSaveSpreadSheetData,
    buttonName: "SAVE",
    loading: !saveLoading,
  };

  const yesterdayButtonStyle: any = {
    variant: "contained",
    style: {
      background: primaryColor,
      "&:hover": {
        borderColor: primaryColor,
        color: primaryColor,
        background: "transparent",
      },
    },
    disabled: !hasNullValue,
    onClick: handleOnClickYesterday,
    buttonName: "CONFIRM",
    loading: !loadingConfirm,
  };

  return (
    <>
      <Box
        className="fetechDetail"
        sx={{
          width: "100%",
          maxWidth: "1240px",
          margin: "0 auto",
          minHeight: "calc(100vh - 70px)",
        }}
      >
        <FetchTableContect.Provider
          value={{
            yesterdaySheetArray,
            setYesterdaySheetArray,
            spreadData,
            setSpreadData,
            handleGetTimeSheetData,
          }}
        >
          <ResponsiveAppBar />
          {!loading ? (
            spreadData && spreadData.length > 0 ? (
              <>
                <Box
                  className="cal-data"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "40px 0 10px 0",
                    alignItems: "center",
                    padding: "0 10px",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold", color: textColor }}>
                    {headerLabel}
                  </Typography>
                  {headerLabel === "Yesterday Sheet Data" ? (
                    <ButtonComponent data={yesterdayButtonStyle} />
                  ) : (
                    headerLabel === "Today's Sheet Data" && (
                      <ButtonComponent data={buttonStyle} />
                    )
                  )}
                </Box>
                <Divider
                  sx={{
                    display: { xs: "block", sm: "none" },
                  }}
                />
                <TableContainer
                  component={Paper}
                  sx={{
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        {(headerLabel !== "Yesterday Sheet Data"
                          ? headers.slice(0, headers.length - 1)
                          : headers
                        )?.map((header, index: any) => (
                          <TableCell
                            key={index}
                            sx={{ fontWeight: "bold", color: textColor }}
                          >
                            {header}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {spreadData &&
                        spreadData
                          ?.filter((rows) => {
                            return Object.values(rows).every(
                              (value) => value !== ""
                            );
                          })
                          .map((row: any, index: number) => {
                            // check project exists
                            const projectExists = isProjectExist(row.Project);

                            const textColorProject = projectExists
                              ? ""
                              : primaryColor;
                            const CursorPointer = projectExists
                              ? "arrow"
                              : "pointer";
                            const onClickHandler = projectExists
                              ? undefined
                              : () => handleProjectPopup(row);

                            // check developer  tl exists

                            const isDeveloperTLExists = isDeveloperTL(
                              row["TPL Name"]
                            );
                            const textColorTLDev = isDeveloperTLExists
                              ? ""
                              : primaryColor;
                            const CursorPointerTLDev = isDeveloperTLExists
                              ? "arrow"
                              : "pointer";
                            const onClickHandlerTLDev = isDeveloperTLExists
                              ? undefined
                              : () => handleTLPopup(row);

                            // check developer exist
                            const isDeveloperorTLBothExists =
                              isDeveloperTL(row["Team Member Name"]) ||
                              isDeveloper(row["Team Member Name"]);
                            const textColorDev = isDeveloperorTLBothExists
                              ? ""
                              : primaryColor;
                            const CursorPointerDev = isDeveloperorTLBothExists
                              ? "arrow"
                              : "pointer";
                            const onClickHandlerDev = isDeveloperorTLBothExists
                              ? undefined
                              : () => handleName(row);

                            return (
                              <TableRow
                                key={index}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  {index + 1}
                                </TableCell>
                                <TableCell
                                  onClick={onClickHandlerDev}
                                  sx={{
                                    color: textColorDev,
                                    cursor: CursorPointerDev,
                                  }}
                                >
                                  {row["Team Member Name"]}
                                </TableCell>
                                <TableCell
                                  onClick={onClickHandlerTLDev}
                                  sx={{
                                    color: textColorTLDev,
                                    cursor: CursorPointerTLDev,
                                  }}
                                >
                                  {row["TPL Name"]}
                                </TableCell>

                                <TableCell
                                  onClick={onClickHandler}
                                  sx={{
                                    color: textColorProject,
                                    cursor: CursorPointer,
                                  }}
                                >
                                  {row.Project}
                                </TableCell>

                                <TableCell>
                                  {formattedNumber(row["EST Hours"])}
                                </TableCell>

                                {headerLabel === "Yesterday Sheet Data" && (
                                  <TableCell>
                                    {formattedNumber(row["Act Hours"])}
                                  </TableCell>
                                )}
                              </TableRow>
                            );
                          })}
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          align="center"
                          sx={{ fontWeight: "bold", color: textColor }}
                        >
                          Totals
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{ fontWeight: "bold", color: compareTotalSum }}
                        >
                          {formattedNumber(totalHours.totalCurrentHoursSum)}
                          {headerLabel === "Yesterday Sheet Data" &&
                            ` (${totalHours.substractionofTotal})`}
                        </TableCell>
                        {totalHours.totalPreviousHoursSum &&
                          headerLabel === "Yesterday Sheet Data" && (
                            <TableCell
                              align="left"
                              sx={{ fontWeight: "bold", color: textColor }}
                            >
                              {totalHours.totalPreviousHoursSum}
                            </TableCell>
                          )}
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                {/* Mobile view: Each row as a column */}
                <Grid
                  container
                  spacing={1}
                  sx={{
                    display: { sm: "none" },
                    textAlign: "center",
                    margin: "0px",
                    width: "100%",
                  }}
                >
                  {spreadData &&
                    spreadData
                      ?.filter((row: any) =>
                        Object.values(row).every(
                          (value) => value !== "" && value !== null
                        )
                      )
                      ?.map((row: any, i: number) => {
                        // check project exists
                        const projectExists = isProjectExist(row.Project);

                        const textColorProject = projectExists
                          ? ""
                          : primaryColor;
                        const CursorPointer = projectExists
                          ? "arrow"
                          : "pointer";
                        const onClickHandler = projectExists
                          ? undefined
                          : () => handleProjectPopup(row);

                        // check developer  tl exists

                        const isDeveloperTLExists = isDeveloperTL(
                          row["TPL Name"]
                        );
                        const textColorTLDev = isDeveloperTLExists
                          ? ""
                          : primaryColor;
                        const CursorPointerTLDev = isDeveloperTLExists
                          ? "arrow"
                          : "pointer";
                        const onClickHandlerTLDev = isDeveloperTLExists
                          ? undefined
                          : () => handleTLPopup(row);

                        // check developer exist
                        const isDeveloperorTLBothExists =
                          isDeveloperTL(row["Team Member Name"]) ||
                          isDeveloper(row["Team Member Name"]);
                        const textColorDev = isDeveloperorTLBothExists
                          ? ""
                          : primaryColor;
                        const CursorPointerDev = isDeveloperorTLBothExists
                          ? "arrow"
                          : "pointer";
                        const onClickHandlerDev = isDeveloperorTLBothExists
                          ? undefined
                          : () => handleName(row);

                        const lessEstHoursStyle =
                          row["EST Hours"] > row["Act Hours"]
                            ? `${primaryColor}!important`
                            : "";

                        return (
                          <Fragment key={i}>
                            <Grid item xs={12}>
                              <Box className={styles.tableContainer}>
                                <Box className={styles.tableRow}>
                                  <Box className={styles.tableCellHeading}>
                                    S.No
                                  </Box>
                                  <Box className={styles.tableCellValue}>
                                    {i + 1}
                                  </Box>
                                </Box>
                                <Box className={styles.tableRow}>
                                  <Box className={styles.tableCellHeading}>
                                    Team Member Name
                                  </Box>
                                  <Box
                                    className={styles.tableCellValue}
                                    onClick={onClickHandlerDev}
                                    sx={{
                                      color: textColorDev,
                                      cursor: CursorPointerDev,
                                    }}
                                  >
                                    {row["Team Member Name"]}
                                  </Box>
                                </Box>
                                <Box className={styles.tableRow}>
                                  <Box className={styles.tableCellHeading}>
                                    TPL Name
                                  </Box>
                                  <Box
                                    className={styles.tableCellValue}
                                    onClick={onClickHandlerTLDev}
                                    sx={{
                                      color: textColorTLDev,
                                      cursor: CursorPointerTLDev,
                                    }}
                                  >
                                    {row["TPL Name"]}
                                  </Box>
                                </Box>
                                <Box className={styles.tableRow}>
                                  <Box className={styles.tableCellHeading}>
                                    Project
                                  </Box>
                                  <Box
                                    className={styles.tableCellValue}
                                    onClick={onClickHandler}
                                    sx={{
                                      color: textColorProject,
                                      cursor: CursorPointer,
                                    }}
                                  >
                                    {row.Project}
                                  </Box>
                                </Box>
                                <Box className={styles.tableRow}>
                                  <Box className={styles.tableCellHeading}>
                                    Est Hours
                                  </Box>
                                  <Box className={styles.tableCellValue}>
                                    {formattedNumber(row["EST Hours"])}
                                  </Box>
                                </Box>
                                {headerLabel === "Yesterday Sheet Data" && (
                                  <Box className={styles.tableRow}>
                                    <Box
                                      className={styles.tableCellHeading}
                                      sx={{ color: lessEstHoursStyle }}
                                    >
                                      Act Hours
                                    </Box>
                                    <Box
                                      className={styles.tableCellValue}
                                      sx={{ color: lessEstHoursStyle }}
                                    >
                                      {formattedNumber(row["Act Hours"])}
                                    </Box>
                                  </Box>
                                )}
                                <Box sx={{ margin: "3px" }}>
                                  <Divider />
                                </Box>
                              </Box>
                            </Grid>
                          </Fragment>
                        );
                      })}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "10px 5px",
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color: textColor,
                      }}
                    >
                      Totals
                    </Typography>
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          color: compareTotalSum,
                        }}
                      >
                        {headerLabel === "Yesterday Sheet Data" &&
                          `(${totalHours.substractionofTotal}) `}
                        {formattedNumber(totalHours.totalCurrentHoursSum)}
                      </Typography>
                      {totalHours.totalPreviousHoursSum &&
                        headerLabel === "Yesterday Sheet Data" && (
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              color: textColor,
                              float: "right",
                            }}
                          >
                            {formattedNumber(totalHours.totalPreviousHoursSum)}
                          </Typography>
                        )}
                    </Box>
                  </Box>
                </Grid>
                <UserConfirmModel
                  setToggle={setConfirmToggle}
                  toggle={confirmToggle}
                  userInfo={userData}
                  developerArray={developerData}
                  developer_data={handleGetDeveloper}
                />
                <ProjectConfirmModel
                  setToggle={setConfirmProjectToggle}
                  toggle={confirmProjectToggle}
                  projectInfo={projectUserData}
                  projectData={projectData}
                  project_data={handleGetProjects}
                />
                <TPLConfirmModel
                  setToggle={setConfirmTLToggle}
                  toggle={confirmTLToggle}
                  userInfo={projectTLData}
                  TPLArray={developerData}
                  developer_data={handleGetDeveloper}
                />
              </>
            ) : (
              <NoDataYet />
            )
          ) : (
            <Spinner />
          )}
        </FetchTableContect.Provider>
      </Box>
      <Footer />
    </>
  );
};

export default FetchTable;
