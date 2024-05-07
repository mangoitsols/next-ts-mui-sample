export type configurationComponent = {
  header?: {
    sx: Object;
    email: string;
  };
  typograpy?: {
    registerFunction: any;
    registerFunctionUrl: string;
    url: string;
    onChange: () => void;
    errorsObject: any;
    buttonComponentStyle: any;
  };
  autoComplete?: {
    inputLabelName: string;
    sheetNamesArray: [];
    sheetNamesUpdate: string;
    onChange: () => void;
    inputValue: string;
    onInputChange: () => void;
    CancelStyle: any;
    SaveStyle: any;
  };
  showDropdowns: boolean;
  showHeader: boolean;
  showTextField: boolean;
  showSaveButton: boolean;
};
