import moment from "moment";
import { formattedNumber } from "./formatter";
import { primaryColor, tableTextColor, textColor } from "@/styles/palatte";

export function rearrangeTheData(data: any) {
  const filteredData = data.filter((rows: any) => {
    return (
      rows["developer_name"] !== undefined &&
      rows["tl_name"] !== undefined &&
      rows["project_name"] !== undefined &&
      rows["hours"] !== undefined &&
      rows["developer_name"] !== "" &&
      rows["tl_name"] !== "" &&
      rows["project_name"] !== "" &&
      rows["hours"] !== undefined &&
      rows["developer_name"] !== null &&
      rows["tl_name"] !== null &&
      rows["project_name"] !== null &&
      rows["hours"] !== undefined
    );
  });

  // Step 1: Group data by date
  const groupedByDate = filteredData.reduce((acc: any, obj: any) => {
    const date = obj.date.split("T")[0];
    acc[date] = acc[date] || [];
    acc[date].push(obj);
    return acc;
  }, {});

  // Step 2: Find the lowest and highest dates
  const dates = Object.keys(groupedByDate).sort();
  const lowestDate = dates[0];
  const highestDate = dates[dates.length - 1];

  // Step 3: Calculate total hours for previous and today's dates
  const totalHoursPreviousDate = Object.values(
    groupedByDate[lowestDate] || []
  ).reduce(
    (acc: any, obj: any) =>
      acc +
      (obj.actual_hours !== null && obj.actual_hours >= 0
        ? obj.actual_hours
        : obj.hours),
    0
  );

  const totalHoursTodayDate = Object.values(
    groupedByDate[highestDate] || []
  ).reduce((acc: any, obj: any) => {
    return (
      acc +
      (obj.actual_hours !== null && obj.actual_hours >= 0
        ? obj.actual_hours
        : obj.hours)
    );
  }, 0);

  // Step 4: Create a set of all project names and developer names
  const allProjectNames: any = new Set();
  const allDeveloperNames: any = new Set();
  Object.values(groupedByDate).forEach((items: any) => {
    items.forEach((item: any) => {
      allProjectNames.add(item.project_name);
      allDeveloperNames.add(item.developer_name);
    });
  });

  // Step 5: Calculate project summary
  const projectsSummary = [...allProjectNames].map((project_name, index) => {
    const previousHours: any = Object.values(groupedByDate[lowestDate] || [])
      .filter((obj: any) => obj.project_name === project_name)
      .reduce(
        (acc: any, obj: any) =>
          acc +
          (obj.actual_hours !== null && obj.actual_hours >= 0
            ? obj.actual_hours
            : obj.hours),
        0
      );
    const todaysHours: any = Object.values(groupedByDate[highestDate] || [])
      .filter((obj: any) => obj.project_name === project_name)
      .reduce(
        (acc: any, obj: any) =>
          acc +
          (obj.actual_hours !== null && obj.actual_hours >= 0
            ? obj.actual_hours
            : obj.hours),
        0
      );
    return {
      name: project_name,
      previousHours: formattedNumber(previousHours),
      todaysHours: formattedNumber(todaysHours),
      highlightedRow: previousHours <= todaysHours,
      highlightedColor:
        previousHours <= todaysHours ? tableTextColor : primaryColor,
      "S.NO.": index + 1,
    };
  });

  // Step 6: Calculate developer summary
  const developerSummary = [...allDeveloperNames].map(
    (developer_name, index) => {
      const previousHours: any = Object.values(groupedByDate[lowestDate] || [])
        .filter((obj: any) => obj.developer_name === developer_name)
        .reduce(
          (acc: any, obj: any) =>
            acc +
            (obj.actual_hours !== null && obj.actual_hours >= 0
              ? obj.actual_hours
              : obj.hours),
          0
        );
      const todaysHours: any = Object.values(groupedByDate[highestDate] || [])
        .filter((obj: any) => obj.developer_name === developer_name)
        .reduce(
          (acc: any, obj: any) =>
            acc +
            (obj.actual_hours !== null && obj.actual_hours >= 0
              ? obj.actual_hours
              : obj.hours),
          0
        );

      return {
        name: developer_name,
        previousHours: formattedNumber(previousHours),
        todaysHours: formattedNumber(todaysHours),
        highlightedRow: previousHours <= todaysHours,
        highlightedColor:
          previousHours <= todaysHours ? tableTextColor : primaryColor,
        "S.NO.": index + 1,
      };
    }
  );

  // Step 7: Create a set of all TPL names
  const allTplNames: any = new Set();
  Object.values(groupedByDate).forEach((items: any) => {
    items.forEach((item: any) => {
      allTplNames.add(item.tl_name);
    });
  });

  // Step 8: Calculate TPL summary
  const tplSummary = [...allTplNames].map((tpl_name, index) => {
    const previousHours: any = Object.values(groupedByDate[lowestDate] || [])
      .filter((obj: any) => obj.tl_name === tpl_name)
      .reduce(
        (acc: any, obj: any) =>
          acc +
          (obj.actual_hours !== null && obj.actual_hours >= 0
            ? obj.actual_hours
            : obj.hours),
        0
      );
    const todaysHours: any = Object.values(groupedByDate[highestDate] || [])
      .filter((obj: any) => obj.tl_name === tpl_name)
      .reduce(
        (acc: any, obj: any) =>
          acc +
          (obj.actual_hours !== null && obj.actual_hours >= 0
            ? obj.actual_hours
            : obj.hours),
        0
      );
    return {
      name: tpl_name,
      previousHours: formattedNumber(previousHours),
      todaysHours: formattedNumber(todaysHours),
      highlightedRow: previousHours <= todaysHours,
      highlightedColor:
        previousHours <= todaysHours ? tableTextColor : primaryColor,
      "S.NO.": index + 1,
    };
  });

  // Step 9: Calculate the formatted dates
  const formattedLowestDate = moment(lowestDate).format("DD-M-YY");
  const formattedHighestDate = moment(highestDate).format("DD-M-YY");

  // Step 10: Calculate project summary for projects with less hours
  const projectsWithLessHours = [...allProjectNames].filter((project_name) => {
    const previousHours: any = Object.values(groupedByDate[lowestDate] || [])
      .filter((obj: any) => obj.project_name === project_name)
      .reduce(
        (acc: any, obj: any) =>
          acc +
          (obj.actual_hours !== null && obj.actual_hours >= 0
            ? obj.actual_hours
            : obj.hours),
        0
      );
    const todaysHours: any = Object.values(groupedByDate[highestDate] || [])
      .filter((obj: any) => obj.project_name === project_name)
      .reduce(
        (acc: any, obj: any) =>
          acc +
          (obj.actual_hours !== null && obj.actual_hours >= 0
            ? obj.actual_hours
            : obj.hours),
        0
      );
    return todaysHours < previousHours;
  });

  const lessHoursProjectSummary = projectsWithLessHours.map(
    (project_name, index) => {
      const previousHours: any = Object.values(groupedByDate[lowestDate] || [])
        .filter((obj: any) => obj.project_name === project_name)
        .reduce(
          (acc: any, obj: any) =>
            acc +
            (obj.actual_hours !== null && obj.actual_hours >= 0
              ? obj.actual_hours
              : obj.hours),
          0
        );
      const todaysHours: any = Object.values(groupedByDate[highestDate] || [])
        .filter((obj: any) => obj.project_name === project_name)
        .reduce(
          (acc: any, obj: any) =>
            acc +
            (obj.actual_hours !== null && obj.actual_hours >= 0
              ? obj.actual_hours
              : obj.hours),
          0
        );
      return {
        name: project_name,
        previousHours: formattedNumber(previousHours),
        todaysHours: formattedNumber(todaysHours),
        highlightedRow: previousHours <= todaysHours,

        "S.NO.": index + 1,
      };
    }
  );

  // Step 11 : Filter developers where todaysHours < previousHours
  const developersWithLessHours = [...allDeveloperNames].filter(
    (developer_name) => {
      const previousHours: any = Object.values(groupedByDate[lowestDate] || [])
        .filter((obj: any) => obj.developer_name === developer_name)
        .reduce(
          (acc: any, obj: any) =>
            acc +
            (obj.actual_hours !== null && obj.actual_hours >= 0
              ? obj.actual_hours
              : obj.hours),
          0
        );
      const todaysHours: any = Object.values(groupedByDate[highestDate] || [])
        .filter((obj: any) => obj.developer_name === developer_name)
        .reduce(
          (acc: any, obj: any) =>
            acc +
            (obj.actual_hours !== null && obj.actual_hours >= 0
              ? obj.actual_hours
              : obj.hours),
          0
        );
      return todaysHours < previousHours;
    }
  );

  const lessHoursDeveloperSummary = developersWithLessHours.map(
    (developer_name, index) => {
      const previousHours: any = Object.values(groupedByDate[lowestDate] || [])
        .filter((obj: any) => obj.developer_name === developer_name)
        .reduce(
          (acc: any, obj: any) =>
            acc +
            (obj.actual_hours !== null && obj.actual_hours >= 0
              ? obj.actual_hours
              : obj.hours),
          0
        );
      const todaysHours: any = Object.values(groupedByDate[highestDate] || [])
        .filter((obj: any) => obj.developer_name === developer_name)
        .reduce(
          (acc: any, obj: any) =>
            acc +
            (obj.actual_hours !== null && obj.actual_hours >= 0
              ? obj.actual_hours
              : obj.hours),
          0
        );
      return {
        name: developer_name,
        previousHours: formattedNumber(previousHours),
        todaysHours: formattedNumber(todaysHours),
        highlightedRow: previousHours <= todaysHours,
        "S.NO.": index + 1,
      };
    }
  );

  // Combine the summary, project summary, developer summary, and TPL summary
  const result = [
    {
      dates: {
        previousDate: formattedLowestDate,
        todaysDate: formattedHighestDate,
        previousDateForTotalHours: lowestDate,
        todaysDateForTotalHours: highestDate,
      },

      totalHours: {
        previousDate: lowestDate,
        previousHours: totalHoursPreviousDate,
        todaysHours: totalHoursTodayDate,
        todaysDate: highestDate,
      },

      projectHours: projectsSummary,
      developerHours: developerSummary,
      tplSummary: tplSummary,
      projectSummary: lessHoursProjectSummary,
      developerSummary: lessHoursDeveloperSummary,
    },
  ];

  return result;
}

export const totalHoursOfSummaries = (timesheetdata: any) => {
  let totalPreviousHoursSum = 0;
  let totalCurrentHoursSum = 0;

  timesheetdata
    ?.filter((row: any) =>
      Object.values(row).every((value) => value !== "" && value !== null)
    )
    .forEach((item: any) => {
      totalPreviousHoursSum += parseFloat(item.previousHours);
    });

  timesheetdata
    ?.filter((row: any) =>
      Object.values(row).every((value) => value !== "" && value !== null)
    )
    .forEach((item: any) => {
      totalCurrentHoursSum += parseFloat(item.todaysHours);
    });

  return {
    totalPreviousHoursSum: formattedNumber(totalPreviousHoursSum),
    totalCurrentHoursSum: formattedNumber(totalCurrentHoursSum),
    compareTotalSum:
      totalPreviousHoursSum > totalCurrentHoursSum ? primaryColor : textColor,
  };
};

export const totalHoursOfOneDateSummaries = (timesheetdata: any) => {
  let totalSum = 0;

  timesheetdata
    ?.filter((row: any) =>
      Object.values(row).every((value) => value !== "" && value !== null)
    )
    .forEach((item: any) => {
      totalSum += parseFloat(item.todaysHours);
    });

  return formattedNumber(totalSum);
};
