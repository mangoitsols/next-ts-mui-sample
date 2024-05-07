import * as React from "react";
import { Box, Card, CardContent } from "@mui/material";
import { configValidations } from "@/validations/header.validation";
import { ConfigType } from "@/types/header.type";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  getConfigurationDetailsApi,
  readSpreadSheetNames,
  saveSpreadSheetLink,
} from "@/api/spreadsheet";
import ResponsiveAppBar from "../layout/header";
import Footer from "../layout/footer";
import { primaryColor, textColor } from "@/styles/palatte";
import CheckIcon from "@mui/icons-material/Check";
import { toast } from "react-toastify";
import Spinner from "@/utils/spinner";
import ResuableConfigurationComponent from "@/components/configComponent/configComponent";
import {GoogleSheetAccessEmail} from "../../utils/config"

export default function Configuration() {
  const {
    getValues,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<ConfigType>({ resolver: yupResolver(configValidations) });

  const [loading, setLoading] = React.useState<boolean>(false);
  const [sheetNamesLoad, setSheetNamesLoad] = React.useState<boolean>(false);
  const [sheetNames, setSheetNames] = React.useState<[]>([]);
  const [url, setURL] = React.useState("");
  const [sheetNamesUpdate, setSheetNamesUpdate] = React.useState<any>({
    Today: "",
    Yesterday: "",
  });
  const [inputsValue, setInputsValue] = React.useState({
    Today: "",
    Yesterday: "",
  });
  const [showDropdowns, setShowDropdowns] = React.useState<boolean>(false);

  const handleGetConfigurationData = async () => {
    setTimeout(async () => {
      const response = await getConfigurationDetailsApi();
      if (response.status === 200) {
        if (response?.data?.responce?.length > 0) {
          setShowDropdowns(true);
          const data = response?.data?.responce[0];
          handleReadSpreadSheetName({ datasheet_link: data?.datasheet_link });
          const dataSheetNames =
            data?.sheet_names && JSON.parse(data?.sheet_names);
          setValue("url", data?.datasheet_link);

          setURL(data?.datasheet_link);
          setSheetNamesUpdate({
            Today:
              dataSheetNames && dataSheetNames?.length > 0
                ? dataSheetNames[0]?.Today
                : "",
            Yesterday:
              dataSheetNames && dataSheetNames?.length > 0
                ? dataSheetNames[1]?.Yesterday
                : "",
          });
        }
      }
      setSheetNamesLoad(false);
    }, 1000);
  };
  React.useEffect(() => {
    setSheetNamesLoad(true);
    handleGetConfigurationData();
  }, []);

  const handleReadSpreadSheetName = async (reqdata: any) => {
    const result = await readSpreadSheetNames(reqdata);

    if (result.status === 200) {
      setSheetNames(result?.data?.sheetNames);

      return result;
    } else if (result?.response?.status === 400) {
      return result;
    }
  };

  const onSubmit: SubmitHandler<ConfigType> = async (data) => {
    setLoading(true);
    const reqdata = { datasheet_link: data?.url };
    const result: any = await handleReadSpreadSheetName(reqdata);
    if (result.status === 200) {
      setSheetNames(result.data.sheetNames);
      setShowDropdowns(true);
    } else {
      if (result.response.status === 400) {
        setError("url", {
          type: "manual",
          message: result?.response?.data?.message,
        });
      }
    }
    setLoading(false);
  };

  const handleTodayDropdownChange = (event: any) => {
    setSheetNamesUpdate({ ...sheetNamesUpdate, Today: event });
  };

  const handleYesterdayDropdownChange = (event: any) => {
    setSheetNamesUpdate({ ...sheetNamesUpdate, Yesterday: event });
  };

  const handleCancel = () => {
    if (
      (sheetNamesUpdate.Today === "" || sheetNamesUpdate.Yesterday === "") &&
      url !== ""
    ) {
      setValue("url", "");
      setURL("");
    } else {
      setShowDropdowns(false);
      setValue("url", "");
      setURL("");
    }
  };

  const handleSave = async () => {
    setLoading(true);
    const url = getValues("url");
    const reqdata = {
      datasheet_link: url,
      sheet_names: [
        {
          Today: sheetNamesUpdate.Today,
        },
        {
          Yesterday: sheetNamesUpdate.Yesterday,
        },
      ],
    };
    const result = await saveSpreadSheetLink(reqdata);
    if (result.status === 200) {
      toast.success("Datasheets updated successfully");
    } else {
      if (result.response.status === 400) {
        setError("url", {
          type: "manual",
          message: result?.response?.data?.message,
        });
      }
    }
    setLoading(false);
  };

  const handleUrlOnChange = (event: any) => {
    setURL(event?.target.value);
    if (showDropdowns) {
      setShowDropdowns(false);
    }
  };

  const ButtonStyle: any = {
    variant: "",
    style: {
      background: "",
      color: showDropdowns && url !== "" ? "green" : primaryColor,
      "&:hover": {
        color: showDropdowns && url !== "" ? "green" : primaryColor,
      },
      paddingLeft: "10px",
      paddingRight: "3px",
    },
    disabled: loading,
    onClick: !showDropdowns ? handleSubmit(onSubmit) : () => {},
    buttonName: showDropdowns && url !== "" ? "CONNECTED" : "CONNECT",
    loading: !loading,
    buttonIcon:
      showDropdowns && url !== "" ? <CheckIcon sx={{ mb: 1, ml: 1 }} /> : "",
  };

  const CancelStyle: any = {
    variant: "",
    style: {
      color: textColor,
    },
    onClick: handleCancel,
    buttonName: "CANCEL",
    loading: true,
  };

  const SaveStyle: any = {
    variant: "",
    style: {
      color: primaryColor,
    },
    disabled: !sheetNamesUpdate.Today || !sheetNamesUpdate.Yesterday,
    onClick: handleSave,
    buttonName: "SAVE",
    loading: true,
  };

  const reusableComponentData: any = {
    header: {
      sx: { fontWeight: "bold", color: primaryColor },
      email: GoogleSheetAccessEmail,
    },
    typograpy: {
      registerFunction: register,
      registerFunctionUrl: "url",
      url: url,
      onChange: (e: any) => handleUrlOnChange(e),
      errorsObject: errors,
      buttonComponentStyle: ButtonStyle,
    },
    autoComplete: {
      inputLabelName: "Today",
      sheetNamesArray: sheetNames,
      sheetNamesUpdate: sheetNamesUpdate.Today,
      onChange: (event: any, newValue: string | null) => {
        handleTodayDropdownChange(newValue);
      },
      inputValue: inputsValue.Today,
      onInputChange: (event: any, newInputValue: any) =>
        setInputsValue({
          ...inputsValue,
          Today: newInputValue,
        }),
      CancelStyle: CancelStyle,
      SaveStyle: SaveStyle,
    },
    showDropdowns: showDropdowns,
    showHeader: true,
    showTextField: true,
    showSaveButton: false,
  };

  const reusableComponentDataForYesterdayButton: any = {
    autoComplete: {
      inputLabelName: "Yesterday",
      sheetNamesArray: sheetNames,
      sheetNamesUpdate: sheetNamesUpdate.Yesterday,
      onChange: (event: any, newValue: string | null) => {
        handleYesterdayDropdownChange(newValue);
      },
      inputValue: inputsValue.Yesterday,
      onInputChange: (event: any, newInputValue: any) =>
        setInputsValue({
          ...inputsValue,
          Yesterday: newInputValue,
        }),
      CancelStyle: CancelStyle,
      SaveStyle: SaveStyle,
    },
    showDropdowns: showDropdowns,
    showSaveButton: true,
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
        <ResponsiveAppBar />
        <Card sx={{ width: "100%", maxWidth: " 80%", margin: "40px auto" }}>
          {!sheetNamesLoad ? (
            <CardContent
              sx={{
                maxWidth: { xs: "80%", sm: "50%" },
                width: "100%",
                margin: "40px auto",
              }}
            >
              <ResuableConfigurationComponent
                reusableComponentData={reusableComponentData}
              />
              <ResuableConfigurationComponent
                reusableComponentData={reusableComponentDataForYesterdayButton}
              />
            </CardContent>
          ) : (
            <Spinner />
          )}
        </Card>
      </Box>

      <Footer />
    </>
  );
}
