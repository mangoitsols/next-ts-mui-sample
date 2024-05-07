import ButtonSpinner from "@/utils/buttonLoader";
import { Button } from "@mui/material";

interface ButtonComp {
  data: {
    variant: "text" | "outlined" | "contained";
    style: object;
    disabled: boolean;
    onClick: () => void;
    buttonName: string;
    loading: boolean;
    buttonIcon: any;
  };
}

const ButtonComponent = ({ data }: ButtonComp) => {
  return (
    <Button
      variant={data?.variant}
      sx={data?.style}
      disabled={data?.disabled}
      onClick={data?.onClick}
    >
      {!data?.loading && <ButtonSpinner />}
      {data.buttonName}
      {data?.buttonIcon}
    </Button>
  );
};

export default ButtonComponent;
