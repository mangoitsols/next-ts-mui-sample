export type dateAvailable = {
  previousDate: string;
  todaysDate: string;
};

export type totalSum = {
  totalPreviousHoursSum: number | string;
  totalCurrentHoursSum: number | string;
  compareTotalSum: string;
};

export type totalHours = {
  previousDate: string;
  previousHours: number;
  todaysHours: number;
  todaysDate: string;
};

export type projectSummary = {
  project_name: string;
  previousHours: number;
  todaysHours: number;
};

export type developerSummary = {
  developer_name: string;
  previousHours: number;
  todaysHours: number;
};

export type tplSummary = {
  tpl_name: string;
  previousHours: number;
  todaysHours: number;
};

export type developerDetails = {
  dates: dateAvailable;
  totalHours: totalHours;
  projectSummary: projectSummary[];
  developerSummary: developerSummary[];
  tplSummary: tplSummary[];
};

export type tableType = {
  data: any;
};

export type summaryDataType = {
  highlightedColor: string;
  highlightedRow: boolean;
  name: string;
  previousHours: string | number;
  todaysHours: string | number;
};

export type viewTotalObjectType = {
  highlightTotalSum: string;
  totalCurrentHoursSum: string;
  totalPreviousHoursSum: string;
};

export type tableHeaderType = {
  alignment: string;
  label: string;
  columnName: string;
  borderRight: string;
  textColor: string;
  headerStyle: any;
  rowStyle: any;
};

export type totalStyleObjectType = {
  totals: viewTotalObjectType;
  totalTextName: any;
  colspanNumber: number;
  totalTextNameAlign: "left" | "center" | "right" | "inherit" | "justify";
  totalTextNameStyle: any;
  totalPreviousTextAlign: "left" | "center" | "right" | "inherit" | "justify";
  totalPreviousStyle: any;
  totalLastTextAlign: "left" | "center" | "right" | "inherit" | "justify";
  totalLastStyle: any;
  mobViewTableSubContainerStyle?: any;
  mobViewTableContainerStyle?: any;
};

export type tableRowStyle = {
  conditionBasedTableRowStyle?: any;
  withoutConditionBasedTableRowStyle?: any;
  onMobConditionBasedTableRowStyle?: any;
  onMobWithoutConditionBasedTableRowStyle?: any;
};

export type viewsType = {
  dataSummary: summaryDataType[];
  headerArray: tableHeaderType[];
  maxHeaderSize?: string;
  TdOnClick?: () => void;
  tableRowStyle: tableRowStyle;
  conditionBasedTableRowStyle?: any;
  withoutConditionBasedTableRowStyle?: any;
  totalStyle: totalStyleObjectType;
};
