import { spreadSheet, spreadSheetData } from "@/types/fetchDetails.type";
import moment from "moment";
import { formattedNumber, resuableDateFormatter } from "./formatter";

const confirmExcelDataSorted = (
  SpreadSheetDataArray: any,
  userDataArray: any,
  projectDataArray: any
) => {
  const newArray = SpreadSheetDataArray?.map((item: any) => {
    const developer = userDataArray?.find(
      (user: any) =>
        (user.Name === item["Team Member Name"] && user.TL === "false") ||
        (user.Name === item["Team Member Name"] && user.TL === "true")
    );
    const teamLead = userDataArray?.find(
      (user: any) => user.Name === item["TPL Name"] && user.TL === "true"
    );
    const project = projectDataArray?.find(
      (project: any) => project.Project_name === item.Project
    );

    return {
      developer_id: developer ? developer.Id : null,
      team_lead_id: teamLead ? teamLead.Id : null,
      project_id: project ? project.Id : null,
      hours: parseFloat(item["EST Hours"]),
      actual_hours: null,
    };
  });

  return newArray;
};

export const saveExcelDataSorted = (
  timeSheetData: string,
  spreadsheet: any[],
  userDataArray: any[],
  projectDataArray: any[],
  yestersheet: any[]
) => {
  let buttonAccessible: any[];

  if (timeSheetData === "Today's Sheet Data") {
    buttonAccessible = confirmExcelDataSorted(
      spreadsheet,
      userDataArray,
      projectDataArray
    );
  } else {
    const newArray = yestersheet?.map((yesterdayItem) => {
      const spreadsheetItem = spreadsheet.find(
        (item) => item["S.No"] === yesterdayItem["S.No"]
      );

      const developer = userDataArray.find(
        (user) =>
          (user.Name === yesterdayItem["Team Member Name"] &&
            user.TL === "false") ||
          (user.Name === yesterdayItem["Team Member Name"] &&
            user.TL === "true")
      );
      const teamLead = userDataArray.find(
        (user) => user.Name === yesterdayItem["TPL Name"] && user.TL === "true"
      );
      const project = projectDataArray.find(
        (project) => project.Project_name === yesterdayItem?.Project
      );

      if (spreadsheetItem) {
        return {
          developer_id: developer ? developer.Id : null,
          team_lead_id: teamLead ? teamLead.Id : null,
          project_id: project ? project.Id : null,
          hours: parseFloat(yesterdayItem["EST Hours"]),
          actual_hours: parseFloat(yesterdayItem["Act Hours"]),
        };
      } else {
        return {
          developer_id: developer ? developer.Id : null,
          team_lead_id: teamLead ? teamLead.Id : null,
          project_id: project ? project.Id : null,
          hours: parseFloat(yesterdayItem["EST Hours"]),
          actual_hours: parseFloat(yesterdayItem["Act Hours"]),
        };
      }
    });

    buttonAccessible = newArray;
  }
  return buttonAccessible;
};

export function hasNullActHours(entries: any[], targetDate: string): boolean {
  return entries.some((entry) => {
    const formattedEntryDate = moment(entry.date).format("YYYY-MM-DD");
    const formattedTargetDate = moment(targetDate).format("YYYY-MM-DD");
    return (
      formattedEntryDate === formattedTargetDate && entry["Act Hours"] === null
    );
  });
}

export const updateTimeSheetDataSorted = (
  timesheetData: any,
  userDataArray: any,
  projectDataArray: any,
  googleSheetYesterdayData: any,
  yesterdaysDate: string
) => {
  const yesterdaySheetArray = googleSheetYesterdayData
    .map((gsEntry: any) => {
      const developer = userDataArray.find(
        (user: any) =>
          (user.Name === gsEntry["Team Member Name"] && user.TL === "false") ||
          (user.Name === gsEntry["Team Member Name"] && user.TL === "true")
      );
      const teamLead = userDataArray.find(
        (user: any) => user.Name === gsEntry["TPL Name"] && user.TL === "true"
      );
      const project = projectDataArray.find(
        (project: any) => project.Project_name === gsEntry?.Project
      );

      const matchingEntry = timesheetData.find((entry: any) => {
        return (
          gsEntry["Team Member Name"] === entry["Team Member Name"] &&
          gsEntry["TPL Name"] === entry["TPL Name"] &&
          gsEntry["Project"] === entry["Project"] &&
          resuableDateFormatter(entry.date, "YYYY-MM-DD") ===
            resuableDateFormatter(yesterdaysDate, "YYYY-MM-DD") &&
          entry["Act Hours"] === null
        );
      });

      const notMatchingEntry = timesheetData.find((entry: any) => {
        return (
          gsEntry["Team Member Name"] !== entry["Team Member Name"] &&
          gsEntry["TPL Name"] !== entry["TPL Name"] &&
          gsEntry["Project"] !== entry["Project"] &&
          resuableDateFormatter(entry.date, "YYYY-MM-DD") ===
            resuableDateFormatter(yesterdaysDate, "YYYY-MM-DD")
        );
      });

      if (matchingEntry) {
        return {
          id: matchingEntry["S.No"],
          actual_hours: parseFloat(gsEntry["Act Hours"]),
        };
      } else {
        if (notMatchingEntry) {
          return {
            id: null,
            developer_id: developer ? developer.Id : null,
            team_lead_id: teamLead ? teamLead.Id : null,
            project_id: project ? project.Id : null,
            hours: parseFloat(gsEntry["EST Hours"]),
            date: resuableDateFormatter(yesterdaysDate, "YYYY-MM-DD"),
            actual_hours: gsEntry["Act Hours"]
              ? parseFloat(gsEntry["Act Hours"])
              : 0,
          };
        }
      }
      return matchingEntry;
    })
    .filter(Boolean);

  return yesterdaySheetArray;
};

export const savedTimesheetDataSorted = (
  timesheetdata: any,
  userData: any,
  projectData: any
) => {
  const newArray =
    timesheetdata &&
    timesheetdata?.map((timesheet: any) => {
      // Find developer data
      const developer = userData.find(
        (user: any) => user.Id === timesheet?.developer_id
      );
      const developerName = developer ? developer.Name : "";

      // Find TL data
      const tl = userData.find(
        (user: any) => user.Id === timesheet.team_lead_id
      );
      const tlName = tl ? tl.Name : "";

      // Find project data
      const project = projectData.find(
        (project: any) => project.Id === timesheet.project_id
      );
      const projectName = project ? project.Project_name : "";
      return {
        "S.No": timesheet.id,
        "Team Member Name": developerName,
        "TPL Name": tlName,
        Project: projectName,
        "EST Hours": formattedNumber(timesheet.hours),
        "Act Hours": timesheet.actual_hours
          ? formattedNumber(timesheet.actual_hours)
          : timesheet.actual_hours,
        date: timesheet.date,
      };
    });

  return newArray;
};

export const RemoveAllUnfillData = (data: any) => {
  return data.filter(
    (item: any) =>
      item["Team Member Name"] !== undefined &&
      item["TPL Name"] !== undefined &&
      item["Project"] !== undefined &&
      item["Team Member Name"] !== "" &&
      item["TPL Name"] !== "" &&
      item["Project"] !== "" &&
      item["Team Member Name"] !== null &&
      item["TPL Name"] !== null &&
      item["Project"] !== null
  );
};

export const calculateAllHours = (data: any, key: string) => {
  const totalHours = data.reduce((total: any, obj: any) => {
    // Parse the string value to a float number
    const calHours = parseFloat(obj[key]);
    // Check if the parsed value is a valid number
    if (!isNaN(calHours)) {
      // Add the parsed value to the total
      total += calHours;
    }
    return total;
  }, 0);

  return totalHours;
};

export function sortUniqueDatesDescending(dates: string[]): string[] {
  // Step 1: Sort the array in descending order
  const sortedDates = dates.sort((a, b) => moment(b).diff(moment(a)));

  // Step 2: Convert the sorted array into a Set to remove duplicate values
  const uniqueDatesSet = new Set(sortedDates);

  // Step 3: Convert the Set back to an array to obtain the final result
  const uniqueSortedDates = Array.from(uniqueDatesSet);

  // Return the final result
  return uniqueSortedDates;
}
