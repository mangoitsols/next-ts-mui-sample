export type spreadSheetLinkType = {
  datasheet_link: string;
};

export type saveSpreadSheetDataType = {
  sno: number | null;
  developer_id: number;
  team_lead_id: number;
  project_id: number;
  hours: number | null;
  actual_hours: number | null;
};

export type updateTimeSheetDataType = {
  id: number;
  actual_hours: number;
  date: string;
};
