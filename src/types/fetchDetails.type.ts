export type updateUserType = {
  selectedUser: string;
};

export type updateProjectType = {
  selectedProject: string;
};

export type spreadSheetType = {
  ["S.No"]: string;
  ["Team Member Name"]: string;
  ["TPL Name"]: string;
  Project: string;
  Hours: string;
}[];

export type spreadSheet = {
  sheetName: string;
  data: spreadSheetData[];
};

export type spreadSheetData = {
  "S.No": string | null;
  "Team Member Name": string | null;
  "TPL Name": string | null;
  Project: string | null;
  "EST Hours": string | null;
  "Act Hours"?: string | null;
};
