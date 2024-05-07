import { createTheme } from "@mui/material";
import moment from "moment";

export const formattedNumber = (number: any) => {
  const floatValue = parseFloat(number);
  if (!isNaN(floatValue) && isFinite(floatValue)) {
    const formattedString = floatValue.toFixed(2);
    const [wholePart, decimalPart] = formattedString.split(".");
    const paddedDecimalPart = decimalPart.padEnd(2, "0");
    return `${wholePart.padStart(2, "0")}.${paddedDecimalPart}`;
  } else {
    return number?.toString();
  }
};

export const resuableDateFormatter = (date: any, format: string) => {
  return moment(date).tz("Asia/Kolkata").format(format);
};

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1050,
      lg: 1200,
      xl: 1536,
    },
  },
});
